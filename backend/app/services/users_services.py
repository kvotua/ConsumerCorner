from email_validator import validate_email, EmailNotValidError


def validate_fio(fio):
    name = fio.split()
    if len(name) == 3 and name[0].istitle() and name[1].istitle() and name[2].istitle():
        return fio
    else:
        return None

def validate_email_address(email):
    if email:
        try:
            validated_email = validate_email(email)
            return validated_email['email']
        except EmailNotValidError as e:
            return None
    return None