<div id="header" align="center">
  <img src="https://media1.tenor.com/m/5ry-200hErMAAAAd/hacker-hacker-man.gif" width="200"/>
</div>

# Digital Corner

Перейдите в папку проекта:

```bash
cd ваш_репозиторий
```

Скопируйте .env.example:

```bash
cp .env.example .env
ln -s ./env ./backend/.env
```

Сделайте билд и запустите проект:

```bash
docker-compose build
docker-compose up -d
```

Запустите deploy:

```bash
bash deploy.sh
```
<div id="footer" align="center" style="border-radius: 6px;">
    <a href="https://t.me/kvotua">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/1200px-Telegram_logo.svg.png" style="height: 100px;" alt="kvotua on telegram"/>
    </a>
    <a href="https://github.com/kvotua">
        <img src="https://avatars.githubusercontent.com/u/60317000?s=400&u=cc0869e176238dc748c2b0be0bffa4314bd0e86f&v=4" style="height: 100px;" alt="kvotua on github"/>
    </a>
</div>