import requests
from bs4 import BeautifulSoup

url = 'https://timesofindia.indiatimes.com/'

soup = BeautifulSoup(requests.get(url).text, 'html.parser')

links = []

news_dic = {
    'titles': [],
    'contents': [],
}

all_news_wrapper = soup.find_all('div', class_='grid_wrapper')

num = 0
news_items = all_news_wrapper[0].find_all('a')
for news in news_items:
    if news['href']:
        links.append(news['href'])
        num += 1
    
    if num == 3:
        break
    
for item in links:
    news_page = BeautifulSoup(requests.get(item).text, 'html.parser')
    title = news_page.find('h1').text.strip()
    content = news_page.find_all('div', class_='js_tbl_article')
    
    news_dic['titles'].append(title)
    
    for i in content:
        news_dic['contents'].append(i.text.strip())
        

def get_latest_news():
    return "\n".join([f"{title} - {content}" for title, content in zip(news_dic['titles'], news_dic['contents'])])