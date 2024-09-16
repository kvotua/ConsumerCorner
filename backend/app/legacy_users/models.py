from pynamodb.attributes import BooleanAttribute, MapAttribute, UnicodeAttribute
from pynamodb.models import Model

from .schemas import EmailSchema, UserId, UserSchema


class EmailModel(MapAttribute):
    value = UnicodeAttribute()
    verified = BooleanAttribute()

    def to_schema(self) -> EmailSchema:
        return EmailSchema(value=self.value, verified=self.verified)


class UserModel(Model):
    class Meta:
        table_name = "User"
        region = "dummy"
        host = "http://dynamodb:8000"
        aws_access_key_id = "dummy"
        aws_secret_access_key = "dummy"

    id = UnicodeAttribute(hash_key=True)
    email = EmailModel()
    name = UnicodeAttribute()
    surname = UnicodeAttribute()
    password = UnicodeAttribute()

    def to_schema(self) -> UserSchema:
        return UserSchema(
            id=UserId(self.id),
            email=self.email.to_schema(),
            name=self.name,
            surname=self.surname,
        )
