import { Given, When, Then, DataTable } from '@badeball/cypress-cucumber-preprocessor'
import MyChrisities from '../page-objects/myChristies.page'
import Base from '../page-objects/base.page'

const basePage = new Base()
const myChrisities = new MyChrisities()
  
  When('I Switch {string}.', (languages?: string) => {
    basePage.switchLanguageTo(languages)
  })
  
  Then('Url should include {string}.', (attribute?: string) => {
    cy.url().should('include', attribute)
  })


