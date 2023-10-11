import { Given, When, Then, DataTable } from '@badeball/cypress-cucumber-preprocessor'
import MyChrisities from '../page-objects/myChristies.page'
import Base from '../page-objects/base.page'

const basePage = new Base()
const myChrisities = new MyChrisities()

Given('I open Homepage.', () => {
    cy.visit('/').then(() => {
    basePage.setCookie()
    })
  })

  When('I login to my account with valid {string} and {string}.', (email?: string, validpassword?: string) => {
    basePage.login(email, validpassword)
    basePage.clickMyAccount()
    cy.on('uncaught:exception', (err, runnable) => {
      return false
    })
  })

  When(
    'I login to my account with invalid {string} and {string}.',
    (username?: string, password?: string) => {
        basePage.login(username, password)
    }
  )

  Then('Check {string} user and check url.', (name?: string) => {
    myChrisities.checkNameUser(name)
    cy.url().should('include', '/mychristies/activities')
  })
  
  Then('I get error message that credentials did not match our records.', () => {
    basePage.displayErrorMessage()
  })
  


