import { When, Then } from '@badeball/cypress-cucumber-preprocessor'
import MyChrisities from '../page-objects/myChristies.page'

const myChrisities = new MyChrisities()

When('I Switch {string}.', (languages?: string) => {
	myChrisities.switchLanguageTo(languages)
})

Then('Url should include {string}.', (attribute?: string) => {
	cy.url().should('include', attribute)
})
