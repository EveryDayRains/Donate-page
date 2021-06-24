# donate-page
Установка front-end части проекта.

### Установка на VDS/VPS машину
- Для установки front-end части на VDS/VPS машину, выполните ряд действий:
1. Склонируйте и установите зависимости проекта.
```shell
$ git clone https://github.com/MrLivixx/Donate-page.git
$ npm i 
```
2. Измените файл config.json подставив свои значения
```json
{
  "url": "localhost:8045",
  "dalink": "https://www.donationalerts.com/r/livixx",
  "page_title": "MrLivixx"
}
```
Где: 
- `url` - адрес бекенд сервера и вебсокета
- `dalink` - ваша ссылка на DonationAlerts
- `page_title` - заголовок страницы

Затем, соберите проект
```shell
npm run build
```
Пример конфигурации Nginx
```conf
server {
    server_name donate.mrlivixx.me; 
    listen 80;
    
    location / {
        root   /var/www/www-root/data/www/donate/dist;
        index  index.php index.html;
    }
}
```
### Отдельное спасибо 
egor_m за помощь с frontend-частью и дизайном
<br><img src="https://donate.mrlivixx.me/aem_logo.svg" alt="art egor_m" width="128" style="border-radius: 5px; margin-top: 10px;"/>