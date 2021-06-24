# Donate page backend
Back-end часть проекта

### Для запуска проекта выполните ряд действий:
- Склонируйте репозиторий и установите зависимости
```shell
$ git clone https://github.com/MrLivixx/Donate-page.git
$ npm i 
```
Или установите бекенд часть проекта на хероку по нажатию одной кнопки!
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/MrLivixx/donate-page)
- Смените название файла .env.example на .env и подставьте свои значения
<br>Пример:
```dotenv
DB_URL=mongodb+srv://****/donatepage
PORT=1045
CORS_URL=http://localhost:8080

#DISCORD OAUTH
DISCORD_CLIENT_ID=ID
DISCORD_REDIRECT_URL=https://api.donate.mrlivixx.me/oauth2/discord/callback
DISCORD_CLIENT_SECRET=****

#VK OAUTH
VK_CLIENT_ID=ID
VK_CLIENT_SECRET=****
VK_REDIRECT_URL=https://api.donate.mrlivixx.me/oauth2/vk/callback
VK_API_KEY=fghjlwe.gdhyh
#JWT

JWT_SECRET=HASH_KEY

# PAYMENTS
#Donatinon Alerts api key
DA_SECRET=adlj123&*
#QIWI SECRET p2p KEY
QIWI_SECRET_KEY=******
#QIWI THEME
QIWI_THEME=Nykyta-S0FqLeU_kv
```
###Коротко о том что за значения надо внести в .env

- `DB_URL` - Ссылка на базу данных mongodb. Как создать базу данных можете прочитать в моём другом гайде [здесь](https://github.com/sqdsh/simple-discord-bot/blob/gh-pages/index.md#прочее)
- `PORT` - Порт веб сервера, для работы на своей VPS/VDS машине, использовать прокси как nginx и apache2. Если heroku/glitch оставить пустым
- `CORS_URL` - Адрес сайта для защиты сокета и API с помощью [cors](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- `DISCORD_CLIENT_ID` - CLIENT ID вашего Discord приложения
- `DISCORD_REDIRECT_URL` - Ссылка после удачной авторизации (должна иметь `/oauth2/discord/callback` если иная, то обязательно смените в routers.ts)
- `DISCORD_CLIENT_SECRET` - Client secret вашего приложения
- `VK_CLIENT_ID` - ID вашего приложение в ВКонтакте
- `VK_CLIENT_SECRET` - Защищённый ключ приложения
- `VK_REDIRECT_URL` - Ссылка после удачной авторизации (должна иметь `/oauth2/vk/callback` если иная, то обязательно смените в routers.ts)
- `VK_API_KEY` - Сервисный ключ доступа	вашего приложения
- `JWT_SECRET` - Случайное значение с [сайта](https://randomkeygen.com/) для работы авторизации
- `DA_SECRET` - Секретный ключ с [DonationAlerts](https://www.donationalerts.com) об котором поговорим ниже
- `QIWI_SECRET_KEY` - Секретный ключ p2p для оплаты.
- `QIWI_THEME` - Код вашей темы.

# Настройка
Перейдём к настройке бекенда, для работы
## Авторизация
### Discord
- Для настройки авторизации через Discord, вы должны перейти на [портал разработчиков](https://discord.com/developers) и создать своё приложение.
![](https://imgs.mrlivixx.me/opera_sW5M8Fodd7.png)
- Далее, перейти в само приложение и во вкладку "OAuth2"
![](https://imgs.mrlivixx.me/opera_nUmez0CG50.png)
- Затем, копируем CLIENT ID и CLIENT SECRET ставим его в строчку `DISCORD_CLIENT_ID` и `DISCORD_CLIENT_SECRET` в файле .env 
![](https://imgs.mrlivixx.me/opera_CzGdL73auE.png)
- И для того чтобы авторизация работала, надо указать доверенную ссылку перенаправления в формате `https://вашдомен.ру/oauth2/discord/callback`
![](https://imgs.mrlivixx.me/opera_87kfm44xJh.png)
Готово! Мы настроили авторизацию через Discord
### VK
- Для настройки авторизации через VK, вы должны перейти на [страницу приложений](https://vk.com/apps?act=manage) и создать своё приложение
![](https://imgs.mrlivixx.me/opera_aSuufChRcl.png)
- При создании в поле "Название" пишите своё имя. В поле "Адрес сайта" **Адрес сайта** на котором будет таблица, в поле **Базовый домен** ссылку на бекенд проекта.
![](https://imgs.mrlivixx.me/opera_8P6tsEf9xv.png)
- После этого, идём во вкладку "Настройки", и скопируйте ID приложения и вставьте его в .env в значение `VK_CLIENT_ID`, защищённый ключ в `VK_CLIENT_SECRET`, сервисный ключ доступа в `VK_API_KEY`.
![](https://imgs.mrlivixx.me/opera_e7TqHFbRAu.png)
- И для того чтобы авторизация работала, надо указать доверенную ссылку перенаправления в формате `https://вашдомен.ру/oauth2/vk/callback`, как делали ранее
![](https://imgs.mrlivixx.me/opera_nnZAIoBF9h.png)
Готово! Мы настроили авторизацию через VK

## Приём донатов
### Donation alerts
Для получения донатов через [DonationAlerts](https://donationalerts.com) необходимо сделать следующие действия:
- Авторизоваться на сайте через соц. сети и перейти в панель управления.
![](https://imgs.mrlivixx.me/opera_s4bSH8r3U2.png)
- В панели управления открыть вкладку "Основные настройки" и скопируйте секретный токен и укажите его в `DA_SECRET`
![](https://imgs.mrlivixx.me/opera_68BNihALpM.png)

Готово! Мы сделали приём донатов через DonationAlerts!
  
Если вы не хотите принимать донаты через DonationAlerts, то оставьте поле `DA_SECRET` в .env пустым.

### Qiwi p2p
> Говорю заранее, этот способ доступен только для кошельков, **имеющие** статус **Основной** и выше, с анонимными кошельками не выйдет, для отключения оплаты через Qiwi p2p не указывайте данные в .env связанные с Qiwi.
- Для настройки p2p Qiwi, вы должны перейти на страницу [Qiwi p2p](https://p2p.qiwi.com) и авторизоваться.
![](https://imgs.mrlivixx.me/opera_zRqYQFaa72.png)
- После этого, в панели открываем вкладку "API" и листаем до "Аутентификационные данные"
![](https://imgs.mrlivixx.me/opera_9bW5lrCw1v.png)
- Жмём на кнопку "Создать пару ключей и настроить", пишите желаемое имя и **обязательно** ставим галочку на "Использовать эту пару ключей для серверных уведомлений об изменении статусов счетов 
Подробнее об уведомлениях" и указываем туда ссылку в форме `https://вашдомен.ру/qiwi/callback`, после этого копируем секретный ключ и указываем его в .env в `QIWI_SECRET_KEY`
![](https://imgs.mrlivixx.me/opera_OZ2f9o65Zl.png)
Готово! Мы настроили приём платежей через Qiwi p2p.
  
## Прочие настройки
<br>`DB_URL` - укажите туда ссылку на вашу базу данных MongoDB
<br>`JWT_SECRET` - Обязательно необходимо указать значение с [](https://randomkeygen.com/) для подписания токенов сессий. [Подробнее об системе](https://jwt.io)
<br>Для работы сайта только с вашего домена, в поле `CORS_URL` укажите адрес своего сайта, если защита не нужна, укажите `*` что крайне не рекомендуется.
<br>Если вы хотите кастомизировать страницу оплату Qiwi, то перейдите на страницу [форму переводов](https://qiwi.com/p2p-admin/transfers/link) и при нажатии на кнопку "настроить", вам будет предложено настроить внешний вид, после этого, скопируйте код который показан на скриншоте и укажите его в `QIWI_THEME` без кавычек
![](https://imgs.mrlivixx.me/opera_y5izt5UL1L.png)
