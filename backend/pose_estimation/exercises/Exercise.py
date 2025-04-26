class Exercise:
    def __init__(self, perceiver):
        self.keypoints = {}
        self.perceiver = perceiver
        self.bestKps = None

        self.reps = 0

    def process(self, frame):
        self.perceiver.detect(frame)
        raise NotImplementedError('Must implement with child class.')

    def verify(self):
        raise NotImplementedError('Must implement with child class.')

    def grade(self):
        raise NotImplementedError('Must implement with child class.')

    def update_reps(self, frame):
        raise NotImplementedError('Must implement with child class.')