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

        self.keypoints = marked['output_0'].numpy()

        return self
    
    def collect(self, indices, frameShape=None):
        if self.keypoints is None:
            raise Exception('Must detect keypoints first.')
        
        selected = [self.keypoints[0, 0, idx] for idx in indices]
        selected = np.array(selected)

        if frameShape:
            h, w = frameShape[:2]
            selected[:, 0] *= h  # y * height
            selected[:, 1] *= w  # x * width

        return selected

if __name__=='__main__':
    from utils.drawer import draw
    cap = cv2.VideoCapture(0)
    model = Perciever()

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            print('Unable to retrieve from webcam.')
            break

        frame = cv2.flip(frame, 1)

        model.detect(frame)
        kps = model.collect(list(range(17)))
        disp = draw(frame, kps)

        cv2.imshow('hi', disp)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break