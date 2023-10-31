import Base from './base.page'

export default class MyChristies extends Base {
	public nameUser() {
		return cy.get('#ctl00_lblUser')
	}

	public KYCheaderComponent() {
		return cy.get('div.myc-account-progress')
	}

	public myAccountProgressBarText() {
		return cy.get('span.mr-2')
	}

	public accountDropDown() {
		return cy.get('select.myc-header__account-dropdown ')
	}

	public accountMonogram() {
		return cy.get('#ctl00_lblInitials')
	}

	public accountName() {
		return cy.get('#ctl00_lblUser')
	}

	public myAccountProgressBarTextIncludes(expectedNumber: number) {
		this.myAccountProgressBarText().should('include.text', expectedNumber)
	}

	public checkNameUser(name: string) {
		this.nameUser().should('be.visible').and('include.text', name)
	}

	public myAccountAccountMonogramInitialsIncludes(initials: string) {
		this.accountMonogram().should('have.text', initials)
	}

	public myAccountNameIncludes(name: string) {
		this.accountName().should('have.text', name)
	}

	public accountNumberIncludes(account: number) {
		this.accountDropDown().should('include.text', account)
	}

	public accountNumberNotIncludes(account: number) {
		this.accountDropDown()
			.should('not.include.text', account)
			.and('not.have.id', 'accountDropdown')
	}
}
