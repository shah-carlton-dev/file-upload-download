# pip install open-cv ffmpeg moviepy pydub sox
# https://pysox.readthedocs.io/en/latest/api.html

import sys
import cv2
import os
from matplotlib.transforms import Transform
import moviepy.editor as mp
from pydub import AudioSegment
from pydub.playback import play
import sox

vidpath = os.getcwd() + sys.argv[1].split('"')[0]
audpath = vidpath.split(".")[0] + ".mp3"
audpath2 = vidpath.split(".")[0] + "_v2.mp3"

# separates audio from the videofile and saves as mp3 with same filename


def strip_audio():
    vid = mp.VideoFileClip(vidpath)
    print(vid)
    vid.audio.write_audiofile(audpath)

# plays the video frame by frame (but it goes really fast)


def play_video():
    cap = cv2.VideoCapture(vidpath)
    ret, frame = cap.read()
    while(1):
        ret, frame = cap.read()
        cv2.imshow('frame', frame)
        if cv2.waitKey(1) & 0xFF == ord('q') or ret == False:
            cap.release()
            cv2.destroyAllWindows()
            break
        cv2.imshow('frame', frame)
    # release the video capture object
    cap.release()
    # Closes all the windows currently opened.
    cv2.destroyAllWindows()


def remix_audio():
    sox.file_info.validate_input_file(audpath)
    # create transformer
    tfm = sox.Transformer()
    # trim the audio between 5 and 10.5 seconds.
    # tfm.trim(5, 10.5)
    # apply compression
    tfm.compand()
    # apply a fade in and fade out
    # tfm.fade(fade_in_len=1.0, fade_out_len=0.5)
	# apply bandpass filter
    tfm.bas(gain_db=20)
    # create an output file.
    tfm.build_file(input_filepath=audpath, output_filepath=audpath2)
    # see the applied effects
    tfm.effects_log

def make_array():
	# audio from the file gets loaded into a numpy array of shape (num_channels, num_samples)
	tfm = sox.Transformer()
	arr = tfm.build_array(input_filepath=audpath)
	print(arr)


strip_audio()
make_array()


sys.stdout.flush()
