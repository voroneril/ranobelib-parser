"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const epub_gen_1 = __importDefault(require("epub-gen"));
const error_handler_service_model_1 = require("../../models/error-handler-service.model");
const axios = require("axios");

class BookService {
    $errorService;
    $browserService;
    $commonService;
    $promptSync;
    constructor($errorService, $browserService, $commonService, $promptSync) {
        this.$errorService = $errorService;
        this.$browserService = $browserService;
        this.$commonService = $commonService;
        this.$promptSync = $promptSync;
    }
    async getBookInfo(url) {
        const { browser, page } = await this.$browserService.startBrowser();
        await this.$browserService.gotoPage(page, url);
        // Паршу инфу по книге на ее главной странице
        const bookInfo = await page.evaluate(() => {
            const title = document.querySelector('div.media-name__body > div.media-name__main');
            const author = document.querySelector('div.media-info-list__item > div.media-info-list__value > span');
            const coverImg = document.querySelector('img.media-cover__img');
            const coverPlaceholder = 'https://aeroclub-issoire.fr/wp-content/uploads/2020/05/image-not-found.jpg';
            return {
                title: title?.textContent || '',
                author: author?.textContent || '',
                cover: coverImg?.src || coverPlaceholder,
                lang: 'ru',
                tocTitle: 'Содержание',
            };
        });
        await this.$browserService.closeBrowser(browser);
        return bookInfo;
    }
    async getChapters(url) {
        //https://old.ranobelib.me/old/manga/urasekai-picnic-novel
        //https://old.ranobelib.me/old/manga/25335--seishun-buta-yaro
        //https://old.ranobelib.me/old/manga/juuni-kokuki
        //https://old.ranobelib.me/old/manga/steinsgate-youen-no-valhalla
        //https://old.ranobelib.me/old/manga/nauji-vartai-novel
        //https://old.ranobelib.me/old/manga/51096--pact
        //https://old.ranobelib.me/old/manga/105979--twig
        //https://old.ranobelib.me/old/manga/138181--tenkyuu-kakeru-sputnik
        
        let html = await axios({
          method: 'get',
          url: url
        })
        html = html.data;
        
        let __CONTENT__ = JSON.parse(html.match(/window\.__CONTENT__ \= (.*?);\n/)[1]);
        let __BRANCHES__ = JSON.parse(html.match(/window\.__BRANCHES__ \= (.*?);\n/)[1]);
        
        let branch_id;
    
        try {
            console.log( 'Находим JSON в котором выводятся все доступные команды перевода');
            if (__BRANCHES__.length > 1) {
                console.log( 'Если таковой есть - получаем все варианты, даем выбор в промпту');
                let teamsButtons = []
                for (let branch of __BRANCHES__) {
                    let team_name = "Неизвестно"
                    for (let team of branch.teams) {
                        team_name = team.name
                    }
                    teamsButtons.push(team_name);
                }
                const prompt = this.$promptSync({ sigint: true });
                console.log(`Найдено ${__BRANCHES__.length} команд, выберите одну (нужно ввести цифру)`);
                teamsButtons.forEach((team, index) => console.log(`${index + 1} ` + team.trim()));
                const selectedTeam = prompt({});
                if (parseInt(selectedTeam) > teamsButtons.length) {
                    this.$errorService.throwError(error_handler_service_model_1.ErrorMsgModel.ELEMENT_COULD_NOT_BE_FOUND, "выбранную команду");
                }
                
                branch_id = __BRANCHES__[parseInt(selectedTeam)-1].id
            }
        } catch { 
            
        }
        console.log( 'Собираю все главы с называниями в один массив');
        
        let chaptersWithTitles = [];
        
        let index = 0;
        for (let item of __CONTENT__) {
            if(branch_id) {
                let add = false;
                for (let branch of item.branches) {
                    if (branch.branch_id == branch_id) {
                        add = true;
                    }
                }
                if(add) {
                    //https://old.ranobelib.me/old/25335--seishun-buta-yaro/v1/c0?bid=8630
                    let link = url.replace('manga/', '') + '/v'+item.volume+'/c'+item.number+'?bid=' + branch_id
                    chaptersWithTitles.push({ 
                        id: index, 
                        title: item.name, 
                        link: link
                    });
                    index++;
                }
            } else {
                let link = url.replace('manga/', '') + '/v'+item.volume+'/c'+item.number
                chaptersWithTitles.push({ 
                    id: index, 
                    title: item.name, 
                    link: link
                });
                index++;
            }
        }
        //chaptersWithTitles = chaptersWithTitles.reverse();
        
        // Сортирую главы по порядку
        // сделал именно сортировкой, так как решил перестраховаться, что все главы в правильном порядке будут
        chaptersWithTitles.sort((a, b) => a.id - b.id);
        
        return chaptersWithTitles;
    }
    async getChapterContent(url) {
        const { browser, page } = await this.$browserService.startBrowser();
        await this.$browserService.gotoPage(page, url);
        // Получаю контент главы, переданной в функцию
        const bookContent = await page.evaluate(() => {
            const content = document.querySelector('div.reader-container.container.container_center');
            if (content) {
                // Если img.src - undfined, заменяем на пустую строку чтоб избежать ошибки epub-gen
                content.querySelectorAll('img').forEach((img) => img.src = img.src || '');
                return content.innerHTML;
            }
            else {
                this.$errorService.throwError(error_handler_service_model_1.ErrorMsgModel.ELEMENT_COULD_NOT_BE_FOUND, 'кнопку чтения книги');
                return '';
            }
        });
        await this.$browserService.closeBrowser(browser);
        return bookContent;
    }
    async getAllBookContent(bookChapters) {
        const bookContent = [];
        console.log('Прохожусь по всем главам, собираю с них весь контент и кладу его в один массив')
        for (const chapter of bookChapters) {
            const content = await this.getChapterContent(chapter.link);
            await this.$commonService.delay(2000);
            const cacheData = {
                data: content,
                id: chapter.id,
                title: chapter.title,
            };
            bookContent.push(cacheData);
        }
        return bookContent;
    }
    generateEpubFromData(bookData) {
        return new epub_gen_1.default(bookData, bookData.output);
    }
}
exports.BookService = BookService;
//# sourceMappingURL=index.js.map
