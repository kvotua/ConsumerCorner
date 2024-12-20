FROM adminer:4.8.0
# WATCH OUT WHEN UPGRADING, THE SED BELOW MIGHT STOP WORKING
USER root

RUN apk add autoconf gcc g++ make libffi-dev openssl-dev
RUN pecl install mongodb
RUN echo "extension=mongodb.so" > /usr/local/etc/php/conf.d/docker-php-ext-mongodb.ini

# MongoDB allows connections without password.
# But that doesn't fly with Adminer which prints 'Database does not support password.' for such case.
#
# Jakub Vrana (Adminer author says): (https://sourceforge.net/p/adminer/bugs-and-features/635/#429d)
#   This is what Adminer does:
#   1. Connect with password.
#   2. If it fails, report the error.
#   3. If it succeeds, try to connect without the password.
#   4. If it succeeds, report "Database does not support password." because otherwise anyone can connect to your database using Adminer.
#   5. If it fails, continue normally.
#
# So it's clearly expected and documented behaviour that Adminer refuses to log in even
# if the credentials are fine as long as it's also possible to log in without password.
#
# To combat this, we would remove the empty password check in the minified adminer.php version.
# In the source file, it's these two lines that would be removed https://github.com/vrana/adminer/blob/v4.8.0/adminer/drivers/mongo.inc.php#L17-L18
#
# This is a part of the minified adminer.php file which contains those two lines:
# MongoClient($Li,$zf);if($zf["password"]!=""){$zf["password"]="";try{
# MongoClient($Li,$zf);$this->error=lang(22);}catch(Exception$pc){}}}catch(Exception$pc){$this->error=$pc->getMessage();}
#
# # and by the sed below, we remove the contents of the try catch block:
# MongoClient($Li,$zf);if($zf["password"]!=""){$zf["password"]="";try{
# }catch(Exception$pc){}}}catch(Exception$pc){$this->error=$pc->getMessage();}

RUN sed -i "s|{new|{|" adminer.php
RUN sed -i "s|MongoClient($Li,$zf);$this->error=lang(22);}|}|" adminer.php

USER adminer