#!/usr/bin/bash

case $2 in
    DEINSTALL)
	;;
    POST-DEINSTALL)
	echo "Please beware that custom configurations were not removed."
	echo "You will have to adjust your webserver configuration by hand!"
	;;
esac
