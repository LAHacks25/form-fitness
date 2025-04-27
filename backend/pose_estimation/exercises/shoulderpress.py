import numpy as np
from pose_estimation.exercises.Exercise import Exercise
from pose_estimation.utils.angle import angle
from collections import deque

class ShoulderPress(Exercise):
    def __init__(self, perceiver):
        super().__init__(perceiver)
        self.keypoints = {
            'left':[9, 7, 5], # wrist, elbow, shoulder
            'right':[10, 8, 6],
        }
        self.bestKps = None

        self.reps = 0

        self.moe = 10
        self.min_elbow_angle = 180
        self.down = False

    def process(self, frame):
        self.perceiver.detect(frame)

        if self.side is None:
            if not self.verify():
                return {'grade': 'BAD', 'reps': self.reps, 'clear':False}

        if self.grade() == 0:
            return {'grade': 'BAD', 'reps': self.reps, 'clear':True}
        

        # self.smoothingWindow.append(theta)
        smoothTheta = np.mean(self.smoothingWindow)

        self.update_reps(frame)

        formGrade = 'GOOD' if smoothTheta >= 129 else 'BAD'

        return {
            'grade': formGrade,
            'reps': self.reps,
            'clear':True
        }

    def verify(self):
        idxs = np.concatenate([self.keypoints['left'], self.keypoints['right']])
        kpts = self.perceiver.collect(idxs) 

        c = np.mean([kp[2] for kp in kpts])

        return c >= 0.3

    def grade(self):
        left, right = np.array((map(self.perceiver.collect, self.keypoints.values())))

        slope = (left[1][0] - right[1][0]) / (left[1][1] - right[1][1])
        print(slope)
        if slope > 2:
            return 0
        
        return 1

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
