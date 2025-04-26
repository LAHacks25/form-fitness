import cv2

class Camera:
    def __init__(self, src=0):
        self.cap = cv2.VideoCapture(src)
    def __iter__(self):
        return self
    def __next__(self):
        ret, frame = self.cap.read()
        if not ret:
            self.cap.release()
            raise StopIteration
        return frame
