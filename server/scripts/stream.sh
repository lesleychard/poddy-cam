ffmpeg \
    -thread_queue_size 512 -f v4l2 -i /dev/video0 \
    -ar 44100 -ac 2 -acodec pcm_s16le -f s16le -ac 2 -i /dev/zero -acodec aac -ab 128k -strict experimental \
    -aspect 16:9 -vcodec h264 -preset veryfast -crf 25 -pix_fmt yuv420p -g 60 -vb 820k -maxrate 820k -bufsize 820k -profile:v baseline \
    -r 30 -f flv rtmp://a.rtmp.youtube.com/live2/${STREAM_KEY}