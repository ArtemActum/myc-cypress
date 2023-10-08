import { Given, When, Then, DataTable } from '@badeball/cypress-cucumber-preprocessor'
import myChrisities from '../page-objects/myChristies.page'
import Base from '../page-objects/base.page'

const basePage = new Base()
const myChrisitiesPage = new myChrisities()

Given('I open Homepage.', () => {
    cy.visit('/').then(() => {
    basePage.setCookie()
    })
  })

  When('I login to my account.', (dataTable: DataTable) => {
    dataTable.hashes().forEach((element) => {
    basePage.login(element.email, element.validpassword);
    });
    basePage.clickMyAccount()
    cy.on('uncaught:exception', (err, runnable) => {
      console.log(`Uncaught Exception Thrown. ${err.name}`)
      console.log(`Uncaught Exception Thrown. ${runnable.body}`)
    //   returning false here prevents Cypress from failing the test
      return false
    })
  })

  When(
    'I login to my account with invalid {string} and {string}.',
    (username?: string, password?: string) => {
        basePage.login(username, password)
    }
  )

  Then('Check name user and check url.', () => {
    //myChrisities.checkNameUser()
    cy.url().should('include', '/mychristies/activities')
  })
  
  Then('I get error message that credentials did not match our records.', () => {
    //myChrisities.displayErrorMessage()
  })
  


