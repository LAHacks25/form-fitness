import numpy as np
from pose_estimation.exercises.Exercise import Exercise
from pose_estimation.utils.angle import angle
from collections import deque

class ShoulderPress(Exercise):
    def __init__(self, perceiver):
        super().__init__(perceiver)
        self.keypoints = {
            'right':[9, 7, 5], # wrist, elbow, shoulder
            'left':[10, 8, 6],
        }
        self.bestKps = None

        self.reps = 0
        self.goodReps = 0
        self.formGrade = 'BAD'
        self.minAngle = 180
        self.down = False

    def process(self, frame):
        self.perceiver.detect(frame)

        if not self.verify():
            return {
                'grade': 'BAD',
                'reps': self.reps,
                'goodReps': self.goodReps,
                'clear': False
            }

        leftPoints = self.perceiver.collect(self.keypoints['left'], frame.shape)
        rightPoints = self.perceiver.collect(self.keypoints['right'], frame.shape)

        self.points = np.concatenate([leftPoints, rightPoints])

        leftAngle = angle(*leftPoints)
        rightAngle = angle(*rightPoints)
        avgAngle = np.mean([leftAngle, rightAngle])

        self.minAngle = min(self.minAngle, avgAngle)

        if avgAngle < 85:
            self.down = True
        
        if avgAngle > 110 and self.down:
            self.reps += 1

            if self.minAngle <= 55:
                self.goodReps += 1
                self.formGrade = 'GOOD'
            else:
                self.formGrade = 'BAD'
            
            self.minAngle = 180
            self.down = False

        return {
            'grade': self.formGrade,
            'reps': self.reps,
            'goodReps': self.goodReps,
            'clear':True
        }

    def verify(self):
        idxs = np.concatenate([self.keypoints['left'], self.keypoints['right']])
        kpts = self.perceiver.collect(idxs) 

        c = np.mean([kp[2] for kp in kpts])

        return c >= 0.5