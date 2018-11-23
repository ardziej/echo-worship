#!/bin/bash

TYPE='mp4'

DIR='/Users/ardziej/dev/echo/echo-worship/s3/media/videos'
THUMBS="${DIR}/thumbs"
FILES=`find $DIR -type f -iname "*.$TYPE"`

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

        if [[ ! -e $dirc ]]; then
            mkdir $dirc
        elif [[ ! -d $dirc ]]; then
            echo "$dirc already exists but is not a directory" 1>&2
        fi
        echo $PWD
        echo `./ffmpeg.sh $f $dirc`

    fi
done

# Reset IFS
IFS=$SAVEIFS
