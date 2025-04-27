import numpy as np
from pose_estimation.exercises.Exercise import Exercise
from pose_estimation.utils.angle import angle
from collections import deque, Counter

class LegRaise(Exercise):
    def __init__(self, perceiver):
        super().__init__(perceiver) 

        self.keypoints = {
            'leftAlpha': [5, 11, 13], # shoulder, hip, knee
            'rightAlpha': [6, 12, 14],
            'leftBeta': [11, 13, 15],    # hip, knee, ankle
            'rightBeta': [12, 14, 16],
            'countL': [5, 13],       # shoulder, wrist
            'countR': [6, 14]
        }
        
        self.side = None
        self.bestKps = None

        self.formGrade = 'BAD'
        self.reps = 0
        self.goodReps = 0
        self.down = False

        self.smoothingWindow = deque(maxlen=15)
        self.memory = deque(maxlen=20)

    def process(self, frame):
        self.perceiver.detect(frame)

        if self.side is None:
            if not self.verify():
                return {'grade': 'BAD', 'reps': self.reps, 'goodReps':self.goodReps, 'clear':False}

        theta = self.grade(frame)
        self.smoothingWindow.append(theta)
        smoothTheta = np.mean(self.smoothingWindow)

        self.memory.append('GOOD' if smoothTheta >= 145 else 'BAD')

        self.formGrade = Counter(self.memory).most_common(1)[0][0]
        self.update_reps(frame)

        return {
            'grade': self.formGrade,
            'reps': self.reps,
            'goodReps': self.goodReps,
            'clear':True
        }

    def verify(self):
        left = self.perceiver.collect(self.keypoints['leftBeta'])
        right = self.perceiver.collect(self.keypoints['rightBeta'])

        leftC = np.mean([kp[2] for kp in left])
        rightC = np.mean([kp[2] for kp in right])

        if leftC > rightC:
            self.bestKps = [self.keypoints['leftAlpha'], self.keypoints['leftBeta']]
            self.side = 'L'
        else:
            self.bestKps = [self.keypoints['rightAlpha'], self.keypoints['rightBeta']]
            self.side = 'R'

        return leftC >= 0.3 or rightC >= 0.5

    def grade(self, frame):
        self.alphaPoints = self.perceiver.collect(self.bestKps[0], frame.shape)
        self.betaPoints = self.perceiver.collect(self.bestKps[1], frame.shape)

        alphaAngle = angle(*self.alphaPoints)
        betaAngle = angle(*self.betaPoints)
        gamma = betaAngle + (800/alphaAngle)
        
        return gamma

    def update_reps(self, frame):
        h, w, _ = frame.shape

        kpts_indices = self.keypoints['count' + self.side]
        shoulder, wrist = map(np.array, self.perceiver.collect(kpts_indices))

        shoulder_xy = np.array([shoulder[1] * w, shoulder[0] * h])
        wrist_xy = np.array([wrist[1] * w, wrist[0] * h])

        dist = np.linalg.norm(shoulder_xy - wrist_xy)

        if dist < 300:
            if not self.down:
                if self.formGrade == 'GOOD':
                    self.goodReps += 1
                self.reps += 1
                self.down = True
        else:
            self.down = False
