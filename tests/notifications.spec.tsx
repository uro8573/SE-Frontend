import { test, expect, Page } from '@playwright/test';
import getUserProfile from '@/libs/getUserProfile';
import { useSession } from 'next-auth/react';

// Test data and helper variables
const BASE_URL = 'http://localhost:3000';
const TEST_USER = {
  email: 'test1745644935@example.com',
  password: 'password123'
};

async function loginUser(page: Page) {
  console.log('Navigating to login page...');
  await page.goto(`${BASE_URL}/signin`, { timeout: 120000 });
  
  // Wait for page content to load
  await page.waitForSelector('h1:has-text("Welcome Back")', { timeout: 120000 });
  
  console.log('Looking for email input with ID="email"');
  // Use the exact ID we know exists
  const emailInputField = page.locator('#email');
  await emailInputField.waitFor({ state: 'visible', timeout: 120000 });
  await emailInputField.fill(TEST_USER.email);
  
  console.log('Looking for password input');
  // For password, assume it has id="password" or is the only password field
  const passwordInputField = page.locator('input[type="password"], #password');
  await passwordInputField.waitFor({ state: 'visible', timeout: 120000 });
  await passwordInputField.fill(TEST_USER.password);
  
  console.log('Clicking submit button');
  // Click the login button - the one with "Login" text that's not disabled
  await page.locator('button[type="submit"]:not([disabled])').click();
  
  console.log('Waiting for success message');
  // Wait for login success alert
  await page.waitForSelector('div:has-text("Login successful")', { 
    state: 'visible', 
    timeout: 120000 
  });
  
  console.log('Waiting for redirect to home page');
  // Wait for redirection to home page
  await page.waitForURL(`${BASE_URL}/`);
}

// Test suite for EPIC2: Email Notifications
test.describe('Email Notifications EPIC', () => {
  
  // Setup for each test: start with a fresh page
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });


  /*
  // US2-1: Booking confirmation notifications (system generated)
  test('US2-1: User receives booking confirmation notification', async ({ page }) => {
    // Login first
    await loginUser(page);
    
    // Navigate to a hotel booking page
    await page.goto(`${BASE_URL}/hotel/3`);
    
    // Wait for the page to load completely
    await page.waitForLoadState('networkidle');
    
    // Click Reserve button directly (based on your ItemPage component)
    await page.locator('button:has-text("Reserve")').click();
    
    // Wait for booking confirmation - looking for success toast
    await page.waitForSelector('div:has-text("Booking successful")', { 
      state: 'visible', 
      timeout: 30000 
    });
    
    // Navigate to notifications page
    await page.goto(`${BASE_URL}/manage/history/notifications`);
    
    // Wait for notifications to load - use a more general selector
    await page.waitForSelector('h2', { timeout: 30000 });
    
    // Check for booking notification with correct styling
    const bookingNotification = page.locator('.border-l-4.border-green-500');
    await expect(bookingNotification).toBeVisible({ timeout: 30000 });
    
    // Verify the notification contains booking text
    await expect(page.locator('text=BookingSuccess')).toBeVisible();
  });



  // US2-2: View past notifications
  test('US2-2: User can check past notifications', async ({ page }) => {
    // Login first
    await loginUser(page);
    
    // Navigate to notifications page
    await page.goto(`${BASE_URL}/manage/history/notifications`);
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Check if notifications section loaded successfully - fix the selector
    await expect(page.locator('h2')).toBeVisible();
    
    // Test for empty state handling or existing notifications
    const notificationsCount = await page.locator('.border-l-4').count();
    
    if (notificationsCount === 0) {
      // Check for empty state message - use a more general approach
      await expect(page.getByText('ยังไม่มีการแจ้งเตือน', { exact: false })).toBeVisible();
    } else {
      // Click on View details button for the first notification
      await page.getByText('View details').first().click();
      
      // Wait for modal to appear - using the fixed class from your code
      await page.waitForSelector('.fixed.inset-0', { state: 'visible' });
      
      // Verify modal content has expected elements
      await expect(page.getByText('Send to:', { exact: false })).toBeVisible();
      await expect(page.getByText('Notification ID:', { exact: false })).toBeVisible();
      
      // Close the modal using the Close button
      await page.getByText('Close').click();
      
      // Verify modal is closed
      await expect(page.locator('.fixed.inset-0')).not.toBeVisible();
    }
  });
  */

  // US2-3: Email verification OTP flow
  test('US2-3: User registration with email verification OTP', async ({ page }) => {
    // Go to signup page
    await page.goto(`${BASE_URL}/signup`);
    
    // Fill out registration form
    const testEmail = `test${Date.now()}@example.com`;
    const testPassword = 'Password123!';
    const testName = 'TestName';
    const testTel = '0884567890';
    
    await page.fill('input[type="email"]', testEmail);
    await page.fill('input[type="password"]', testPassword);
    await page.fill('input[type="name"]', testName);
    await page.fill('input[type="tel"]', testTel);

    /*
    await page.fill('input[placeholder="Confirm Password"]', testPassword); // Adjust selector as needed
    await page.fill('input[placeholder="Name"]', 'Test User'); // Adjust selector as needed
    await page.fill('input[placeholder="Phone Number"]', '1234567890'); // Adjust selector as needed
    */

    // Submit registration form
    await page.click('button[type="submit"]');

    // Go to login page
    await page.goto(`${BASE_URL}/signin`, { timeout : 10000});

    // Login with the newly registered credentials
    await page.fill('input[type="email"]', testEmail);
    await page.fill('input[type="password"]', testPassword);
    await page.click('button[type="submit"]');

    await page.waitForURL(`${BASE_URL}/`, { timeout: 10000 });
    const { data: session } = useSession();
    const token = session?.user.token;

    console.log(token);

    let userProfile;

    userProfile = await getUserProfile(token || '');
    console.log('User Profile:', userProfile);
    expect(userProfile).toHaveProperty('verificationCode'); // Assuming 'otp' field exists
    const verificationCode = userProfile.verificationCode;
    
    // Navigate to the verify email page
    await page.goto(`${BASE_URL}/verify`);
    
    // Check for OTP verification screen
    await expect(page.locator('text=Verify Your Email')).toBeVisible();
    
    // Test OTP input field (assuming 6-digit OTP code)
    const otpInputs = page.locator('input[type="text"][maxlength="1"]');
    await expect(otpInputs).toHaveCount(6);
    

    // Test resend OTP functionality
    await page.click('button[type="submit"]');
    await expect(page.locator('text=Code sent!')).toBeVisible();


    
    const otpArray = verificationCode.split('');
    for (let i = 0; i < otpArray.length; i++) {
      await otpInputs.nth(i).fill(otpArray[i]);
    }
    
    await page.click('button[type="submit"]');
    
    // Verify successful registration
    await expect(page.locator('text=Email verified successfully')).toBeVisible();
  });

  // คืออยากให้ get ค่าจาก session หลังจาก login ได้เพิ่อเอาค่า token จาก session มาใช้ในการ getuserprofile ของค่า otp เพื่อว่า เอามาใส่ verify ได้


  
  /*
  // US2-4: Test for notification management (as visible to user)
  test('US2-4: Notifications are properly managed and organized', async ({ page }) => {
    // Login first
    await loginUser(page);
    
    // Navigate to notifications page
    await page.goto(`${BASE_URL}/manage/history/notifications`);
    
    // Test sorting functionality (if implemented)
    await page.click('button:has-text("Default")');
    
    // Check if notification items show the correct timestamps
    const notificationTimestamps = page.locator('.text-xs.text-gray-500');
    await expect(notificationTimestamps.first()).toBeVisible();
    
    // Test that notifications are marked as read after viewing
    const unreadBadges = page.locator('span.bg-red-500');
    if (await unreadBadges.count() > 0) {
      // Count unread notifications before clicking
      const unreadCountBefore = await unreadBadges.count();
      
      // View the first unread notification
      await page.locator('.border-l-4').filter({ has: unreadBadges }).first().locator('text=View details').click();
      
      // Close the modal
      await page.click('button:has-text("Close")');
      
      // Count unread notifications after viewing
      const unreadCountAfter = await page.locator('span.bg-red-500').count();
      
      // Verify that the count decreased
      expect(unreadCountAfter).toBeLessThan(unreadCountBefore);
    }
    
    // Test notification types styling (check if different type notifications have different styles)
    const notificationCards = page.locator('.border-l-4');
    if (await notificationCards.count() > 0) {
      // Check for different border colors in notifications (assuming they exist)
      const successNotifications = page.locator('.border-green-500');
      const warnNotifications = page.locator('.border-yellow-500');
      const infoNotifications = page.locator('.border-purple-500');
      const failNotifications = page.locator('.border-red-500');
      
      // At least one type should exist
      const totalTypedNotifications = 
        await successNotifications.count() + 
        await warnNotifications.count() + 
        await infoNotifications.count() + 
        await failNotifications.count();
      
      expect(totalTypedNotifications).toBeGreaterThan(0);
    }
  });

  // Additional test: API integration test for notifications
  test('Notifications API integration works correctly', async ({ request }) => {
    // First login to get authentication token
    const loginResponse = await request.post(`${BASE_URL}/api/auth/login`, {
      data: {
        email: TEST_USER.email,
        password: TEST_USER.password
      }
    });
    
    expect(loginResponse.ok()).toBeTruthy();
    const loginData = await loginResponse.json();
    const token = loginData.token;
    
    // Now fetch notifications using the API
    const notificationsResponse = await request.get(`${BASE_URL}/api/v1/notifications`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    expect(notificationsResponse.ok()).toBeTruthy();
    const notificationsData = await notificationsResponse.json();
    
    // Verify the structure of notifications data
    expect(notificationsData).toHaveProperty('data');
    
    // If there are notifications, verify their structure
    if (notificationsData.data.length > 0) {
      const firstNotification = notificationsData.data[0];
      expect(firstNotification).toHaveProperty('_id');
      expect(firstNotification).toHaveProperty('text');
      expect(firstNotification).toHaveProperty('isRead');
      expect(firstNotification).toHaveProperty('type');
      expect(firstNotification).toHaveProperty('typeAction');
      expect(firstNotification).toHaveProperty('user');
    }
  });
  */
});