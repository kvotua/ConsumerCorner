import smtplib
from abc import ABC, abstractmethod
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


class IEmailer(ABC):
    @staticmethod
    @abstractmethod
    def send(to: str, subject: str, text: str) -> None:
        pass


class Emailer(IEmailer):
    @staticmethod
    def send(to: str, subject: str, text: str) -> None:
        # TODO: env var
        sender_email = "info.digital-corner@yandex.ru"
        sender_password = "password"

        message = MIMEMultipart("alternative")
        message["Subject"] = subject
        message["From"] = sender_email
        message["To"] = to
        message.attach(MIMEText(text, "html", "utf-8"))

        server = smtplib.SMTP_SSL("smtp.yandex.ru", 465)
        server.ehlo(sender_email)
        server.login(sender_email, sender_password)
        server.auth_plain()
        server.sendmail(message["From"], message["To"], message.as_string())
        server.quit()
