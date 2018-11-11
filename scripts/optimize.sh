sourcefile=$1
#destfile=$2

# Overly simple validation
if [ ! -e "$sourcefile" ]; then
  echo 'Please provide an existing input file.'
  exit
fi

#if [ "$destfile" == "" ]; then
#  echo 'Please provide an output preview file name.'
#  exit
#fi

# Detect destination file extension
#extension=${destfile#*.}

# Get video length in seconds
#length=$(ffprobe $sourcefile  -show_format 2>&1 | sed -n 's/duration=//p' | awk '{print int($0)}')


ffmpeg -i $sourcefile -vcodec h264 -acodec aac optimized/$sourcefile

#ffmpeg -i $sourcefile -vf scale=$dimensions -preset fast -qmin 1 -qmax 1 -an -ss $formattedstart -t $snippetlengthinseconds $tempdir/$i.$extension 


echo 'Done!'