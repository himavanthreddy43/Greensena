import requests, json
url = 'http://127.0.0.1:5000/api/family/register'
data = {
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
            "images": []
        }
    ]
}
resp = requests.post(url, json=data)
print('Status:', resp.status_code)
print('Response:', resp.text)
