Feature: Account drop down

  #  https://christiestech.atlassian.net/browse/TW2-365

  Background:
    Given I open Homepage.

  Scenario: AC2 - Account drop down shown
    When I login to my account with valid "<email>" and "<validpassword>".
    Then I will see the monogram icon with my web account "<initials>" on the account header.
    And I will see my "<name>" linked to the logged in web user underneath the monogram icon.
    And I will see the <account> drop down selection.

    Examples:
      | email                           | validpassword | initials | name                   | account  |
      | int-tw2-20221220-04@yopmail.com | Test1234      | MALS     | Miss Amy Louise Sample | 10622848 |


