"""
DO NOT USE IN PROJECT IMPLEMENTATION
THIS IS AN EXAMPLE IMPLEMENTATION OF EXERCISE CLASSES
"""
import cv2
import numpy as np
from pose_estimation.exercises import *
from pose_estimation.Perceiver import Perciever
from pose_estimation.utils.drawer import draw

EXERCISE = "shoulderpress"
INPUT = 0

exercises = {
    'pushups': Pushups,
    'legraise': LegRaise,
    'shoulderpress': ShoulderPress
}

cap = cv2.VideoCapture(INPUT)
model = Perciever()
exercise = exercises[EXERCISE](model)

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        print('Unable to retrieve from webcam.')
        break

    frame = cv2.flip(frame, 1)
    disp = frame.copy()

    data = exercise.process(frame)

    disp = cv2.putText(disp, data['grade'], (50, 100), cv2.FONT_HERSHEY_COMPLEX, 1, (255, 0, 0), 2, cv2.LINE_AA)
    disp = cv2.putText(disp, f"Reps: {data['reps']}", (300, 100), cv2.FONT_HERSHEY_COMPLEX, 1, (255, 0, 0), 2, cv2.LINE_AA)
    if hasattr(exercise, 'points'):
        disp = draw(disp, exercise.points)
    
    cv2.imshow('hi', disp)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break