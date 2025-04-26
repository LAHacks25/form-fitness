import cv2
import numpy as np
from exercises.Exercise import Exercise
from utils.angle import angle

class Shoulderpress(Exercise):
    def __init__(self, perceiver):
        self.keypoints = {
            'left':[9, 7, 5], # wrist, elbow, shoulder
            'right':[10, 8, 6],
        }
        self.perceiver = perceiver
        self.bestKps = None

        self.down = False
        self.side = None


    def grade(self, frame):
        
        self.perceiver.detect(frame)

        left_points = self.perceiver.collect(self.keypoints['left'])[:, :2] # not sure if this is necessary
        right_points = self.perceiver.collect(self.keypoints['right'])[:, :2]

        average_angle = (angle(left_points) + angle(right_points)) / 2
        return average_angle, np.concatenate([left_points, right_points])
    
    # def countReps(self, frame):
        
    #     if self.down and 


