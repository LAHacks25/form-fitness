import cv2
import numpy as np
from Exercise import Exercise

class Pushups(Exercise):
    def __init__(self, perceiver):
        self.keypoints = {
            'left':[5, 9, 11, 15], # shoulder, wrist, hip, ankle
            'right':[6, 10, 12, 16]
        }

        self.perceiver = perceiver
    
    def verify(self, frame):
        self.perceiver.detect(frame)

        indices = self.keypoints['left'] + self.keypoints['right']
        kps = self.perceiver.collect(indices)

        for kp in kps:
            if kp[2] < 0.3:
                return False
        
        return True
    
    def grade(self, frame):
        if not self.verify(frame):
            return 'Pose not clear.'
        
        leftC = np.mean(map(lambda x: x[2], self.keypoints['left']))
        rightC = np.mean(map(lambda x: x[2], self.keypoints['right']))

        if leftC > rightC:
            bestKps = self.keypoints['left']
        else:
            bestKps = self.keypoints['right']
        
        # angle = 





