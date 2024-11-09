const { default: axios } = require("axios");


const scraperObject = {
	url: 'https://923fm.radiostream321.com',
	async scraper(browser){
		let page = await browser.newPage();
		console.log(`Navigating to ${this.url}...`);
		await page.goto(this.url);
		// Wait for the required DOM to be rendered
        setTimeout(function() {
        }, 3000);
        const elementHandle = await page.$('#urladdress');
        const textContent = await page.evaluate(el => el.textContent, elementHandle);
        const link =  await textContent.replace(/(\r\n|\n|\r)/gm, "");


		console.log(link);
			// Wait for the required DOM to be rendered
			setTimeout(function() {
			}, 3000);
			axios.put('http://localhost:3000/api/hawaslink', {link: link})

		
	}
}

module.exports = scraperObject;
		