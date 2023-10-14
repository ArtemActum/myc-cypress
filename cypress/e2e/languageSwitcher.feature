Feature: Language Switcher

    Background:
        Given I open Homepage.

    Scenario: Check Language Switcher 
        When I Switch "<languages>".
        Then Url should include "<attribute>".
        Examples:
            | languages | attribute  |
            | zh        | zh    |
            | zh-cn     | zh-cn |
            | en        | en    |
