import moviepy.editor as mp
import sys
import os

test_vid = "/Users/maccarlton/Desktop/file-upload-download/file-upload-download/app/server/files/1658202193509_sample-mp4-file.mp4"
test_audio = "/Users/maccarlton/Desktop/file-upload-download/file-upload-download/app/server/files/1658202193509_sample-mp4-file.mp3"
output = "/Users/maccarlton/Desktop/file-upload-download/file-upload-download/app/server/files/1658202193509_sample-mp4-file-converted.mp4"
def combine(vidname, audname, outname, fps=60):
    my_clip = mp.VideoFileClip(vidname)
    audio_background = mp.AudioFileClip(audname)
    final_clip = my_clip.set_audio(audio_background)
    final_clip.write_videofile(outname,fps=fps)

combine(test_vid, test_audio, output)
