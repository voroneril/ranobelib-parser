"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrowserService = void 0;
const error_handler_service_model_1 = require("../../models/error-handler-service.model");
const index_1 = require("../index");
class BrowserService {
    $puppeteer;
    constructor($puppeteer) {
        this.$puppeteer = $puppeteer;
    }
    checkPageStatus(status) {
        if (status !== 200)
            index_1.$errorService.throwError(error_handler_service_model_1.ErrorMsgModel.PAGE_LOADING_ERROR, `${status}`);
    }
    async gotoPage(page, url) {
        let response = await page.goto(url, { timeout: 0 });
        console.log(response.status(), url)
        let retry_left = 3;
        let retry_count = 0;
        
        if(response?.status() != 200) {
            while (retry_left > 0) {
                if(response?.status() != 200) {
                    retry_count = retry_count + 1;
                    console.log('Page status:', response?.status(), 'retry:', retry_count)
                    response = await page.goto(url, { timeout: 0 });
                    retry_left = retry_left - 1;
                    if(response?.status() == 200) {
                        break;
                    }
                }
            }
        }
        
        //this.checkPageStatus(200);
        this.checkPageStatus(response?.status() ?? 404);
    }
    async startBrowser() {
        const cookies = [
            /* 
            
            ./ranobelib-parser/settings/config.json 
            
            */
        ];
        //https://ranobelib.me/ru/book/25335--seishun-buta-yaro
        process.env.PUPPETEER_DISABLE_HEADLESS_WARNING = true;
        
        const browser = await this.$puppeteer.launch({
            //headless: true,
            //PUPPETEER_DISABLE_HEADLESS_WARNING: true,
            //executablePath : '/usr/bin/google-chrome-stable',
            args: [
                '--disable-blink-features=AutomationControlled',
                '--ignore-certificate-errors',
                '--no-sandbox'
            ]
        });
        
        const page = await browser.newPage();
        
        //await page.setCookie(...cookies);
        
        /*await page.goto('https://ranobelib.me/ru/book/25335--seishun-buta-yaro', { timeout: 0 });
        
        await page.evaluate(() => {
          window.localStorage.setItem('adult_caution', '{"media":false,"content":false}');
          window.localStorage.setItem('ui', '{"settings":{"version":"1.1","gridCardsCount":"auto","bottomMenu":"visible","bottomMenuOrder":["bookmarks","catalog","home","notifications","menu"],"homeBlocks":[{"id":"popular-updates","visible":true},{"id":"latest-views","visible":true},{"id":"top-views","visible":true},{"id":"forum","visible":true},{"id":"reviews","visible":true},{"id":"collections","visible":true},{"id":"latest-updates","visible":true},{"id":"top-users","visible":true},{"id":"newest","visible":true}]},"collapseUserBg":false,"startPage":"home","mediaInfo":"standard","tipMessages":["media_adult_caution"],"specificCategories":{"genres":[],"tags":[]}}');
        });*/
        
        return { browser, page };
    }
    async closeBrowser(browser) {
        await browser.close();
    }
}
exports.BrowserService = BrowserService;
//# sourceMappingURL=index.js.map
