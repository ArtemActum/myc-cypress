Feature: KYC | Progress Bar Percentage

  Background:
    Given I open Homepage.

  Scenario: Verify percentage of KYC progress bar
    When I login to my account with valid "<email>" and "<validpassword>".
    Then I am able to see <percentage>% complete in the progress bar message.

    Examples:
      | email              | validpassword | percentage |
      | tw2-01@yopmail.com | Test1234      | 25         |
      | tw2-02@yopmail.com | Test1234      | 50         |
      | tw2-03@yopmail.com | Test1234      | 75         |

  Scenario: Verify 100% KYC progress bar
    When I login to my account with valid "<email>" and "<validpassword>".
    Then I am not able to see the KYC progress bar.

    Examples:
      | email              | validpassword |
      | tw2-04@yopmail.com | Test1234      |
