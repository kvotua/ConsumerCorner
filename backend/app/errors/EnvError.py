class EnvError(Exception):    
    def __init__(self, message):
        super().__init__(message)

    def __str__(self):
        return f"EnvError: {self.args[0]}"