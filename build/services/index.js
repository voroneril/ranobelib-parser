"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.$bookService = exports.$commonService = exports.$browserService = exports.$errorService = void 0;
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const puppeteer_1 = __importDefault(require("puppeteer"));
const index_1 = require("./ErrorHandler/index");
const index_2 = require("./BrowserService/index");
const index_3 = require("./CommonService/index");
const index_4 = require("./BookService/index");
const $errorService = new index_1.ErrorHandler();
exports.$errorService = $errorService;
const $browserService = new index_2.BrowserService(puppeteer_1.default);
exports.$browserService = $browserService;
const $commonService = new index_3.CommonService(prompt_sync_1.default);
exports.$commonService = $commonService;
const $bookService = new index_4.BookService($errorService, $browserService, $commonService, prompt_sync_1.default);
exports.$bookService = $bookService;
//# sourceMappingURL=index.js.map