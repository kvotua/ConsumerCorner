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
        <img src="https://ggilipetsk.ru/wp-content/uploads/2022/04/telegram-1024x670-1.png" style="width: 100px;" alt="kvotua on telegram"/>
    </a>
</div>