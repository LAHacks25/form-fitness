import numpy as np
from pose_estimation.exercises.Exercise import Exercise
from pose_estimation.utils.angle import angle
from collections import deque

class Pushups(Exercise):
    def __init__(self, perceiver):
        super().__init__(perceiver) 

        self.keypoints = {
            'left': [5, 11, 15],    # shoulder, hip, ankle
            'right': [6, 12, 16],
            'countL': [5, 9],       # shoulder, wrist
            'countR': [6, 10]
        }
        
        self.side = None
        self.bestKps = None

        self.reps = 0
        self.down = False

        self.smoothingWindow = deque(maxlen=15)

    def process(self, frame):
        self.perceiver.detect(frame)

        if self.side is None:
            if not self.verify():
                return {'grade': 'BAD', 'reps': self.reps, 'clear':False}

        theta = self.grade()
        self.smoothingWindow.append(theta)
        smoothTheta = np.mean(self.smoothingWindow)

        self.update_reps(frame)

        formGrade = 'GOOD' if smoothTheta >= 129 else 'BAD'

        return {
            'grade': formGrade,
            'reps': self.reps,
            'clear':True
        }

    def verify(self):
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

    def grade(self):
        points = self.perceiver.collect(self.bestKps)
        return angle(*points)

    def update_reps(self, frame):
        h, w, _ = frame.shape

        kpts_indices = self.keypoints['count' + self.side]
        shoulder, wrist = map(np.array, self.perceiver.collect(kpts_indices))

        shoulder_xy = np.array([shoulder[1] * w, shoulder[0] * h])
        wrist_xy = np.array([wrist[1] * w, wrist[0] * h])

        dist = np.linalg.norm(shoulder_xy - wrist_xy)

        if dist < 300:
            if not self.down:
                self.reps += 1
                self.down = True
        else:
            self.down = False
