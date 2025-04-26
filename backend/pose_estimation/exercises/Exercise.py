import cv2
import numpy as np

class Exercise:
    def __init__(self, perceiver):
        self.keypoints = []
    
    def verify(self, frame):
        raise NotImplementedError('Must implement with child class.')
    
    def eval(self, frame):
        raise NotImplementedError('Must implement with child class.')
