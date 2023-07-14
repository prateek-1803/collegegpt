import requests
from bs4 import BeautifulSoup
import time
import pandas as pd


HEADERS = ({'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) \
            AppleWebKit/537.36 (KHTML, like Gecko) \
            Chrome/90.0.4430.212 Safari/537.36',
            'Accept-Language': 'en-US, en;q=0.5'})


data = ''
for page in range(1,916):
    url = f"https://collegedunia.com/reviews/page-{page}?sort=3&stream=10&courseTag=18&batch=2021"
    
    r = requests.get(url, headers=HEADERS, verify = False)
    data += r.text
    print(page)
    
def html_code(url):

    htmldata = data
    soup = BeautifulSoup(htmldata, 'html.parser')

    return (soup)

def user_name(soup):
    data_str = ""
    cus_list = []

    for item in soup.find_all("a", class_="user-name pointer"):
        data_str = data_str + item.get_text()
        cus_list.append(data_str)
        data_str = ""
    return cus_list



def curriculum(soup):
    result = []
    for item in soup.find_all("p", class_="jsx-2248946087 m-0 review-content d-inline"):
        data_str = ""
        data_str = data_str + item.get_text()
        result.append(data_str)

    return (result)


def college_name(soup):
    result = []
    for item in soup.find_all("a", class_="jsx-2133140133 jsx-693955820 hover-underline mr-1"):
        data_str = ""
        data_str = data_str + item.get_text()
        result.append(data_str)

    return (result)


def get_rating(soup):
    result = []
    for item in soup.find_all("div", class_= "jsx-2133140133 jsx-693955820 item font-weight-bold text-secondary text-uppercase"):
        data_str = ""
        data_str = data_str + item.get_text()
        x = data_str.split(' ')
        rating = float(x[0])
        result.append(rating)

    return (result)

def get_review(courses):
    overview1 = []
    overview2 = []
    for i in range(len(courses)):
        if i%2 == 0:
            overview1.append(courses[i])
        else:
            overview2.append(courses[i])

    review = []
    for i in range(len(overview2)):
        review.append(overview1[i]+overview2[i])
    
    return review
    
    


if __name__ == '__main__':
    soup = html_code(url)
    username = user_name(soup)
    courses = curriculum(soup)
    rating = get_rating(soup)
    review = get_review(courses)
    college = college_name(soup)
    print(len(courses))
    data = {'Name': username,
            'college': college,
        'review': review,
        'rating' : rating}
    df = pd.DataFrame(data)
    df.to_csv('collegereview2021.csv')


