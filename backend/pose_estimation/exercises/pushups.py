import cv2
import numpy as np

class Pushups(Exercise):
    def __init__(self, perceiver):
        self.keypoints = []
