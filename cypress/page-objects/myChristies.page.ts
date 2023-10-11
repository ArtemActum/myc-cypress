import Base from './base.page'

export default class MyChristies extends Base {

  public KYCheaderComponent() {
    return cy.get('div.myc-account-progress')
  }

  public myAccountProgressBarText() {
    return cy.get('span.mr-2')
  }

  public myAccountProgressBarTextIncludes(expectedNumber: number) {
    this.myAccountProgressBarText().should('include.text', expectedNumber)
  }

  }