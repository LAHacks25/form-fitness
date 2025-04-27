import cv2

def draw(frame, keypoints, threshold=0.3):
    h, w, _ = frame.shape
    disp = frame.copy()

    for kp in keypoints:
        y, x, c = kp

        cv2.circle(disp, (int(x), int(y)), 5, (0, 255, 0), -1)
    
    return disp

