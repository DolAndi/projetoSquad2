///<reference types="cypress"/>

import Base from "./base.page";

const INP_EMAIL = "[data-testid*=email]"
const INP_PASSWORD = "[data-testid=senha]"
const BTN_ENTRAR = "[data-testid=entrar]"


const BTN_HOME = "[data-testid*=home]"
const BTN_REGISTER_USER = "[data-testid*=cadastrar-usuarios]"
const BTN_LIST_USER = "[data-testid*=listar-usuarios]"
const BTN_REGISTER_PRODUCT = "[data-testid*=cadastrar-produtos]"
const BTN_LIST_PRODUCT = "[data-testid*=listar-produtos]"
const BTN_REPORTS = "[data-testid*=link-relatorios]"


export default class ServerestLogin extends Base {

    static acessarServerest(){
        cy.visit("https://front.serverest.dev/login")
    }

    static logar(){
        super.typeValue(INP_EMAIL, "beltrano@qa.com.br")
        super.typeValue(INP_PASSWORD, "teste")
        super.clickOnElement(BTN_ENTRAR)
    }

    static validarUrl(){
        super.validarUrl("/admin/home")
    }

    static validarBotõesDoHeader(){
        super.verifyIfElementExists(BTN_HOME)
        super.verifyIfElementExists(BTN_REGISTER_USER)
        super.verifyIfElementExists(BTN_LIST_USER)
        super.verifyIfElementExists(BTN_REGISTER_PRODUCT)
        super.verifyIfElementExists(BTN_LIST_PRODUCT)
        super.verifyIfElementExists(BTN_REPORTS)
    }
}