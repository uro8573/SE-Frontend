import '@testing-library/jest-dom';
import request from 'supertest';
import dotenv from 'dotenv';
import userLogIn from '@/libs/userLogIn';
import getUserProfile from '@/libs/getUserProfile';
import getHotels from '@/libs/getHotels';
import addBooking from '@/libs/addBooking';
import deleteBooking from '@/libs/deleteBooking';

dotenv.config();

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://se-backend-7kk7.onrender.com";

const parseBaseUrl = (url) => {
  try {
    const parsedUrl = new URL(url);
    return `${parsedUrl.protocol}//${parsedUrl.hostname}${parsedUrl.port ? ':' + parsedUrl.port : ''}`;
  } catch (e) {
    console.error('Invalid URL:', url);
    return "https://se-backend-7kk7.onrender.com";
  }
};

const BASE_URL = API_URL ? parseBaseUrl(API_URL).replace(/\/$/, '') : "https://se-backend-7kk7.onrender.com";

console.log('API URL:', API_URL);
console.log('BASE URL:', BASE_URL);

const TEST_USER = {
  email: 'test1745644935@example.com',
  password: 'password123',
};

let authToken;
let userId;
let hotelId;
let hotel_Id;
let bookingId;
let completedBookingId;
let notificationId;
let reviewId;

beforeAll(async () => {
  if (!process.env.NEXT_PUBLIC_API_URL) {
    process.env.NEXT_PUBLIC_API_URL = "https://se-backend-7kk7.onrender.com";
    console.log('Setting API URL to:', process.env.NEXT_PUBLIC_API_URL);
  }

  try {
    const loginRes = await userLogIn(TEST_USER.email, TEST_USER.password);
    authToken = loginRes.token;

    const profileRes = await getUserProfile(authToken);
    userId = profileRes.data._id;

    const hotelsRes = await getHotels({ limit: 1 });
    if (hotelsRes.data.length > 0) {
      hotelId = hotelsRes.data[0].id;
      hotel_Id = hotelsRes.data[0]._id;
      console.log('Using hotel ID:', hotelId);
      console.log('Using hotel _ID:', hotel_Id);
    } else {
      console.warn('No hotels found for testing');
    }
  } catch (err) {
    console.error('Setup failed:', err);
    throw err;
  }
}, 120000);

describe('User Authentication (fetch-based)', () => {
  it('logs in user and returns a token', async () => {
    const res = await userLogIn(TEST_USER.email, TEST_USER.password);
    expect(res).toHaveProperty('token');
    expect(typeof res.token).toBe('string');
  }, 120000);

  it('fetches user profile with token', async () => {
    const res = await getUserProfile(authToken);
    expect(res.success).toBe(true);
    expect(res.data).toHaveProperty('_id');
    expect(res.data.email).toBe(TEST_USER.email);
  }, 120000);

  it('fetches hotels list', async () => {
    const res = await getHotels({ limit: 1 });
    expect(res.success).toBe(true);
    expect(res.data.length).toBeGreaterThan(0);
  }, 120000);
});

describe('Notification Functions Tests', () => {
  it('should create a new notification', async () => {
    console.log('Creating notification...');
    
    const response = await request(BASE_URL)
      .post('/api/v1/notifications')
      .set('Authorization', `Bearer ${authToken}`)
      .set('Content-Type', 'application/json')
      .send({
        user: userId,
        text: 'Test notification from SuperTest',
        isRead: false,
        type: 'success',
        typeAction: 'booking_confirmation'
      });
    
    console.log('Notification response status:', response.status);
    if (response.status !== 201) {
      console.log('Response body:', response.body);
    }
    
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('data');
    
    notificationId = response.body.data._id;
  });
  
  it('[TC2-2-01] should get all notifications for the user', async () => {
    const response = await request(BASE_URL)
      .get('/api/v1/notifications')
      .set('Authorization', `Bearer ${authToken}`)
      .set('Content-Type', 'application/json');
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('count');
    expect(response.body).toHaveProperty('data');
    expect(Array.isArray(response.body.data)).toBe(true);
    
    if (response.body.data.length > 0) {
      const notification = response.body.data[0];
      expect(notification).toHaveProperty('_id');
      expect(notification).toHaveProperty('user');
      expect(notification).toHaveProperty('text');
      expect(notification).toHaveProperty('isRead');
      expect(notification).toHaveProperty('type');
      expect(notification).toHaveProperty('typeAction');
      expect(notification).toHaveProperty('createdAt');
    }
  });
  
  it('should update notification to mark as read', async () => {
    // Skip if no notification ID
    if (!notificationId) {
      console.warn('No notification ID available for update test');
      return;
    }
    
    const response = await request(BASE_URL)
      .put(`/api/v1/notifications/${notificationId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .set('Content-Type', 'application/json')
      .send({
        isRead: true
      });
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toHaveProperty('isRead', true);
  });
});

describe('Rating and Review Functions Tests (Without Completed Booking)', () => {
  it('should fail to create a review without a completed booking', async () => {
    if (!hotelId) {
      console.warn('No hotel ID available for review test');
      return;
    }
    
    const response = await request(BASE_URL)
      .post(`/api/v1/hotels/${hotelId}/reviews`)
      .set('Authorization', `Bearer ${authToken}`)
      .set('Content-Type', 'application/json')
      .send({
        rating: 4,
        comment: 'This review should fail without a completed booking'
      });
    
    console.log('Review without completed booking response:', response.body);
    
    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty('success', false);
  });
});

describe('Booking Functions Tests', () => {
  it('should create a new future booking', async () => {
    if (!hotelId) {
      console.warn('No hotel ID available for booking test');
      return;
    }
    
    const checkInDate = new Date();
    checkInDate.setDate(checkInDate.getDate() + 7);
    
    const checkOutDate = new Date();
    checkOutDate.setDate(checkOutDate.getDate() + 10);
    
    console.log('Creating future booking...');
    
    const response = await addBooking(
      hotelId,
      authToken,
      2,
      "XL",
      checkInDate.toISOString().split('T')[0],
      checkOutDate.toISOString().split('T')[0]
    );
    
    console.log('Future booking response:', response);
    
    expect(response).toHaveProperty('success', true);
    expect(response).toHaveProperty('data');
    expect(response.data).toHaveProperty('_id');
    
    bookingId = response.data._id;
  }, 120000);
});

describe('Rating and Review Functions Tests (With Completed Booking)', () => {
  it('[TC1-1-01]should create a review after having a completed booking', async () => {
    if (!hotelId || !completedBookingId) {
      console.warn('No hotel ID or completed booking ID available for review test');
      return;
    }
    
    const response = await request(BASE_URL)
      .post(`/api/v1/hotels/${hotelId}/reviews`)
      .set('Authorization', `Bearer ${authToken}`)
      .set('Content-Type', 'application/json')
      .send({
        rating: 5,
        comment: 'Excellent stay! This review should succeed with a completed booking.'
      });
    
    console.log('Review with completed booking response status:', response.status);
    
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toHaveProperty('rating', 5);
    
    reviewId = response.body.data._id;
  });
  
  it('[TC1-2-01]should get reviews for the authenticated user', async () => {
    if (!reviewId) {
      console.warn('No review ID available, skipping test');
      return;
    }
    
    const response = await request(BASE_URL)
      .get('/api/v1/reviews')
      .set('Authorization', `Bearer ${authToken}`)
      .set('Content-Type', 'application/json');
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('count');
    expect(response.body).toHaveProperty('data');
    expect(Array.isArray(response.body.data)).toBe(true);
    
    if (response.body.data.length > 0) {
      const review = response.body.data[0];
      expect(review).toHaveProperty('_id');
      expect(review).toHaveProperty('user');
      expect(review).toHaveProperty('hotel');
      expect(review).toHaveProperty('rating');
      expect(review).toHaveProperty('comment');
      expect(review).toHaveProperty('createdAt');
    }
  });
  
  it('should get reviews for a specific hotel', async () => {
    if (!hotelId) {
      console.warn('No hotel ID available for get hotel reviews test');
      return;
    }
    
    const response = await request(BASE_URL)
      .get(`/api/v1/hotels/${hotelId}/reviews`);
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('count');
    expect(response.body).toHaveProperty('data');
    expect(Array.isArray(response.body.data)).toBe(true);
    
    if (response.body.data.length > 0) {
      const review = response.body.data[0];
      expect(review).toHaveProperty('hotel');
    }
  });
  
  it('[TC1-3-01] should update a review', async () => {
    if (!reviewId) {
      console.warn('No review ID available for update test');
      return;
    }
    
    const response = await request(BASE_URL)
      .put(`/api/v1/reviews/${reviewId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .set('Content-Type', 'application/json')
      .send({
        comment: 'Updated review comment after a wonderful stay',
        rating: 5
      });
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toHaveProperty('_id', reviewId);
    expect(response.body.data).toHaveProperty('comment', 'Updated review comment after a wonderful stay');
    expect(response.body.data).toHaveProperty('rating', 5);
  });
  
  it('[TC1-4-01] should delete a review', async () => {
    if (!reviewId) {
      console.warn('No review ID available for delete test');
      return;
    }
    
    const response = await request(BASE_URL)
      .delete(`/api/v1/reviews/${reviewId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .set('Content-Type', 'application/json');
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('success', true);
  });
});

// Clean up any test data we created
afterAll(async () => {
  if (bookingId) {
    try {
      const deleteResponse = await deleteBooking(bookingId, authToken);
      console.log('Future booking cleanup result:', deleteResponse.success);
    } catch (error) {
      console.warn('Failed to clean up future booking:', error);
    }
  }
  
  if (completedBookingId) {
    try {
      const deleteResponse = await deleteBooking(completedBookingId, authToken);
      console.log('Completed booking cleanup result:', deleteResponse.success);
    } catch (error) {
      console.warn('Failed to clean up completed booking:', error);
    }
  }
  
  if (notificationId) {
    try {
      await request(BASE_URL)
        .delete(`/api/v1/notifications/${notificationId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .set('Content-Type', 'application/json');
    } catch (error) {
      console.warn('Failed to clean up test notification:', error);
    }
  }
  
  if (reviewId) {
    try {
      await request(BASE_URL)
        .delete(`/api/v1/reviews/${reviewId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .set('Content-Type', 'application/json');
    } catch (error) {
      console.warn('Failed to clean up test review:', error);
    }
  }
});