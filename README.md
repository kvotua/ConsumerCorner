<div id="header" align="center">
  <img src="https://media.giphy.com/media/M9gbBd9nbDrOTu1Mqx/giphy.gif" width="100"/>
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