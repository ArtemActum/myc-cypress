export default class BasePage {
// Locators
tradChineseLink = '[lang="zh"]'
simpleChineseLink = '[lang="zh-cn"]'
englishLink = '[lang="en"]'
loginBtn = '.chr-header__user-zone .chr-button__text'
signInHomePageBtn = 'button.chr-button.chr-button--light.chr-button--primary.chr-button--sm .chr-button__text '
myAccountBtn = 'a.chr-button.chr-button--link.chr-button--lg.chr-button--light.chr-button--icon-left .chr-button__text.chr-action'
userInput = '#username'
passwdInput = '#password'
signInModalWindowBtn = 'button.chr-button.chr-button--primary.chr-button--lg.chr-button--light.chr-button--full-width'
// Page Object Methods

open(path) {
    cy.visit(path).then(() => {
      this.setCookie()
    })
  }

setCookie() {
    const date = new Date().toISOString()
    console.log(window.location)
    cy.setCookie('FastSignup', 'FastSignupCreated')
    cy.setCookie('OptanonAlertBoxClosed', date).then(() => {
      cy.reload()
    })
  }

  login(
    loginUsername,
    loginPassword,
  ) {
    cy.get(this.signInHomePageBtn).click()
    cy.get(this.userInput).click().type(loginUsername, {force: false, delay: 0})
    cy.get(this.passwdInput).click().type(loginPassword, {force: false, delay: 0})
    cy.get(this.signInModalWindowBtn).click()
  }

  invalidlogin(
    invalidUsername = 'invalid username',
    invalidPassword = 'invalid password',
  ) {
    cy.get(this.signInHomePageBtn).click()
    cy.get(this.userInput).click().type(invalidUsername)
    cy.get(this.passwdInput).type(invalidPassword)
    cy.get(this.signInModalWindowBtn).click()
  }

  clickMyAccount() {
    cy.get(this.myAccountBtn).click()
  }

}