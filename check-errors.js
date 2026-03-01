const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    page.on('console', msg => {
        if (msg.type() === 'error') {
            console.error(`PAGE LOG ERROR: ${msg.text()}`);
        } else {
            console.log(`PAGE LOG: ${msg.text()}`);
        }
    });

    page.on('pageerror', error => {
        console.error(`PAGE ERROR: ${error.message}`);
    });

    try {
        await page.goto('http://localhost:5174', { waitUntil: 'networkidle', timeout: 5000 });
        const content = await page.content();
        console.log("HTML length:", content.length);

        // Wait a bit to see if delayed errors happen
        await page.waitForTimeout(2000);
    } catch (e) {
        console.error("Navigation error:", e);
    } finally {
        await browser.close();
    }
})();
