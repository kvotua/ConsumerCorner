from datetime import datetime


def parse_time(opening_closing_time):
    return datetime.strptime(opening_closing_time, "%H:%M").time()