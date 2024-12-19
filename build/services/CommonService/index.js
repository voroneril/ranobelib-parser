"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonService = void 0;
class CommonService {
    $promtSync;
    constructor($promtSync) {
        this.$promtSync = $promtSync;
    }
    userAlert() {
        console.log('Здравствуйте, это программа загрузки книг с сайта old.ranobelib.me');
        console.log('Пожалуйста, прочитайте информацию ниже.');
    }
    getBookURL() {
        const prompt = this.$promtSync({ sigint: true });
        console.log("\nВведите, пожалуйста, адрес книги с сайта ranobelib.me или old.ranobelib.me");
        console.log("Пример адреса: https://old.ranobelib.me/old/manga/138524--sword-art-online-side-stories");
        console.log("или: https://ranobelib.me/ru/book/sword-art-online-side-stories");
        console.log('Пожалуйста, указывайте верный адрес, во избежания проблем с работой программы.');
        let URL = prompt({});
        
        if (URL.charAt(URL.length - 1) == "/") {
            URL = URL.substr(0, URL.length - 1);
        }
        
        if(URL.indexOf('old.ranobelib.me') == -1) {
            let URL_array = URL.split('/')
            URL = 'https://old.ranobelib.me/old/manga/' + URL_array[URL_array.length -1]
        }
        
        console.log(`\nСейчас начнется загрузка книги, по адресу: ${URL}`);
        return URL;
    }
    delay(time) {
        return new Promise(function (resolve) {
            setTimeout(resolve, time);
        });
    }
}
exports.CommonService = CommonService;
//# sourceMappingURL=index.js.map
