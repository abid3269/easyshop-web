import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  console.log('Navigating to home page...');
  await page.goto('http://localhost:5173');
  await page.waitForTimeout(2000); // Wait for hydration
  await page.screenshot({ path: 'home_page_new.png' });
  console.log('Home page screenshot saved.');

  console.log('Navigating to /signup...');
  await page.goto('http://localhost:5173/signup');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'signup_redirect_new.png' });
  console.log('Signup redirect screenshot saved.');

  const content = await page.content();
  if (content.includes('Redirecting to Auth0')) {
    console.log('Found redirect message.');
  } else {
    console.log('Redirect message NOT found.');
    console.log('Body content:', await page.innerText('body'));
  }

  await browser.close();
})();
