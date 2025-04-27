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
        self.countDist = deque(maxlen=15)

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
        left_form = self.perceiver.collect(self.keypoints['left'])
        right_form = self.perceiver.collect(self.keypoints['right'])
        left_count = self.perceiver.collect(self.keypoints['countL'])
        right_count = self.perceiver.collect(self.keypoints['countR'])

        left_form_conf = np.mean([kp[2] for kp in left_form])
        right_form_conf = np.mean([kp[2] for kp in right_form])
        left_count_conf = np.mean([kp[2] for kp in left_count])
        right_count_conf = np.mean([kp[2] for kp in right_count])

        left_total_conf = (left_form_conf + left_count_conf) / 2
        right_total_conf = (right_form_conf + right_count_conf) / 2

        # Choose side with higher combined confidence
        if left_total_conf > right_total_conf:
            self.bestKps = self.keypoints['left']
            self.side = 'L'
            overall_conf = left_total_conf
        else:
            self.bestKps = self.keypoints['right']
            self.side = 'R'
            overall_conf = right_total_conf

        # Return True if chosen side is confident enough
        return overall_conf >= 0.3

    def grade(self):
        self.points = self.perceiver.collect(self.bestKps)
        return angle(*self.points)

    def update_reps(self, frame):
        self.perceiver.detect(frame)
        if not self.verify():
            return
        h, w, _ = frame.shape

        kpts_indices = self.keypoints['count' + self.side]
        shoulder, wrist = map(np.array, self.perceiver.collect(kpts_indices))

        shoulder_xy = np.array([shoulder[1] * w, shoulder[0] * h])
        wrist_xy = np.array([wrist[1] * w, wrist[0] * h])

        self.countDist.append(np.linalg.norm(shoulder_xy - wrist_xy))
        dist = np.mean(self.countDist)

        print(dist)

        if dist < 129:
            if not self.down:
                self.reps += 1
                self.down = True
        else:
            self.down = False
