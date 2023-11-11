import sys
import cv2
import mediapipe as mp
import numpy as np

mp_drawing = mp.solutions.drawing_utils
mp_pose = mp.solutions.pose

def calculate_distance(landmarks1, landmarks2):
    total_distance = 0
    num_landmarks = 0
    if landmarks1 and landmarks2:
        for lm1, lm2 in zip(landmarks1.landmark, landmarks2.landmark):
            total_distance += ((lm1.x - lm2.x) ** 2 + (lm1.y - lm2.y) ** 2) ** 0.5
            num_landmarks += 1
    average_distance = total_distance / num_landmarks if num_landmarks > 0 else 0
    return total_distance, average_distance

def process_video():
    cap = cv2.VideoCapture(sys.argv[1])
    cap2 = cv2.VideoCapture(sys.argv[2])
    close_frames = 0
    total_frames = 0
    scores = []
    lastHighScore = 100

    with mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5) as pose:
        while cap.isOpened() and cap2.isOpened():
            ret, frame = cap.read()
            ret2, frame2 = cap2.read()
            
            if ret == False: break
            if ret2 == False: break

            # Recolor images to RGB
            image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            image2 = cv2.cvtColor(frame2, cv2.COLOR_BGR2RGB)
            image.flags.writeable = False
            image2.flags.writeable = False

            # Make detections
            results = pose.process(image)
            results2 = pose.process(image2)

            # Create blank images with the same dimensions as the frames
            blank_image = np.zeros(frame.shape, dtype=np.uint8)
            blank_image2 = np.zeros(frame2.shape, dtype=np.uint8)

            # Render detections on the blank images
            mp_drawing.draw_landmarks(blank_image, results.pose_landmarks, mp_pose.POSE_CONNECTIONS,
                                      mp_drawing.DrawingSpec(color=(245,117,66), thickness=2, circle_radius=2), 
                                      mp_drawing.DrawingSpec(color=(245,66,230), thickness=2, circle_radius=2))
            mp_drawing.draw_landmarks(blank_image2, results2.pose_landmarks, mp_pose.POSE_CONNECTIONS,
                                      mp_drawing.DrawingSpec(color=(245,117,66), thickness=2, circle_radius=2), 
                                      mp_drawing.DrawingSpec(color=(245,66,230), thickness=2, circle_radius=2))

            # Calculate the total and average distance between corresponding landmarks
            total_distance, average_distance = calculate_distance(results.pose_landmarks, results2.pose_landmarks)

            # If the total distance is below the threshold, increment the counter
            threshold_distance = 5.2  # Adjust this value as needed
            if total_distance < threshold_distance:
                close_frames += 1

            total_frames += 1

           # Replace the line where you calculate the score with these lines
            score = (close_frames / total_frames) * 100
            scores.append(score)        

            # After the while loop, calculate the average score
            average_score = sum(scores) / len(scores) if scores else 0
            lastHighScore = average_score
            
        cap.release()
        cap2.release()
        cv2.destroyAllWindows()
        print(lastHighScore)

def main():
    process_video()

if __name__ == "__main__":
    main()

sys.stdout.flush()