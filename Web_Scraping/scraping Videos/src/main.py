from bs4 import BeautifulSoup
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
import random
import requests

import os

chrome_options = webdriver.ChromeOptions()
chrome_options.add_argument('--headless')
chrome_options.add_argument('--no-sandbox')
chrome_options.add_argument('--disable-gpu')
chrome_options.add_argument('--window-size=1280x1696')
chrome_options.add_argument('--user-data-dir=/tmp/user-data')
chrome_options.add_argument('--hide-scrollbars')
chrome_options.add_argument('--enable-logging')
chrome_options.add_argument('--log-level=0')
chrome_options.add_argument('--v=99')
chrome_options.add_argument('--single-process')
chrome_options.add_argument('--data-path=/tmp/data-path')
chrome_options.add_argument('--ignore-certificate-errors')
chrome_options.add_argument('--homedir=/tmp')
chrome_options.add_argument('--disk-cache-dir=/tmp/cache-dir')
chrome_options.add_argument('user-agent=Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36')
chrome_options.binary_location = os.getcwd() + "/bin/headless-chromium"

driver = webdriver.Chrome(chrome_options=chrome_options)

# chrome_options = webdriver.ChromeOptions()
# chrome_options.add_argument("--headless")
# driver = webdriver.Chrome(ChromeDriverManager().install(), options=chrome_options)
links = []  # Initiate empty list to capture final results
title = []
desc = []
thumbnails=['https://i.guim.co.uk/img/media/ce9c149506881191caa4b1f838575d0dbb07e520/734_381_6827_4098/master/6827.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=89d7b5bbce504ac57c9bd1c2994d103d','https://assets.seniority.in/media/ktpl_blog/women_who_changed_the_face_of_indua_-_main.jpg','https://cdn-mamizi.pressidium.com/wp-content/uploads/2018/12/AdobeStock_166557992.jpeg','https://sprigghr.com/wp-content/uploads/2020/02/Importance-of-Work-Life-Balance-2-768x584.jpg','https://i0.wp.com/www.eatthis.com/wp-content/uploads/2020/04/woman-cooking-healthy-food-in-kitchen.jpg?fit=1200%2C879&ssl=1']
apiURL='https://kkp6zaixjk.execute-api.us-east-1.amazonaws.com/putArticleInfo/addarticle'
url1: str = 'https://www.google.com/search?q=women%27s+nutrition+and+fitness&rlz=1C1CHZN_enIN936IN936&oq=women+nutr&aqs=chrome.2.69i57j35i39l2j0j69i60.11063j0j7&sourceid=chrome&ie=UTF-8'
url2="https://www.google.com/search?q=women%27s+nutrition+and+fitness+articles&oq=women%27s+nutrition+and+fitness+articles&aqs=chrome..69i57.11131j0j1&sourceid=chrome&ie=UTF-8"
url3="https://www.google.com/search?q=women%27s+finance+articles&sxsrf=ALeKk00z8ZsMrY8_vG2kzzutIMbOyOAAHQ%3A1622464146334&ei=kta0YNruE_T0juMPko2oCA&oq=women%27s+finance+articles&gs_lcp=Cgdnd3Mtd2l6EAM6BwgjELADECc6BwgAEEcQsAM6BggAEAcQHjoICAAQCBAHEB46AggAOgYIABAWEB46BAgAEA06BggAEA0QHlDs4AFYqMMDYLHMA2gCcAJ4AIAB2wGIAf0TkgEGMC4xMS4zmAEAoAEBqgEHZ3dzLXdpesgBCcABAQ&sclient=gws-wiz&ved=0ahUKEwja_-j49fPwAhV0umMGHZIGCgEQ4dUDCA4&uact=5"

def scrape(url):
    driver.get(url)
    soup = BeautifulSoup(driver.page_source, 'html.parser')

    search = soup.find_all('div', class_="tF2Cxc")
    for h in search:
        if h.find(class_='IsZvec').text == '':
            continue
        links.append(h.a.get('href'))
        title.append(h.h3.text)
        desc.append(h.find(class_='IsZvec').text)
    pass

def lambda_handler(event, context):
    scrape(url1)
    scrape(url2)
    scrape(url3)
    for i in range(0, len(title)):
        x = requests.post(apiURL, json={
            "articleId": i + 1,
            "description": desc[i],
            "thumbnail": thumbnails[random.randint(0,4)],
            "title": str(title[i]),
            "articleURL": links[i]
        })
        print(i+1)
        print(x)
        # print(i + 1)
        # print(title[i])
        # print(links[i])
        # print(desc[i])
        # print(thumbnails[random.randint(0,3)])
