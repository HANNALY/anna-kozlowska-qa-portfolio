from selenium import webdriver
from selenium.webdriver.common.by import By


def test_add_item_to_cart():
    driver = webdriver.Chrome()


    driver.get("https://www.saucedemo.com/")
    item_name = driver.find_element(By.CLASS_NAME, "inventory_item_name")
    assert item_name.text == "Sauce Labs Backpack"
    driver.find_element(By.ID, "add-to-cart-sauce-labs-backpack").click()
