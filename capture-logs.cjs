const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    let logs = [];

    page.on('console', msg => {
        logs.push(`[${msg.type()}] ${msg.text()}`);
        console.log(`[${msg.type()}] ${msg.text()}`);
    });

    page.on('pageerror', error => {
        logs.push(`[PAGE ERROR] ${error.message}\n${error.stack}`);
        console.error(`[PAGE ERROR] ${error.message}`);
    });

    try {
        await page.goto('http://localhost:5174', { waitUntil: 'networkidle', timeout: 10000 });
        const content = await page.content();
        logs.push(`[INFO] HTML length: ${content.length}`);

        await page.waitForTimeout(3000);

        fs.writeFileSync('browser_logs.txt', logs.join('\n'));
        console.log("Successfully wrote logs to browser_logs.txt");
    } catch (e) {
        console.error("Navigation error:", e);
    } finally {
        await browser.close();
    }
})();
