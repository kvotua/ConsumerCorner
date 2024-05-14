from fastapi_jwt import JwtAccessBearerCookie, JwtRefreshBearerCookie

JWT_SECRET = "secret"
access_security = JwtAccessBearerCookie(secret_key=JWT_SECRET)
refresh_security = JwtRefreshBearerCookie(secret_key=JWT_SECRET)
