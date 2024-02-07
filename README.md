# Cypress-Assigment

### Table of Contents
- #### Introduction
- #### Installation
- #### Usage
- #### Contributing

# Introduction

This repository contains the code for the Cypress project. The project aims to demonstrate the usage of Cypress, a JavaScript-based end-to-end testing framework. Automated tests are prepared for integration environment https://integration.christies.com/


## Tests written for:
- Home page (language switcher, search bar)
- My account page (login, account drop down, KYC progress bar)
  
![image](https://github.com/ArtemActum/myc-cypress/assets/102807433/d0d068ad-070d-4ed4-8257-1620f7c4717f)

# Installation
To run the tests locally, follow these steps:

1. Clone the repository:
```bash
git clone https://github.com/ArtemActum/myc-cypress
 ```
2. Navigate to the project directory:
```bash
cd myc-cypress
 ```
3. Install the dependencies:
```bash
npm install
```
5. Ensure that you have the required dependencies installed:
    - Node.js
    - npm

#  Usage
- To execute the Cypress tests, use the following command:
```bash
npm test
```

This command will run Cypress in headless mode and generate test reports in the terminal.<br> The tests are configured to run on the default browser provided by Cypress.<br> 

- If you want to run the tests in an interactive mode and view the Cypress test runner, use the command:
```bash
npm run cy:open
```

This will open the Cypress Test Runner, allowing you to select and run individual test cases.

#  Contributing
Contributions to this project are welcome. If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

When contributing, please ensure that you follow the existing coding style and conventions. <br> Also, provide clear and descriptive commit messages for your changes.
