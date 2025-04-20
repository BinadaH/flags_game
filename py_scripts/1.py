import requests
from bs4 import BeautifulSoup

base_url = "https://flagpedia.net"
r = requests.get("https://flagpedia.net/organization/un#t")
soup = BeautifulSoup(r.text)

flag_container = soup.find_all("div", {"class": "flag-container"})[0]
countries = flag_container.find_all("li")


country_data = [

]

for country in countries:
    c_name = country.find("a").attrs["href"]    
    url = base_url + c_name
    c_r = requests.get(url)
    c_soup = BeautifulSoup(c_r.text)
    img_url = base_url + c_soup.find("img").attrs["src"]

    c_data = c_soup.find_all("table", {"class": "table-dl"})[0].find_all("td")
    
    country_name = c_data[2].text
    capital = c_data[3].text
    continent = c_data[4].text

    r = requests.get(img_url)
    if r.status_code == 200:
        file_path = "flag_data/imgs" + c_name.lstrip() + ".png"
        with open(file_path, "wb") as f:
            f.write(r.content)
        country_data.append({"name": country_name, "capital": capital, "continent": continent, "flag_img": file_path})



import json
with open("flag_data/data.json", "w") as f:
    f.write(json.dumps(country_data))