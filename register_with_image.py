import base64, json, requests, pathlib

# Load generated dummy face portrait image and encode to base64
image_path = pathlib.Path(r"C:/Users/himavanth/.gemini/antigravity/brain/f6ac53a0-6cc5-447b-af8f-f0f17374a117/dummy_face_portrait_1782882575314.png")
with open(image_path, "rb") as f:
    b64_image = base64.b64encode(f.read()).decode('utf-8')
# Optionally prepend data URI prefix
b64_image = f"data:image/png;base64,{b64_image}"

url = 'http://127.0.0.1:5000/api/family/register'
payload = {
    "head_name": "John Doe",
    "ration_card_number": "RC12345",
    "village_name": "VillageA",
    "phone_number": "1234567890",
    "address": "123 Street",
    "members": [
        {
            "name": "John",
            "gender": "M",
            "age": 30,
            "relationship": "self",
            "is_default_member": True,
            "images": [b64_image]
        }
    ]
}
resp = requests.post(url, json=payload)
print('Status:', resp.status_code)
print('Response:', resp.text)
