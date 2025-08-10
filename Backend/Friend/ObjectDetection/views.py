import time
from django.shortcuts import render, redirect,HttpResponse
from django.http import StreamingHttpResponse
import cv2 as cv
from ultralytics import YOLO
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt


from rest_framework.views import APIView
from rest_framework.response import Response


videoCap = cv.VideoCapture(1)
model = YOLO('yolo11n.pt')
videoCap.set(cv.CAP_PROP_FRAME_WIDTH, 1280)    
videoCap.set(cv.CAP_PROP_FRAME_HEIGHT, 720)

all_class_names = ["person", "bicycle", "car", "motorbike", "aeroplane", "bus", "train", "truck", "boat",
              "traffic light", "fire hydrant", "stop sign", "parking meter", "bench", "bird", "cat",
              "dog", "horse", "sheep", "cow", "elephant", "bear", "zebra", "giraffe", "backpack", "umbrella",
              "handbag", "tie", "suitcase", "frisbee", "skis", "snowboard", "sports ball", "kite", "baseball bat",
              "baseball glove", "skateboard", "surfboard", "tennis racket", "bottle", "wine glass", "cup",
              "fork", "knife", "spoon", "bowl", "banana", "apple", "sandwich", "orange", "broccoli",
              "carrot", "hot dog", "pizza", "donut", "cake", "chair", "sofa", "pottedplant", "bed",
              "diningtable", "toilet", "tvmonitor", "laptop", "mouse", "remote", "keyboard", "cell phone",
              "microwave", "oven", "toaster", "sink", "refrigerator", "book", "clock", "vase", "scissors",
              "teddy bear", "hair drier", "toothbrush"
              ]

current_class_name = ' '

def generateFrames():
    global videoCap, current_class_name
    
    if not videoCap.isOpened():
        print("Camera failed to open")
        return Response({'status':'failed to open camera'})

    while True:
        ret, img = videoCap.read()
        if not ret or img is None:
            print(" Failed to grab frame.")
            break  

        prediction = model(source=img, stream=True, conf=0.5)
        for i in prediction:
            for box in i.boxes:
                x1,y1,x2,y2 = box.xyxy[0]
                x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)
                cv.rectangle(img, (x1, y1), (x2, y2), (255, 0, 255), 3)
                cls = int(box.cls[0])

                cv.putText(img, all_class_names[cls], [x1,y1], cv.FONT_HERSHEY_SIMPLEX, 1, (255,0,0), 2)

                current_class_name = all_class_names[cls]

     
        ret, buffer = cv.imencode('.jpg', img)
        if not ret:
            print("Failed to encode frame.")
            continue

        frame = buffer.tobytes()

            
        yield (
            b'--frame\r\n'
            b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n'
        )

            
            
class Stopframes(APIView):
             
    def get(self,request):
        global videoCap
        if videoCap.isOpened():
            videoCap.release()
            cv.destroyAllWindows()

        
        return redirect('home')
        

def class_name_stream():
    previous_name = ""
    while True:
        time.sleep(0.5)
        if current_class_name != previous_name:
            previous_name = current_class_name
            yield f"data: {current_class_name}\n\n"

class Home(APIView):
    def get(self,request):
        return Response({'status':'frame stops and return to home'})

class Getframes(APIView):
    def get(self,request):
        response = StreamingHttpResponse(generateFrames(),content_type='multipart/x-mixed-replace; boundary=frame')
        return response
    
    
@csrf_exempt
def GetDetectedClass(request):
    if request.method == 'GET':
        return StreamingHttpResponse(class_name_stream(), content_type='text/event-stream')

