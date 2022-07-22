import moviepy.editor as mp
import sys
import os
import time

vidpath = os.getcwd() + "/" + sys.argv[1].split('"')[0]
audpath = "/Users/maccarlton/Desktop/file-upload-download/file-upload-download/app/server/files/overwrite_audio.mp3"
outpath = vidpath.split(".")[0] + "-converted.mp4"

def combine(vidname, audname, outname, fps=60):
    my_clip = mp.VideoFileClip(vidname)
    audio_background = mp.AudioFileClip(audname)
    final_clip = my_clip.set_audio(audio_background)
    final_clip.write_videofile(outname,fps=fps)

time.sleep(10)
combine(vidpath, audpath, outpath)
