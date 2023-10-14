export default class BasePage {
// Locators

public loginBtn() {
  return cy.get('.chr-header__user-zone .chr-button__text')
}

public signInHomePageBtn() {
  return cy.get('button.chr-button.chr-button--light.chr-button--primary.chr-button--sm .chr-button__text ')
}

public myAccountBtn() {
  return cy.get('.chr-button.chr-button--link.chr-button--lg.chr-button--light.chr-button--icon-left')
}

public userInput() {
  return cy.get('#username')
}

public passwdInput() {
  return cy.get('#password')
}

public signInModalWindowBtn() {
  return cy.get('button.chr-button.chr-button--primary.chr-button--lg.chr-button--light.chr-button--full-width')
}

public ErrorMessage() {
  return cy.get('.align-items-center.d-inline-flex.mb-5 > .chr-color-red-alert.chr-label.content-zone')
}

public tradChineseLink() {
  return cy.get('[lang="zh"]')
}

public simpleChineseLink() {
  return cy.get('[lang="zh-cn"]')
}

public englishLink() {
  return cy.get('[lang="en"]')
}

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

  login(loginUsername, loginPassword) {
    this.signInHomePageBtn().click()
    this.userInput().click().type(loginUsername, {force: false, delay: 0})
    this.passwdInput().click().type(loginPassword, {force: false, delay: 0})
    this.signInModalWindowBtn().click()
  }


  clickMyAccount() {
    this.myAccountBtn().click()
  }

  displayErrorMessage() {
    this.ErrorMessage().should(
      'contain.text',
      'The email address and password that you entered did not match our records.',
    )
  }

  switchLanguageTo(language) {
    switch (language) {
      case 'zh':
        this.tradChineseLink().click()
        break
      case 'zh-cn':
        this.simpleChineseLink().click()
        break
      case 'en':
        this.tradChineseLink().click()
        this.englishLink().click()
        break
      default:
        break
    }
  }

}