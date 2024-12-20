from typing import Optional, Annotated, Any
from pydantic import Field, BaseModel, constr
from pydantic.functional_validators import BeforeValidator

PyObjectId = Annotated[str, BeforeValidator(str)]

class ImageModel(BaseModel):
    id: PyObjectId
    filename: str = Field(..., example="image.jpg", description="Name of the uploaded file")
    content_type: str = Field(..., example="image/jpeg", description="MIME type of the file")
    upload_date: str = Field(..., example="2024-12-06T12:34:56Z", description="ISO 8601 formatted upload date")
    image_data: str = Field(..., description="Base64 encoded image data")

class DocumentModel(BaseModel):
    id: PyObjectId
    filename: str = Field(..., example="document.pdf", description="Name of the uploaded file")
    content_type: str = Field(..., example="application/pdf", description="MIME type of the file")
    upload_date: str = Field(..., example="2024-12-06T12:34:56Z", description="ISO 8601 formatted upload date")
    document_data: str = Field(..., description="Base64 encoded document data")

class UploadImageModel(BaseModel):
    id: str = Field(..., example="67530002b29bbd4026426875", description="ID of the image")
    
class UploadDocumentModel(BaseModel):
    id: str = Field(..., example="67530002b29bbd4026426875", description="ID of the document")

class DeleteImageModel(BaseModel):
    id: str = Field(..., example="67530002b29bbd4026426875", description="ID of the image")
    message: str = Field(..., example="Image not found", description="Message information about deleting")
    status_code: int = Field(..., example=404, description="HTTP Status Code")

class DeleteDocumentModel(BaseModel):
    id: str = Field(..., example="67530002b29bbd4026426875", description="ID of the document")
    message: str = Field(..., example="Document not found", description="Message information about deleting")
    status_code: int = Field(..., example=404, description="HTTP Status Code")