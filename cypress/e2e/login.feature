Feature: Login

    Background:
        Given I open Homepage.

    Scenario: Check to login with valid credentials
        When I login to my account with valid "<email>" and "<validpassword>".
        Then Check "<name>" user and check url.
        Examples:
            | email                     | validpassword |   name          |
            | int-1306202-1@yopmail.com | Zaqxsw111     |  Zoe Angela     |

    Scenario: Check to login with invalid credentials
        When I login to my account with invalid "<username>" and "<password>".
        Then I get error message that credentials did not match our records.
        Examples:
            | username            | password        |
            | testName@yopmail.com| secret_password |
            | artem               | secretpassword  |