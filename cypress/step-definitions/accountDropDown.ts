import { Then } from '@badeball/cypress-cucumber-preprocessor'
import MyChrisities from '../page-objects/myChristies.page'

const myChrisities = new MyChrisities()

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
