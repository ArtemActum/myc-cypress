Feature: KYC | Progress Bar Percentage

  Background:
    Given I open Homepage.

  Scenario: Verify percentage of KYC progress bar
    When I login to my account with valid "<email>" and "<validpassword>".
    Then I am able to see <percentage>% complete in the progress bar message.

    Examples:
      | email                           | validpassword | percentage |
      | int-tw2-20221220-01@yopmail.com | Test1234      | 25         |
      | int-tw2-20221220-02@yopmail.com | Test1234      | 50         |
      | int-tw2-20221220-03@yopmail.com | Test1234      | 75         |

  Scenario: Verify 100% KYC progress bar
    When I login to my account with valid "<email>" and "<validpassword>".
    Then I am not able to see the KYC progress bar.

    Examples:
      | email                           | validpassword |
      | int-tw2-20221220-04@yopmail.com | Test1234      |
