import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'
import MyChrisities from '../page-objects/myChristies.page'

const myChrisities = new MyChrisities()

Given('I open Homepage.', () => {
	cy.visit('/').then(() => {
		myChrisities.setCookie()
	})
})

When(
	'I login to my account with valid {string} and {string}.',
	(email?: string, validpassword?: string) => {
		myChrisities.login(email, validpassword)
		myChrisities.clickMyAccount()
		cy.on('uncaught:exception', () => {
			return false
		})
	},
)

When(
	'I login to my account with invalid {string} and {string}.',
	(username?: string, password?: string) => {
		myChrisities.login(username, password)
	},
)

Then('Check {string} user and check url.', (name?: string) => {
	myChrisities.checkNameUser(name)
	cy.url().should('include', '/mychristies/activities')
})

Then('I get error message that credentials did not match our records.', () => {
	myChrisities.displayErrorMessage()
})
