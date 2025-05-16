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

SEMESTER_OPTIONS = {"spring": 1, "summer": 7, "fall": 9, "winter": 12}

year = "2025"
semester = "fall" #0-spring | 1-summer | 2 - fall | 3 - winter

url = "https://sims.rutgers.edu/csp/sectionsLookup.json"

payload = ""


with open('secret.json', 'r') as secret_file:
    secret = json.load(secret_file)


headers = {
    "cookie": secret["cookie"],
    "Accept": secret["Accept"],
    "Accept-Language": secret["Accept-Language"],
    "Connection": secret["Connection"],
    "Content-Length": secret["Content-Length"],
    "Content-Type": secret["Content-Type"],
    "Cookie": secret["Cookie"],
    "Origin": secret["Origin"],
    "Referer": secret["Referer"],
    "sec-ch-ua": secret["sec-ch-ua"],
    "sec-ch-ua-mobile": secret["sec-ch-ua-mobile"],
    "sec-ch-ua-platform": secret["sec-ch-ua-platform"],
    "Sec-Fetch-Dest": secret["Sec-Fetch-Dest"],
    "Sec-Fetch-Mode": secret["Sec-Fetch-Mode"],
    "Sec-Fetch-Site": secret["Sec-Fetch-Site"],
    "User-Agent": secret["User-Agent"],
    "X-Requested-With": secret["X-Requested-With"],
}




for i in range(1000):
    querystring = {"semester":f"{SEMESTER_OPTIONS[semester]}{year}","campus":"NB","levelOfStudy":"U","subject":str(i)}
    if (i<100):
        querystring = {"semester":f"{SEMESTER_OPTIONS[semester]}{year}","campus":"NB","levelOfStudy":"U","subject":"0"+str(i)}
    response = requests.request("POST", url, data=payload, headers=headers, params=querystring)
    if (response.json()["courseOfferings"] != []):
        print(response.json())
        '''with open(f"courses_json/{i}.json", "w") as outfile:
            json.dump(response.json(), outfile, indent=4)'''