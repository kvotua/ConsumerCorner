# app

## Auth Token
FastAPI-Users:
- Transport: Bearer
- Strategy: Database

## Alembic

### Генерация миграции
```shell
alembic revision --autogenerate -m "комментарий"
```

### Выполнение миграции
```shell
alembic upgrade head
```

### Откат миграции
```shell
alembic downgrade -1
```

### Откат всех миграций
```shell
alembic downgrade base
```