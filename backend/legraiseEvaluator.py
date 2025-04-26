"""
DO NOT USE IN PROJECT IMPLEMENTATION
THIS IS AN EXAMPLE IMPLEMENTATION OF EXERCISE CLASSES
"""
import cv2
import numpy as np
from pose_estimation.exercises.legraise import LegRaise
from pose_estimation.Perceiver import Perciever
from pose_estimation.utils.drawer import draw
from collections import deque, Counter

cap = cv2.VideoCapture('/Users/kvaikunthan/Desktop/form-fitness/backend/pose_estimation/IMG_5643.MOV')
model = Perciever()
lr = LegRaise(model)

memory = deque(maxlen=30)

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        print('Unable to retrieve from webcam.')
        break

    frame = cv2.flip(frame, 1)
    disp = frame.copy()

    data = lr.process(frame)

    disp = cv2.putText(disp, data['grade'], (50, 100), cv2.FONT_HERSHEY_COMPLEX, 1, (255, 0, 0), 2, cv2.LINE_AA)
    disp = cv2.putText(disp, f"Leg Raises: {data['reps']}", (300, 100), cv2.FONT_HERSHEY_COMPLEX, 1, (255, 0, 0), 2, cv2.LINE_AA)
    if hasattr(lr, 'points'):
        disp = draw(disp, lr.points)
    
    cv2.imshow('hi', disp)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break