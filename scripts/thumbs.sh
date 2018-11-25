#!/bin/bash

TYPE='mp4'

DIR='/Users/ardziej/dev/echo/echo-worship/s3/media/videos'
THUMBS="${DIR}/thumbs"
FILES=`find $DIR -type f -iname "*.$TYPE" -not -path "$THUMBS*"`

if [[ ! -e $THUMBS ]]; then
    mkdir $THUMBS
fi
# Set the field seperator to newline instead of space
SAVEIFS=$IFS
IFS=$(echo -en "\n\b")

for f in $FILES; do
    if [ -f $f ]; then
        filename="${f##*/}"                      # Strip longest match of */ from start
        dir="${f:0:${#f} - ${#filename}}" # Substring from 0 thru pos of filename
        base="${filename%.[^.]*}"                       # Strip shortest match of . plus at least one non-dot char from end
        ext="${filename:${#base} + 1}"                  # Substring from len of base thru end
        if [[ -z "$base" && -n "$ext" ]]; then          # If we have an extension and no base, it's really the base
            base=".$ext"
            ext=""
        fi
        echo -e "$f:\n\tdir  = \"$dir\"\n\tbase = \"$base\"\n\text  = \"$ext\""

        dirc="${dir}thumbs/${base}"

        if [[ -d $dirc ]]; then
            echo "SKIP this one"
        elif [[ ! -d $dirc ]]; then
            mkdir $dirc
            echo `./ffmpeg.sh $f $dirc`
        fi



    fi
done

# Reset IFS
IFS=$SAVEIFS
