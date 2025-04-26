import numpy as np

def angle(a, b, c):
    a = np.array(a)
    b = np.array(b)
    c = np.array(c)

    v = a - b
    w = c - b

    cosTheta = np.dot(v, w) / (np.linalg.norm(v) * np.linalg.norm(w))
    theta = np.arccos(np.clip(cosTheta, -1, 1))

