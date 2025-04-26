import cv2

def draw(frame, keypoints, threshold=0.3):
    h, w, _ = frame.shape
    disp = frame.copy()

    for kp in keypoints:
        y, x, c = kp

        if c > threshold:
            cx = int(x * w)
            cy = int(y * h)
            cv2.circle(disp, (cx, cy), 5, (0, 255, 0), -1)
    
    return disp

