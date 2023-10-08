Feature: Login

    Background:
        Given I open Homepage.

    Scenario: Check to login with valid credentials
        When I login to my account.
         | email                     | validpassword |
         | int-1306202-1@yopmail.com | Zaqxsw111     |
        Then Check name user and check url.

    Scenario: Check to login with invalid credentials
        When I login to my account with invalid "<username>" and "<password>".
        Then I get error message that credentials did not match our records.
        Examples:
            | username            | password        |
            | testName@yopmail.com| secret_password |
            | artem               | secretpassword  |