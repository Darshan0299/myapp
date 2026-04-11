Feature: Cloth Web App

Scenario: Login flow
  Given User is on login page
  When User enters username "testuser" and password "testpass"
  And User clicks login
  Then User is redirected to home page