import { When, Then } from '@badeball/cypress-cucumber-preprocessor'
import Base from '../page-objects/base.page'

const basePage = new Base()

When('I Switch {string}.', (languages?: string) => {
	basePage.switchLanguageTo(languages)
})

Then('Url should include {string}.', (attribute?: string) => {
	cy.url().should('include', attribute)
})
