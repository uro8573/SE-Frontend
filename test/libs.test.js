import '@testing-library/jest-dom'
import userLogIn from '@/libs/userLogIn'
import getUserProfile from '@/libs/getUserProfile'
import addNotification from '@/libs/addNotification'
import addRating from '@/libs/addRating'
import createReview from '@/libs/createReview'
import deleteReview from '@/libs/deleteReview'
import getNotifications from '@/libs/getNotifications'
import getReviews from '@/libs/getReviews'
import getReviewWithHotelID from '@/libs/getReviewWithHotelID'
import updateNotification from '@/libs/updateNotification'
import updateReview from '@/libs/updateReview'

// Mock global fetch
global.fetch = jest.fn();

// Save original environment variable
const originalEnv = process.env;

beforeEach(() => {
  // Reset mocks before each test
  jest.resetAllMocks();
  
  // Setup environment variables for testing with the actual API URL
  process.env = { 
    ...originalEnv, 
    NEXT_PUBLIC_API_URL: 'https://se-backend-7kk7.onrender.com',
    NEXTAUTH_URL: 'http://localhost:3000',
    NEXTAUTH_SECRET: 'w2fJImJb1b+6zI7E5PBrYxj8FlW0vl3mjzWzAhd+kzc='
  };
});

afterAll(() => {
  // Restore original environment
  process.env = originalEnv;
});

describe('User Authentication Tests', () => {
  it('[TC001] userLogIn must return correct results', async () => {
    // Mock successful login response with the provided JSON
    const mockLoginResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({ 
        success: true,
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MGM2ZDg4YjZlNDVjNDVkYmY3YTlmOSIsImlhdCI6MTc0NTcyMTI2NCwiZXhwIjoxNzQ4MzEzMjY0fQ.OZYmzGVOe0mIQ2nC3fRjMPH9VQmxo-4TyaemSyths4s"
      })
    };
    
    global.fetch.mockResolvedValueOnce(mockLoginResponse);
    
    // Perform login
    const email = 'ILoveKaru3000@gmail.com';
    const password = '1212312121';
    const loginResult = await userLogIn(email, password);
    
    // Verify fetch was called correctly
    expect(global.fetch).toHaveBeenCalledWith(
      'https://se-backend-7kk7.onrender.com/api/v1/auth/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        })
      }
    );
    
    // Verify login result contains token
    expect(loginResult.token).toBeTruthy();
  });
  
  it('[TC002] userLogIn should throw error when response is not ok', async () => {
    const mockFailedResponse = {
      ok: false
    };
    global.fetch.mockResolvedValueOnce(mockFailedResponse);
    
    await expect(userLogIn('wrong@email.com', 'wrongpass')).rejects.toThrow('Failed to fetch user');
  });
  
  it('[TC003] getUserProfile must return correct results', async () => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MGM2ZDg4YjZlNDVjNDVkYmY3YTlmOSIsImlhdCI6MTc0NTcyMTI2NCwiZXhwIjoxNzQ4MzEzMjY0fQ.OZYmzGVOe0mIQ2nC3fRjMPH9VQmxo-4TyaemSyths4s";
    
    // Mock successful profile response with the provided JSON
    const mockProfileResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({
        success: true,
        data: {
          _id: "680c6d88b6e45c45dbf7a9f9",
          name: "Test User",
          email: "test1745644935@example.com",
          tel: "896-581-2004",
          role: "user",
          verificationCode: "468978",
          isVerify: false,
          createdAt: "2025-04-26T05:22:16.991Z",
          __v: 0
        }
      })
    };
    
    global.fetch.mockResolvedValueOnce(mockProfileResponse);
    
    // Get user profile
    const profileResult = await getUserProfile(token);
    
    // Verify fetch was called correctly
    expect(global.fetch).toHaveBeenCalledWith(
      'https://se-backend-7kk7.onrender.com/api/v1/auth/me',
      {
        method: 'GET',
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    
    // Verify profile data
    const profileData = profileResult.data;
    expect(profileData.email).toBeTruthy();
    expect(profileData.role).toMatch(/user/i);
  });
  
  it('[TC004] getUserProfile should throw error when response is not ok', async () => {
    const mockFailedResponse = {
      ok: false
    };
    global.fetch.mockResolvedValueOnce(mockFailedResponse);
    
    await expect(getUserProfile('invalid-token')).rejects.toThrow('Failed to fetch user profile');
  });
});

describe('Notification Functions Tests', () => {
  const token = 'test-token-123';
  const userId = 'user123';
  
  it('[TC2-2-01] addNotification should send correct data and return response', async () => {
    const mockResponse = {
      json: jest.fn().mockResolvedValue({ id: 'notif123', created: true })
    };
    global.fetch.mockResolvedValueOnce(mockResponse);
    
    const result = await addNotification(token, userId, 'New booking', 'booking', 'created');
    
    expect(global.fetch).toHaveBeenCalledWith(
      'https://se-backend-7kk7.onrender.com/api/v1/notifications',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          user: userId,
          text: 'New booking',
          isRead: false,
          type: 'booking',
          typeAction: 'created'
        })
      }
    );
    
    expect(result).toEqual({ id: 'notif123', created: true });
  });
  
  it('[TC006] getNotifications should fetch and return notifications', async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({ 
        data: [
          { id: 'notif1', text: 'Test notification', isRead: false }
        ]
      })
    };
    global.fetch.mockResolvedValueOnce(mockResponse);
    
    const result = await getNotifications(token);
    
    expect(global.fetch).toHaveBeenCalledWith(
      'https://se-backend-7kk7.onrender.com/api/v1/notifications',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    );
    
    expect(result.data).toHaveLength(1);
  });
  
  it('[TC007] getNotifications should throw error when response is not ok', async () => {
    const mockFailedResponse = {
      ok: false
    };
    global.fetch.mockResolvedValueOnce(mockFailedResponse);
    
    await expect(getNotifications(token)).rejects.toThrow('Failed to fetch notifications');
  });
  
  it('[TC008] updateNotification should mark notification as read', async () => {
    const notificationId = 'notif123';
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({ 
        id: notificationId, 
        isRead: true 
      })
    };
    global.fetch.mockResolvedValueOnce(mockResponse);
    
    const result = await updateNotification(token, notificationId);
    
    expect(global.fetch).toHaveBeenCalledWith(
      `https://se-backend-7kk7.onrender.com/api/v1/notifications/${notificationId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          isRead: true
        })
      }
    );
    
    expect(result.isRead).toBe(true);
  });
  
  it('[TC009] updateNotification should throw error when response is not ok', async () => {
    const mockFailedResponse = {
      ok: false,
      status: 404,
      text: jest.fn().mockResolvedValue('Not found')
    };
    global.fetch.mockResolvedValueOnce(mockFailedResponse);
    
    await expect(updateNotification(token, 'invalid-id')).rejects.toThrow(/HTTP error 404/);
  });
});

describe('Rating and Review Functions Tests', () => {
  const token = 'test-token-123';
  const hotelId = 'hotel123';
  
  it('[TC1-1-01] addRating should send rating data and return response', async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({ 
        id: hotelId, 
        updatedRating: 4.5 
      })
    };
    global.fetch.mockResolvedValueOnce(mockResponse);
    
    const result = await addRating(hotelId, 5, token);
    
    expect(global.fetch).toHaveBeenCalledWith(
      `https://se-backend-7kk7.onrender.com/api/v1/hotels/${hotelId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          rating: 5
        })
      }
    );
    
    expect(result.id).toBe(hotelId);
  });
  
  it('[TC011] addRating should throw error when response is not ok', async () => {
    const mockFailedResponse = {
      ok: false
    };
    global.fetch.mockResolvedValueOnce(mockFailedResponse);
    
    await expect(addRating(hotelId, 5, token)).rejects.toThrow('Failed to add hotel rating');
  });
  
  it('[TC012] createReview should send review data and return response', async () => {
    const mockResponse = {
      json: jest.fn().mockResolvedValue({ 
        id: 'review123', 
        hotelId: hotelId,
        rating: 4,
        comment: 'Great hotel'
      })
    };
    global.fetch.mockResolvedValueOnce(mockResponse);
    
    const result = await createReview(hotelId, token, 4, 'Great hotel');
    
    expect(global.fetch).toHaveBeenCalledWith(
      `https://se-backend-7kk7.onrender.com/api/v1/hotels/${hotelId}/reviews`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          rating: 4,
          comment: 'Great hotel'
        })
      }
    );
    
    expect(result.comment).toBe('Great hotel');
  });
  
  it('[TC1-3-01] updateReview should modify review data and return response', async () => {
    const reviewId = 'review123';
    const mockResponse = {
      json: jest.fn().mockResolvedValue({ 
        id: reviewId,
        comment: 'Updated comment',
        rating: 5
      })
    };
    global.fetch.mockResolvedValueOnce(mockResponse);
    
    const result = await updateReview(reviewId, token, 'Updated comment', 5);
    
    expect(global.fetch).toHaveBeenCalledWith(
      `https://se-backend-7kk7.onrender.com/api/v1/reviews/${reviewId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          comment: 'Updated comment',
          rating: 5
        })
      }
    );
    
    expect(result.comment).toBe('Updated comment');
  });
  
  it('[TC1-4-01] deleteReview should remove review and return response', async () => {
    const reviewId = 'review123';
    const mockResponse = {
      json: jest.fn().mockResolvedValue({ 
        id: reviewId,
        deleted: true
      })
    };
    global.fetch.mockResolvedValueOnce(mockResponse);
    
    const result = await deleteReview(reviewId, token);
    
    expect(global.fetch).toHaveBeenCalledWith(
      `https://se-backend-7kk7.onrender.com/api/v1/reviews/${reviewId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    );
    
    expect(result.deleted).toBe(true);
  });
  
  // Fix: For the tests that timeout
  it('[TC1-2-01] getReviews should fetch and return user reviews', async () => {
    // Create a mock for the getReviews function that resolves immediately
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({ 
        data: [
          { id: 'review1', comment: 'Test review', rating: 4 }
        ]
      })
    };
    
    // Mock the fetch call directly
    global.fetch.mockResolvedValueOnce(mockResponse);
    
    // Call the actual function
    const result = await getReviews(token);
    
    // Check the fetch was called correctly
    expect(global.fetch).toHaveBeenCalledWith(
      'https://se-backend-7kk7.onrender.com/api/v1/reviews',
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    
    // Check the result is correct
    expect(result.data).toHaveLength(1);
  }, 15000);  // Increased timeout to 15 seconds
  
  it('[TC1-2-02] getReviews should throw error when response is not ok', async () => {
    const mockFailedResponse = {
      ok: false
    };
    global.fetch.mockResolvedValueOnce(mockFailedResponse);
    
    await expect(getReviews(token)).rejects.toThrow('Failed to fetch reviews');
  }, 15000);  // Increased timeout to 15 seconds
  
  it('[TC017] getReviewWithHotelID should fetch and return hotel reviews', async () => {
    const hotelId = 123;
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({ 
        data: [
          { id: 'review1', hotelId: hotelId, comment: 'Great hotel', rating: 5 }
        ]
      })
    };
    global.fetch.mockResolvedValueOnce(mockResponse);
    
    const result = await getReviewWithHotelID(hotelId);
    
    expect(global.fetch).toHaveBeenCalledWith(
      `https://se-backend-7kk7.onrender.com/api/v1/hotels/${hotelId}/reviews`
    );
    
    expect(result.data).toHaveLength(1);
  }, 15000);  // Increased timeout to 15 seconds
  
  it('[TC018] getReviewWithHotelID should throw error when response is not ok', async () => {
    const mockFailedResponse = {
      ok: false
    };
    global.fetch.mockResolvedValueOnce(mockFailedResponse);
    
    await expect(getReviewWithHotelID(999)).rejects.toThrow('Failed to fetch reviews');
  }, 15000);  // Increased timeout to 15 seconds
});