import { Then, When } from '@badeball/cypress-cucumber-preprocessor'
import MyChrisities from '../page-objects/myChristies.page'

const myChrisities = new MyChrisities()

When(
	'I login to my account profile has not been set up as a transactional account {string} and {string}.',
	(email?: string, validpassword?: string) => {
		myChrisities.login(email, validpassword)
		myChrisities.clickMyAccount()
		cy.on('uncaught:exception', () => {
			return false
		})
	},
)

Then(
	'I will see the monogram icon with my web account {string} on the account header.',
	(initials?: string) => {
		myChrisities.myAccountAccountMonogramInitialsIncludes(initials)
	},
)

Then(
	'I will see my {string} linked to the logged in web user underneath the monogram icon.',
	(name?: string) => {
		myChrisities.myAccountNameIncludes(name)
	},
)

Then('I will see the {int} drop down selection.', (account?: number) => {
	myChrisities.accountNumberIncludes(account)
})

Then('I will not see the account drop down selection.', () => {
	myChrisities.accountNumberNotIncludes()
})
