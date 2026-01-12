import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

  try {
    // Wait until the dev server responds (timeout ~15s)
    const maxAttempts = 15;
    let connected = false;
    for (let i = 0; i < maxAttempts; i++) {
      try {
        const resp = await page.goto('http://127.0.0.1:8080/', { waitUntil: 'networkidle', timeout: 2000 });
        if (resp && resp.ok()) {
          connected = true;
          break;
        }
      } catch (e) {
        // retry
        await new Promise((r) => setTimeout(r, 1000));
      }
    }

    if (!connected) {
      throw new Error('Dev server not responding at http://127.0.0.1:8080/');
    }

    // Check sidebar trigger (if present)
    const sidebarTrigger = await page.$('[data-sidebar="trigger"]');
    if (sidebarTrigger) {
      await sidebarTrigger.click();
      console.log('Sidebar trigger clicked');
    } else {
      console.log('Sidebar trigger not found (desktop mode)');
    }

    // Click mobile menu button by resizing viewport
    await page.setViewportSize({ width: 375, height: 800 });
    const mobileMenuButton = await page.$('nav .md\:hidden button');
    if (mobileMenuButton) {
      await mobileMenuButton.click();
      console.log('Mobile menu toggle clicked');
      // Try clicking first menu item
      const firstMenuItem = await page.$('nav .md\:hidden ul li a');
      if (firstMenuItem) {
        await firstMenuItem.click();
        console.log('Mobile nav item clicked');
      } else {
        console.log('Mobile nav item not found');
      }
      // Close mobile menu
      await mobileMenuButton.click();
    } else {
      console.log('Mobile menu toggle not found');
    }

    // Visit Assistant page and interact with suggestion and send
    await page.goto('http://127.0.0.1:8080/assistant', { waitUntil: 'networkidle' });

    // Click a suggestion button
    const suggestion = await page.$('button[title]');
    if (suggestion) {
      await suggestion.click();
      console.log('Suggestion clicked');
    } else {
      console.log('Suggestion button not found');
    }

    // Fill input and click send
    const input = await page.$('input[placeholder*="Ask about"]');
    if (input) {
      await input.fill('Test query about enrolments');
      const sendBtn = await page.$('button:has-text("Send")');
      if (sendBtn) {
        await sendBtn.click();
        console.log('Send button clicked');
      } else {
        console.log('Send button not found');
      }
    } else {
      console.log('Assistant input not found');
    }

    // Reset viewport
    await page.setViewportSize({ width: 1280, height: 800 });

    // Test carousel prev/next if present on page
    await page.goto('http://127.0.0.1:8080/', { waitUntil: 'networkidle' });
    const prev = await page.$('button[aria-roledescription="Previous slide"], button:has-text("Previous slide")');
    const next = await page.$('button[aria-roledescription="Next slide"], button:has-text("Next slide")');
    if (prev) {
      await prev.click();
      console.log('Carousel prev clicked');
    } else {
      console.log('Carousel prev not found');
    }
    if (next) {
      await next.click();
      console.log('Carousel next clicked');
    } else {
      console.log('Carousel next not found');
    }

    console.log('Playwright checks finished');
  } catch (err) {
    console.error('Playwright error:', err);
    process.exitCode = 1;
  } finally {
    await browser.close();
  }
})();