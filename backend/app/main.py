import uuid
from fastapi import FastAPI, HTTPException
from fastapi.responses import RedirectResponse
from pydantic_extra_types.phone_numbers import PhoneNumber
from app.models import (
    ProprietorID,
    Token,
    ProprietorBase,
    Proprietor,
)
from app.database import proprietors_collection

app = FastAPI()

codes: dict[PhoneNumber, str] = {}
proprietorID_to_token: dict[ProprietorID, Token] = {}
token_to_proprietorID: dict[ProprietorID, Token] = {}


@app.get("/proprietors", tags=["Proprietors"])
async def get_proprietor(token: Token) -> Proprietor:
    proprietorID = token_to_proprietorID.get(token, None)
    if proprietorID is None:
        raise HTTPException(status_code=404, detail="Wrong token")
    proprietor = Proprietor(**proprietors_collection.find_one({"id": proprietorID}))
    return proprietor


@app.post("/proprietors", tags=["Proprietors"])
async def post_proprietor(proprietor: ProprietorBase, code: str) -> Token:
    stored_code = codes.get(proprietor.phone_number, None)
    if stored_code is None:
        raise HTTPException(status_code=400, detail="Phone number doesn't have code")
    if stored_code != code:
        raise HTTPException(status_code=400, detail="Wrong code")
    codes.pop(proprietor.phone_number)
    proprietor = Proprietor(**proprietor.model_dump())
    proprietors_collection.insert_one(proprietor.model_dump())
    token = str(uuid.uuid4())
    proprietorID_to_token[proprietor.id] = token
    token_to_proprietorID[token] = proprietor.id
    return token


@app.get("/proprietors/token", tags=["Proprietors"])
async def get_proprietor_token(phone_number: PhoneNumber, code: str) -> Token:
    stored_code = codes.get(phone_number, None)
    if stored_code is None:
        raise HTTPException(status_code=400, detail="Phone number doesn't have code")
    if stored_code != code:
        raise HTTPException(status_code=400, detail="Wrong code")
    codes.pop(phone_number)
    token = str(uuid.uuid4())
    proprietor = Proprietor(
        **proprietors_collection.find_one({"phone_number": phone_number})
    )
    proprietorID_to_token[proprietor.id] = token
    token_to_proprietorID[token] = proprietor.id
    return token


@app.get("/proprietors/verify/phone", tags=["Proprietors"])
async def get_proprietor_verify_phone(phone_number: PhoneNumber) -> None:
    # TODO: generate random six-digit code
    code = "000000"
    codes[phone_number] = code
    # TODO: send code via SMS


@app.get("/", include_in_schema=False)
def read_root():
    return RedirectResponse("/docs")
