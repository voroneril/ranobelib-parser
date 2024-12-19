# @voroneril/ranobelib-parser

Парсер который позволяет скачать книги с [old.ranobelib.me](https://old.ranobelib.me/) в формате epub
Forked from [ryadik/ranobelib-parser](https://github.com/ryadik/ranobelib-parser)

## Использование

### Обычное скачивание: 
```
    npm start
```

### 18+ скачивание:
1) Поместите json содержащий apilib_session и XSRF-TOKEN в `settings/cookies.json`

```
[
    {
        "name": "XSRF-TOKEN",
        "domain": "old.ranobelib.me",
        "value": "XXXXXX%3D"
    },
    {
        "name": "apilib_session",
        "domain": "old.ranobelib.me",
        "value": "XXXXXX%3D"
    }
]

```
2) запустите:
```
    npm run adult
```

Скачанные книги будут хранится в папке `books/`
