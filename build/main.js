"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./services/index");
const path = __importStar(require("path"));
const fs = require('fs');
index_1.$commonService.userAlert();
const PAGE_URL = index_1.$commonService.getBookURL();
const BOOK_NAME = PAGE_URL.split('/').pop();
const OUTPUT_BOOK_PATH = `${path.dirname(__filename)}/../books/${BOOK_NAME}.epub`;
(async () => {
    let adult_caution = false;
    if(process.env.ADULT === '1' || process.env.ADULT === 1) {
        adult_caution = true;
    }

    console.log('\nПолучение информации о книге...');
    await index_1.$commonService.delay(1000);
    const bookInfo = await index_1.$bookService.getBookInfo(PAGE_URL, adult_caution);
    
    console.log('\nПолучение списка глав...');
    await index_1.$commonService.delay(1000);
    const chapters = await index_1.$bookService.getChapters(PAGE_URL, adult_caution);
    
    console.log('\nЗагрузка всех глав книги, поочередно...');
    await index_1.$commonService.delay(1000);
    const bookContent = await index_1.$bookService.getAllBookContent(chapters, adult_caution);
    const epubBookOptions = {
        ...bookInfo,
        content: [...bookContent],
        output: OUTPUT_BOOK_PATH,
        verbose: true,
        userAgent : "PostmanRuntime/7.42.0",
        tempDir : './tmp/'
    };
    
    console.log(`\nГенерация книги ${BOOK_NAME}.epub в папке books/\n`);
    await index_1.$commonService.delay(1000);
    
    fs.writeFileSync( './books/' + `${BOOK_NAME}.json`, JSON.stringify(epubBookOptions));
    
    index_1.$bookService.generateEpubFromData(epubBookOptions).promise.then(
        () => console.log('\nКнига успешно добавлена в папку book/'),
        err => console.error("Failed to generate Ebook because of ", err)
    );
    //console.log(book);
})();
//# sourceMappingURL=index.js.map
