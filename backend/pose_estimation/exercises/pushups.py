import cv2
import numpy as np
from exercises.Exercise import Exercise
from utils.angle import angle

class Pushups(Exercise):
    def __init__(self, perceiver):
        self.keypoints = {
            'left':[5, 11, 15], # shoulder, hip, ankle
            'right':[6, 12, 16],
            'countL':[5, 9], # shoulder, wrist
            'countR':[6, 10]
        }
        self.perceiver = perceiver
        self.bestKps = None

        self.down = False
        self.side = None

    def determineSide(self, frame):
        self.perceiver.detect(frame)

        left = self.perceiver.collect(self.keypoints['left'])
        right = self.perceiver.collect(self.keypoints['right'])

        leftC = np.mean([kp[2] for kp in left])
        rightC = np.mean([kp[2] for kp in right])

        if leftC > rightC:
            self.bestKps = self.keypoints['left']
            self.side = 'L'
        else:
            self.bestKps = self.keypoints['right']
            self.side = 'R'

        return leftC >= 0.3 or rightC >= 0.3

    def grade(self, frame):
        if self.bestKps is None:
            self.determineSide(frame)
        
        self.perceiver.detect(frame)

        points = self.perceiver.collect(self.bestKps)
        return angle(*points), points
    
    # def countReps(self, frame):
        
    #     if self.down and 
