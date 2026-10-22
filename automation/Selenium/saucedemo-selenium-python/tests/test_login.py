from selenium import webdriver
from selenium.webdriver.common.by import By


def test_successful_login():
    driver = webdriver.Chrome()

    driver.get("https://www.saucedemo.com/")

    driver.find_element(By.ID, "user-name").send_keys("standard_user")
    driver.find_element(By.ID, "password").send_keys("secret_sauce")
    driver.find_element(By.ID, "login-button").click()

    title = driver.find_element(By.CLASS_NAME, "title")

    assert title.text == "Products"

    driver.quit()