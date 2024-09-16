import smtplib
from abc import ABC, abstractmethod
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from core.config import settings


class IEmailer(ABC):
    @staticmethod
    @abstractmethod
    def send(to: str, subject: str, text: str) -> None:
        """
        Sends an email.

        Args:
            to (`str`): The recipient's email address.
            subject (`str`): The subject of the email.
            text (`str`): The HTML content of the email.
        Raises:
            smtplib.SMTPException: If there is an issue with sending the email.
        """
        pass


class Emailer(IEmailer):
    @staticmethod
    def send(to: str, subject: str, text: str) -> None:
        sender_email = settings.emailer.email
        sender_password = settings.emailer.password

        message = MIMEMultipart("alternative")
        message["From"] = sender_email
        message["To"] = to
        message["Subject"] = subject
        message.attach(MIMEText(text, "html", "utf-8"))

        try:
            server = smtplib.SMTP_SSL(
                host=settings.emailer.smtp_host,
                port=settings.emailer.smtp_port,
            )
            server.ehlo(sender_email)
            server.login(sender_email, sender_password)
            server.auth_plain()
            server.sendmail(message["From"], message["To"], message.as_string())
        except smtplib.SMTPException as e:
            raise smtplib.SMTPException(f"Error sending email: {e}")
        finally:
            server.quit()
