import moviepy.editor as mp
import sys
import os

vidpath = os.getcwd() + "/" + sys.argv[1].split('"')[0]
audpath = vidpath.split(".")[0] + ".mp3"

# separates audio from the videofile and saves as mp3 with same filename
def strip_audio():
    vid = mp.VideoFileClip(vidpath)
    print(vid)
    vid.audio.write_audiofile(audpath)

strip_audio()
sys.stdout.flush()