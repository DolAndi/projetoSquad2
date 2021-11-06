export default class Base {
    static getElement(element, index = undefined) {
        let elem;
    
        if (typeof index !== 'undefined' || index > 0) {
          elem = cy.get(element, { timeout: Cypress.env('global_timeout') }).eq(index);
        } else {
          elem = cy.get(element, { timeout: Cypress.env('global_timeout') });
        }
        return elem;
      }

      static clickOnElement(element, index = undefined, force = false) {
        if (force === true) {
          return this.getElement(element, index).click({ force: true });
        } else {
          return this.getElement(element, index).click();
        }
      }

      static typeValue(element, value, force = false) {
        if (force === true) {
          this.getElement(element).type(value, { force: true });
        } else {
          this.getElement(element).type(value);
        }
      }

      static validarUrl(url){
        cy.url().should('include', url)
      }

      static validateElementText(element, value, index = undefined) {
        this.getElementText(element, index).then((text) => {
          expect(text).to.contains(value);
        });
      }

      static getElementText(element, index = undefined) {
        return this.getElement(element, index).invoke('text');
      }

      static verifyIfElementExists(element) {
        this.getElement(element).should('exist', { timeout: Cypress.env('global_timeout') });
      }

      static verifyIfTextIsVisible(text) {
        cy.contains(text, {matchCase: false}).should("be.visible")
      }
// -------------------------------------------------------

      static verifica(text) {
      cy.get(text).should("contain", `Bem Vindo`);
    }

    static verifyIfElementIsVisible(elemt){
      cy.get(elemt).should("be.visible")
    }

    static validatePlaceholder(element, placeholder){
      cy.get(element).should("have.attr", "placeholder", placeholder);
    }

}