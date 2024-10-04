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
        const response = await page.goto(url, { timeout: 0 });
        console.log(url, '| response.status: ', response.status())
        //this.checkPageStatus(200);
        this.checkPageStatus(response?.status() ?? 404);
    }
    async startBrowser() {
        let set_cookie = false;
        let set_localStorage = false;

        process.env.PUPPETEER_DISABLE_HEADLESS_WARNING = true;
        
        const browser = await this.$puppeteer.launch({
            headless: true,
            //executablePath : '/usr/bin/google-chrome-stable',
            args: [
                '--disable-blink-features=AutomationControlled',
                '--ignore-certificate-errors',
                '--no-sandbox'
            ]
        });
        
        const page = await browser.newPage();
        
        if(set_cookie) {
            const cookies = [
                {
                  'name': 'XSRF-TOKEN',
                  'domain': 'ranobelib.me',
                  'value': 'хеш-токена-тут%3D'
                },{
                  'name': 'apilib_session',
                  'domain': 'ranobelib.me',
                  'value': 'хеш-токена-тут%3D'
                }
            ];
            await page.setCookie(...cookies);
        }
        
        if(set_localStorage) {
            await page.goto('https://ranobelib.me', { timeout: 0 });
            let ui = {
                "settings": {
                    "version": "1.1",
                    "gridCardsCount": "auto",
                    "bottomMenu": "visible",
                    "bottomMenuOrder": ["bookmarks","catalog","home","notifications","menu"],
                    "homeBlocks": [
                        {"id":"popular-updates","visible":true},
                        {"id":"latest-views","visible":true},
                        {"id":"top-views","visible":true},
                        {"id":"forum","visible":true},
                        {"id":"reviews","visible":true},
                        {"id":"collections","visible":true},
                        {"id":"latest-updates","visible":true},
                        {"id":"top-users","visible":true},
                        {"id":"newest","visible":true}
                    ]
                },
                "collapseUserBg": false,
                "startPage": "home",
                "mediaInfo": "standard",
                "tipMessages": ["media_adult_caution"],
                "specificCategories": {"genres":[],"tags":[]}
            }

            await page.evaluate(() => {
              window.localStorage.setItem('adult_caution', '{"media":false,"content":false}');
              window.localStorage.setItem('ui', JSON.stringify(ui));
            });
        }
        
        return { browser, page };
    }
    async closeBrowser(browser) {
        await browser.close();
    }
}
exports.BrowserService = BrowserService;
//# sourceMappingURL=index.js.map
