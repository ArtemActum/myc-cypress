import Base from '../page-objects/base.page'

const basePage = new Base()

const searchTerms = ['Test', 'Lorem', 'banana', 'cherry']

describe('Search functionality', () => {
	for (const term of searchTerms) {
		it(`should search for "${term}"`, () => {
			cy.visit('/').then(() => {
				basePage.setCookie()
			})
			basePage.searchInput().type(term)
			basePage.searchButton().click()
			basePage.searchResult().should('contain', term)
		})
	}
})
