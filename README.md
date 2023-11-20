# Скачивание книг с сайта ranobelib в формате epub

Парсер который позволяет скачать книги с ranobelib.me в формате epub

## Как использовать:
**[ОБЯЗАТЕЛЬНО] Предварительно скачать браузер [Google Chrome](https://www.google.com/intl/ru_ru/chrome/).**

**[ОБЯЗАТЕЛЬНО] Установить [NodeJS](https://nodejs.org) последней версии.**

1) Скачайте и распакуйте или склонируйте репозиторий через [git](https://git-scm.com/), в любое удобное место 
2) Запуск программы:
    * Если вы пользователь **Windows**: запустите файл `start.bat`
    * Если вы пользователь **MacOS** или **Linux**: запустите файл `start.sh` из терминала
3) Запуск программы в ручном режиме (для опытных пользователей):
   * Если вы пользователь **Windows**: запустите командную строку 
   и перейдите в папку с программой командой `cd C:\path\to\folder`
   (вместо `C` поставьте букву диска, куда Вы распаковали программу)
   > Пример: папка с программой лежит на рабочем столе и называется parser-ranobelib.
     Команда будет: `cd C:\Users\UserName\Desktop\parser-ranobelib`
     Где `UserName` это имя пользователя компютера
   * Если вы пользователь **MacOS** или **Linux**: запустите терминал
     и перейдите в папку с программой командой `cd /path/to/folder`
   > Пример: папка с программой лежит в загрузках и называется parser-ranobelib.
     Команда будет: `cd ~/Downloads/parser-ranobelib`
   1) Запустите команду `npm install`
   2) Дождитесь завершения установки пакетов, необходимых для работы программы
   3) Запустите команду `npm start` после завершения установки пакетов
4) Следуйте инструкциям на экране
5) Читайте с удовольствием! :)

Скачанные книги будут хранится в папке `books/`


## Планируется сделать
- [ ] Сделать проверку урла на соответствие примеру
- [ ] Добавить обработчик ошибок на частые сценарии поведения

------------------------------------------

### Сделано
- [x] Добавить bash и bat скрипты, для удобного запуска
- [x] Переехать на typescript

## Нематериальная поддержка (денег не надо)

Если вы хотите поддержать проект, не стесняйтесь кидать **issues**. 
Прошу подробно описывать проблему, с которой вы столкнулись.
Я постараюсь, по возможности, помочь Вам с решением :)

## Разработчикам

Если Вы хотите помочь разработке проекта, присылайте **pull request**.
Я обязательно рассмотрю его :)