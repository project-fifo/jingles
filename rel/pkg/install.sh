#!/usr/bin/bash

AWK=/usr/bin/awk
SED=/usr/bin/sed

USER=jingles
GROUP=www
DOMAIN="project-fifo.net"
CERTDIR="/var/db/fifo"
CERTPREFIX="fifo"


fail_if_error() {
    [ $1 != 0 ] && {
        unset PASSPHRASE
        exit 10
    }
}

case $2 in
    PRE-INSTALL)
        if [ ! -d /var/db/fifo ]
        then
            #echo Trying to guess network configuration ...

            if ifconfig net1 > /dev/null 2>&1
            then
                IP=`ifconfig net1 | grep inet | $AWK '{print $2}'`
            else
                IP=`ifconfig net0 | grep inet | $AWK '{print $2}'`
            fi
            SUBJ="
C=AU
ST=Victoria
O=Company
localityName=Melbourne
commonName=$IP
organizationalUnitName=None
emailAddress=blah@blah.com
"


            export PASSPHRASE=$(head -c 128 /dev/random  | uuencode - | grep -v "^end" | tr "\n" "d")
            echo "Creating certificates"
            mkdir -p $CERTDIR

            openssl genrsa -des3 -out $CERTDIR/$CERTPREFIX.key -passout env:PASSPHRASE 2048
            fail_if_error $?

            openssl req \
                -new \
                -batch \
                -subj "$(echo -n "$SUBJ" | tr "\n" "/")" \
                -key $CERTDIR/$CERTPREFIX.key \
                -out $CERTDIR/$CERTPREFIX.csr \
                -passin env:PASSPHRASE
            fail_if_error $?

            cp $CERTDIR/$CERTPREFIX.key $CERTDIR/$CERTPREFIX.key.org
            fail_if_error $?

            openssl rsa -in $CERTDIR/$CERTPREFIX.key.org -out $CERTDIR/$CERTPREFIX.key -passin env:PASSPHRASE
            fail_if_error $?

            openssl x509 -req -days 365 -in $CERTDIR/$CERTPREFIX.csr -signkey $CERTDIR/$CERTPREFIX.key -out $CERTDIR/$CERTPREFIX.crt
            fail_if_error $?

            cat $CERTDIR/$CERTPREFIX.key $CERTDIR/$CERTPREFIX.crt > $CERTDIR/$CERTPREFIX.pem

            chgrp -R $GROUP $CERTDIR

            unset PASSPHRASE
        fi

        ;;
    POST-INSTALL)
        if [ ! -f /opt/local/fifo-jingles/scripts/config.js ]
        then
            cp /opt/local/fifo-jingles/scripts/config.js.example /opt/local/fifo-jingles/scripts/config.js
        fi
        ;;
esac
