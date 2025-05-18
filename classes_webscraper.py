from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.select import Select
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.wait import WebDriverWait
import csv
import time
import requests
import json
import requests
import os

url = "https://classes.rutgers.edu/soc/api/courses.json"

with open('secret2.json', 'r') as secret_file:
    secret = json.load(secret_file)

querystring = {"year":"2025","term":"9","campus":"NB"}

payload = ""
headers = {
    "cookie": secret["cookie"],
    "Accept": secret["Accept"],
    "DNT": secret["DNT"],
    "Referer": secret["Referer"],
    "sec-ch-ua": secret["sec-ch-ua"],
    "sec-ch-ua-mobile": secret["sec-ch-ua-mobile"],
    "sec-ch-ua-platform": secret["sec-ch-ua-platform"],
    "User-Agent": secret["User-Agent"],
    "X-Requested-With": secret["X-Requested-With"]
}

response = requests.request("GET", url, data=payload, headers=headers, params=querystring)

with open("classes.json", "w") as outfile:
        json.dump(response.json(), outfile, indent=4)