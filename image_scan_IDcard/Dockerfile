FROM ubuntu

WORKDIR /app

RUN apt-get update
RUN apt-get -y install make ffmpeg libsm6 libxext6 tesseract-ocr dmtx-utils python3 pip
RUN pip install --upgrade pip
RUN pip install opencv-python==4.5.5.64 thai-personal-card-extract fastapi 'uvicorn[standard]' python-multipart

COPY . .

EXPOSE 3000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "3000"]