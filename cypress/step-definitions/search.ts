import { Given, When, Then, DataTable } from '@badeball/cypress-cucumber-preprocessor'
import MyChrisities from '../page-objects/myChristies.page'
import Base from '../page-objects/base.page'

const basePage = new Base()
const myChrisities = new MyChrisities()

When('I add {string} to search input.', (text: string) => {
  basePage.addTextToSearchInput(text)
})

Then('Check in url this {string}.', (text: string) => {
  cy.url().should('include', text)
})

  


