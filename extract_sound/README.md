youtube-dl download videos from youtube.com or other video platforms

* INSTALLATION
* OPTIONS
* EXECUTE
* VERSION

# 1. INSTALLATION
Install youtube-dl & ffmpeg
## 1.1 MAC
To install youtube-dl right away for UNIX users(Linux, OS X, etc), type:

    sudo pip install youtube-dl
    brew install youtube-dl

To install ffmpeg, go to the ffmpeg official site or using brew:

    brew install ffmpeg

or

> http://www.ffmpeg.org

## 1.2 Window
Install youtube-dl in cmd window

    sudo pip install youtube-dl

To install ffmpeg, go to the ffmpeg official site

>  http://www.ffmpeg.org

1. 사용자 환경에 맞는 zip 파일 다운로드  
2. 압축해제
3. 폴더 안의 bin 폴더 경로를 환경변수 PATH 에 추가


# 2. OPTIONS
## 2.1 format
    best: best quality format represented by a single file with video and audio.
    worst: worst quality format represented by a single file with video and audio.
    bestvideo: best quality video-only format (e.g. DASH video).
    worstvideo: worst quality video-only format.
    bestaudio: best quality audio only-format.
    worstaudio: worst quality audio only-format.
## 2.2 codec
    "best"(default) --> original codec
    "aac", "flac", "mp3", "m4a", "opus", "vorbis", "wav"
     mp3 requires additional 'libmp3lame' library   
## 2.3 quality
    0(best) ~ 9(worst) or bitrate

# 3. EXECUTE
In cmd or terminal window

    python <해당파일이름>.py

# 4. VERSION
youtube-dl ver 2017.12.31  
ffmpeg ver 3.4.1

