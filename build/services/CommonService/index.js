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
        console.log('\nВо время загрузки у Вас, несколько раз, будет открываться и закрываться окно браузера.');
        console.log('Пожалуйста, не беспокойтесь, так и должно быть.');
        console.log('Во время загрузки, пожалуйста, не трогайте окно браузера, это может привести к сбоям.');
    }
    getBookURL() {
        const prompt = this.$promtSync({ sigint: true });
        console.log("\nВведите, пожалуйста, адрес книги с сайта ranobelib.me");
        console.log("Пример адреса: https://old.ranobelib.me/old/manga/138524--sword-art-online-side-stories");
        console.log('Пожалуйста, указывайте верный адрес, во избежания проблем с работой программы.');
        const URL = prompt({});
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
