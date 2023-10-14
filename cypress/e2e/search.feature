Feature: Search

  Background:
    Given I open Homepage.

  Scenario: Check search is working
    When I add "<text>" to search input.
    Then Check in url this "<text>".
      Examples:
          | text  |
          | Test  |
          | Lorem |