import cv2
from pose_estimation.exercises.pushups import Pushups
from pose_estimation.Perceiver import Perciever
from pose_estimation.exercises.legraise import LegRaise
from pose_estimation.exercises.shoulderpress import ShoulderPress

exercises = {
    'pushups': Pushups,
    'legraise': LegRaise,
    'shoulderpress': ShoulderPress
}

class Camera:
    def __init__(self, src=0, exercise = "pushups"):
        self.cap = cv2.VideoCapture(src)
        self.my_exercise = exercises[exercise](Perciever())
        self.latest_data = {'grade': '', 'reps': 0}
    def __iter__(self):
        return self
    def __next__(self):
        ret, frame = self.cap.read()
        
        frame = cv2.flip(frame, 1)
        if not ret:
            self.cap.release()
            raise StopIteration
        
        disp = frame.copy()
        data = self.my_exercise.process(frame)
        self.latest_data = data

        disp = cv2.putText(disp, data['grade'], (50, 100), cv2.FONT_HERSHEY_COMPLEX, 1, (255, 0, 0), 2, cv2.LINE_AA)
        disp = cv2.putText(disp, f"Reps: {data['reps']}", (300, 100), cv2.FONT_HERSHEY_COMPLEX, 1, (255, 0, 0), 2, cv2.LINE_AA)
        return disp
