import { When, Then } from '@badeball/cypress-cucumber-preprocessor'
import MyChrisities from '../page-objects/myChristies.page'

const myChrisities = new MyChrisities()

When('I add {string} to search input.', (text: string) => {
	myChrisities.addTextToSearchInput(text)
})

Then('Check in url this {string}.', (text: string) => {
	cy.url().should('include', text)
})
