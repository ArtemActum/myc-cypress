import { When, Then } from '@badeball/cypress-cucumber-preprocessor'
import Base from '../page-objects/base.page'

const basePage = new Base()

When('I add {string} to search input.', (text: string) => {
	basePage.addTextToSearchInput(text)
})

Then('Check in url this {string}.', (text: string) => {
	cy.url().should('include', text)
})
