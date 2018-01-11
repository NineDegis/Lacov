from __future__ import unicode_literals
import youtube_dl

"""
#format
    best: best quality format represented by a single file with video and audio.
    worst: worst quality format represented by a single file with video and audio.
    bestvideo: best quality video-only format (e.g. DASH video). 
    worstvideo: worst quality video-only format. 
    bestaudio: best quality audio only-format.
    worstaudio: worst quality audio only-format.

#codec
   "best"(default) --> original codec
   "aac", "flac", "mp3", "m4a", "opus", "vorbis", "wav"
    mp3 requires additional 'libmp3lame' library
   
#quality
    0(best) ~ 9(worst) or bitrate
"""

ydl_opts = {
    'format': 'bestaudio/best',
    'postprocessors': [{
        'key': 'FFmpegExtractAudio',
        'preferredcodec': 'best',
        'preferredquality': '0',
        
    }],
}
with youtube_dl.YoutubeDL(ydl_opts) as ydl:
    ydl.download(['https://www.youtube.com/watch?v=c7KXtINADRo'])
