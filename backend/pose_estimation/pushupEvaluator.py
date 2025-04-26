import cv2
import numpy as np
from exercises.pushups import Pushups
from Perceiver import Perciever
from utils.drawer import draw
from collections import deque

cap = cv2.VideoCapture(0)
model = Perciever()
pu = Pushups(model)

window = deque(maxlen=20)

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        print('Unable to retrieve from webcam.')
        break

    frame = cv2.flip(frame, 1)
    disp = frame.copy()

    currentAngle, pts = pu.grade(frame)
    pu.countReps(frame)

    window.append(currentAngle)

    smoothAngle = np.mean(window)

    if smoothAngle < 129:
        disp = cv2.putText(disp, f"BAD FORM", (50, 175), cv2.FONT_HERSHEY_COMPLEX, 1, (0, 0, 255), 2, cv2.LINE_AA)
    else:
        disp = cv2.putText(disp, f"GOOD FORM", (50, 175), cv2.FONT_HERSHEY_COMPLEX, 1, (0, 255, 0), 2, cv2.LINE_AA)

    disp = cv2.putText(disp, f"Angle: {smoothAngle:.2f}", (50, 100), cv2.FONT_HERSHEY_COMPLEX, 1, (255, 0, 0), 2, cv2.LINE_AA)
    disp = cv2.putText(disp, f"Pushups: {pu.pushupCount}", (300, 100), cv2.FONT_HERSHEY_COMPLEX, 1, (255, 0, 0), 2, cv2.LINE_AA)
    disp = draw(disp, pts)
    
    cv2.imshow('hi', disp)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break