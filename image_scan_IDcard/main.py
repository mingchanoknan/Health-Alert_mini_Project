
import uvicorn
from fastapi import FastAPI
from pydantic import BaseModel
import numpy as np
import cv2
import base64
from PIL import Image
from ThaiPersonalCardExtract import PersonalCard
from fastapi.encoders import jsonable_encoder

app = FastAPI()

class ImageRequest(BaseModel):
    image: str

class Response(BaseModel):
    Identification_Number: str = None
    FullNameTH: str = None
    PrefixTH: str = None
    NameTH: str = None
    LastNameTH: str = None
    PrefixEN: str = None
    NameEN: str = None
    LastNameEN: str = None
    BirthdayTH: str = None
    BirthdayEN: str = None
    Religion: str = None
    Address: str = None
    DateOfIssueTH: str = None
    DateOfIssueEN: str = None
    DateOfExpiryTH: str = None
    DateOfExpiryEN: str = None
    LaserCode: str = None

# encode image as base64 string
def encode_image(image):
    _, encoded_image = cv2.imencode(".jpg", image)
    return "data:image/jpeg;base64," + base64.b64encode(encoded_image).decode()

# decode base64 string to image
def decode_image(image_string):
    encoded_data = image_string.split(',')[1]
    nparr = np.frombuffer(base64.b64decode(encoded_data), np.uint8)
    return cv2.imdecode(nparr, cv2.IMREAD_GRAYSCALE)

def apply_canny(image):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    edges = cv2.Canny(gray, 100, 200)
    return edges


@app.post("/process-image")
async def process_image(image_request: ImageRequest):
    image = decode_image(image_request.image)
    return jsonable_encoder(pre_process(image))
    

def pre_process(img):
    img_erosion = cv2.dilate(img, None, iterations=2)
    x = Image.fromarray(img_erosion)
    x.save('img-processed.jpg')
    reader = PersonalCard(lang="mix")
    result = reader.extract_front_info("./img-processed.jpg")
    response = Response()
    response.Identification_Number = result.Identification_Number
    response.FullNameTH = result.FullNameTH
    response.PrefixTH = result.PrefixTH
    response.NameTH = result.NameTH
    response.LastNameTH = result.LastNameTH
    response.PrefixEN = result.PrefixEN
    response.NameEN = result.NameEN
    response.LastNameEN = result.LastNameEN
    response.BirthdayTH = result.BirthdayTH
    response.BirthdayEN = result.BirthdayEN
    response.Religion = result.Religion
    response.Address = result.Address
    response.DateOfIssueTH = result.DateOfIssueTH
    response.DateOfIssueEN = result.DateOfIssueEN
    response.DateOfExpiryTH = result.DateOfExpiryTH
    response.DateOfExpiryEN = result.DateOfExpiryEN
    response.LaserCode =  result.LaserCode
    return response



