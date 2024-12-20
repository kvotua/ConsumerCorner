from datetime import datetime
import validators

def parse_time(opening_closing_time):
    return datetime.strptime(opening_closing_time, "%H:%M").time()

def validating_link(link: str) -> bool:
    is_valid = validators.url(link)
    if is_valid is True:
        return True
    else:
        return False