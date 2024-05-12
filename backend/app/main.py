import os

from fastapi import FastAPI

debug = os.getenv("DEBUG") is not None
app = FastAPI(debug=debug)
