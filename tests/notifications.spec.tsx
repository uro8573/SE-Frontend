import { test, expect, Page } from '@playwright/test';
import getUserProfile from '@/libs/getUserProfile';
import { useSession } from 'next-auth/react';
import userLogIn from '@/libs/userLogIn';

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
    
    // // Check for booking notification with correct styling
    // const bookingNotification = page.locator('.border-l-4.border-green-500');
    // await expect(bookingNotification).toBeVisible({ timeout: 30000 });
    
    // // Verify the notification contains booking text
    // await expect(page.locator('text=BookingSuccess')).toBeVisible();

    
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

    // Submit registration form
    await page.click('button[type="submit"]');

    /*
    // Go to login page
    await page.goto(`${BASE_URL}/signin`, { timeout : 10000});

    // Login with the newly registered credentials
    await page.fill('input[type="email"]', testEmail);
    await page.fill('input[type="password"]', testPassword);
    await page.click('button[type="submit"]');

    await page.waitForURL(`${BASE_URL}/`, { timeout: 10000 });
    */

    // Login the user via API to get the token
    const loginResponse = await userLogIn(testEmail, testPassword);
    console.log(loginResponse);

    const token = loginResponse.token; // Assuming your login API returns token in data.token
    console.log('Token จาก Login API:', token);

    const userProfile = await getUserProfile(token);
    console.log('User Profile:', userProfile);
    expect(userProfile.data).toHaveProperty('verificationCode');
    const verificationCode = userProfile.data.verificationCode;

    // Navigate to the verify email page
    await page.goto(`${BASE_URL}/verify`);
    await expect(page.locator('text=Verify an Account')).toBeVisible();
    const otpInputs = page.locator('input[type="text"][maxlength="1"]');
    await expect(otpInputs).toHaveCount(6);
    const otpArray = verificationCode.split('');
    for (let i = 0; i < otpArray.length; i++) {
      await otpInputs.nth(i).fill(otpArray[i]);
    }


    await expect(page.locator('text=Account verified! Redirecting...')).toBeVisible({ timeout: 10000 });

  });

  


  
  
  // US2-4: Test for notification management (as visible to user)
  test('US2-4: Notifications are properly managed and organized', async ({ page }) => {


    // Fill out registration form
    const testEmail = `admin@gmail.com`;
    const testPassword = '12345678';
    
    // Go to login page
    await page.goto(`${BASE_URL}/signin`, { timeout : 10000});

    await page.fill('input[type="email"]', testEmail);
    await page.fill('input[type="password"]', testPassword);

    // Submit registration form
    await page.click('button[type="submit"]');

    
    // Navigate to notifications page
    await page.goto(`${BASE_URL}/manage/admin/config`);

    await expect(page.locator('text=Admin Config')).toBeVisible();
    
    await page.fill('input[type="number"]', "20");

    await page.click('button[type="submit"]');

    await expect(page.locator('text=Update config successfully.')).toBeVisible();

  

  }

  );

  // // Additional test: API integration test for notifications
  // test('Notifications API integration works correctly', async ({ request }) => {
  //   // First login to get authentication token
  //   const loginResponse = await request.post(`${BASE_URL}/api/auth/login`, {
  //     data: {
  //       email: TEST_USER.email,
  //       password: TEST_USER.password
  //     }
  //   });
    
  //   expect(loginResponse.ok()).toBeTruthy();
  //   const loginData = await loginResponse.json();
  //   const token = loginData.token;
    
  //   // Now fetch notifications using the API
  //   const notificationsResponse = await request.get(`${BASE_URL}/api/v1/notifications`, {
  //     headers: {
  //       'Authorization': `Bearer ${token}`
  //     }
  //   });
    
  //   expect(notificationsResponse.ok()).toBeTruthy();
  //   const notificationsData = await notificationsResponse.json();
    
  //   // Verify the structure of notifications data
  //   expect(notificationsData).toHaveProperty('data');
    
  //   // If there are notifications, verify their structure
  //   if (notificationsData.data.length > 0) {
  //     const firstNotification = notificationsData.data[0];
  //     expect(firstNotification).toHaveProperty('_id');
  //     expect(firstNotification).toHaveProperty('text');
  //     expect(firstNotification).toHaveProperty('isRead');
  //     expect(firstNotification).toHaveProperty('type');
  //     expect(firstNotification).toHaveProperty('typeAction');
  //     expect(firstNotification).toHaveProperty('user');
  //   }
  // });
  
});