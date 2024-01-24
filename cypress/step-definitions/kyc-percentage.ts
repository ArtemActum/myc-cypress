import { Then } from '@badeball/cypress-cucumber-preprocessor'
import MyChrisities from '../page-objects/myChristies.page'

const myChrisities = new MyChrisities()

Then(
	'I am able to see {int}% complete in the progress bar message.',
	(percentage?: number) => {
		myChrisities.KYCheaderComponent().should('be.visible')
		myChrisities.myAccountProgressBarTextIncludes(percentage)
	},
)

Then('I am not able to see the KYC progress bar.', () => {
	myChrisities.KYCheaderComponent().should('not.visible')
})
