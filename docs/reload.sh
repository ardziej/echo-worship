#!/bin/sh
# This is a comment!
git pull
echo "ECHO Worship updated!"        # update github repo
net stop echoworshiphttp.exe && net start echoworshiphttp.exe
net stop echoworshipsocketio.exe && net start echoworshipsocketio.exe
echo "Services reloaded!"        # This is a comment, too!