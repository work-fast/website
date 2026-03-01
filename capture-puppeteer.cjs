const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    console.log("Launching browser...");
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    let logs = [];

    page.on('console', msg => {
        const text = `[${msg.type()}] ${msg.text()}`;
        logs.push(text);
        console.log(text);
    });

    page.on('pageerror', error => {
        const text = `[PAGE ERROR] ${error.message}\n${error.stack}`;
        logs.push(text);
        console.error(text);
    });

    try {
        console.log("Navigating to http://localhost:5174 ...");
        await page.goto('http://localhost:5174', { waitUntil: 'networkidle0', timeout: 10000 });
        const content = await page.content();
        logs.push(`[INFO] HTML length: ${content.length}`);

        await new Promise(r => setTimeout(r, 2000)); // wait for lazy errors

        fs.writeFileSync('browser_logs.txt', logs.join('\n'));
        console.log("Successfully wrote logs to browser_logs.txt");
    } catch (e) {
        console.error("Navigation error:", e);
    } finally {
        await browser.close();
    }
})();
