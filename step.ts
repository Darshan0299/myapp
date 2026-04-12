import { Given, When, Then } from "@cucumber/cucumber";
import { Builder, By } from "selenium-webdriver";
import type { WebDriver } from "selenium-webdriver";
import * as assert from "assert";
import * as fs from "fs";

let driver: WebDriver;

Given("User is on login page", async function () {
  driver = await new Builder().forBrowser("chrome").build();
  await driver.get("http://your-app-url/index.html");
});

When("User enters username {string} and password {string}", async function (u, p) {
  await driver.findElement(By.id("user")).sendKeys(u);
  await driver.findElement(By.id("pass")).sendKeys(p);
});

When("User clicks login", async function () {
  await driver.findElement(By.css("button")).click();
});

Then("User is redirected to home page", async function () {
  const url = await driver.getCurrentUrl();
  assert.ok(url.includes("home.html"));
  await driver.quit();
});