import tensorflow as tf
import tensorflow_hub as hub
import cv2
import numpy as np

class Perciever:
    def __init__(self):
        self.model = hub.load("https://tfhub.dev/google/movenet/singlepose/lightning/4")
        self.input_size = 192
    
    def detect(self, frame):
        rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        resized = tf.image.resize_with_pad(tf.expand_dims(rgb, axis=0), self.input_size, self.input_size)
        arr = resized.numpy().astype(np.int32)

        marked = self.model.signatures['serving_default'](tf.constant(arr))

        self.keypoints = marked['output_0']