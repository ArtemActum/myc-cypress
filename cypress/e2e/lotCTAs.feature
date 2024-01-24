Feature: Check lot CTAs

  Background:
    Given I open Homepage.

  Scenario: Client selects option to edit absentee bid
    When I login to my account with valid "<email>" and "<validpassword>".
    And I open Buying page.
    And I select the option to edit the absentee bid on the lot.
    Then I will be presented with a modal window.

    Examples:
      | email                           | validpassword |
      | int-tw2-20230126-29@yopmail.com | Test1234      |