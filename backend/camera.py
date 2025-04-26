import cv2
from pose_estimation.pushupEvaluator import pushupEvaluator

class Camera:
    def __init__(self, src=0):
        self.cap = cv2.VideoCapture(src)
        self.pu = pushupEvaluator(self.cap)
    def __iter__(self):
        return self
    def __next__(self):
        ret, frame = self.cap.read()
        if not ret:
            self.cap.release()
            raise StopIteration
        frame = self.pu.runPushup(frame)
        return frame
