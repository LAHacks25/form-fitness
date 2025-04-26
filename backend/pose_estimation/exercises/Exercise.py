import cv2
import numpy as np

class Exercise:
    def __init__(self, perceiver):
        self.keypoints = {}
        self.perceiver = perceiver
        self.bestKps = None
    
    def determineSide(self, frame):
        raise NotImplementedError('Must implement with child class.')
    
    def grade(self, frame):
        raise NotImplementedError('Must implement with child class.')
    
    def countReps(self, *args):
        raise NotImplementedError('Must implement with child class.')
