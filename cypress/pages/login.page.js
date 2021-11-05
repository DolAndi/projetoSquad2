///<reference types="cypress"/>

import Base from "./base.page";
import faker from "faker"

const INP_EMAIL = "[data-testid*=email]"
const INP_PASSWORD = "[data-testid=senha]"
const BTN_ENTRAR = "[data-testid=entrar]"


const BTN_HOME = "[data-testid*=home]"
const BTN_REGISTER_USER = "[data-testid*=cadastrar-usuarios]"
const BTN_LIST_USER = "[data-testid*=listar-usuarios]"
const BTN_REGISTER_PRODUCT = "[data-testid*=cadastrar-produtos]"
const BTN_LIST_PRODUCT = "[data-testid*=listar-produtos]"
const BTN_REPORTS = "[data-testid*=link-relatorios]"
const BTN_LOGOUT = "[data-testid=logout]"

const INP_REGISTER_NOME = "[data-testid=nome]"
const INP_REGISTER_EMAIL = "[data-testid=email]"
const INP_REGISTER_PASSWORD = "[data-testid=password]"
const BTN_REGISTER_ADMIN = "#administrador"
const BTN_USER = "[data-testid=cadastrarUsuario]"


//const TXT_ERROR = `<span aria-hidden="true">×</span>`



export default class ServerestLogin extends Base {

    static acessarServerest(){
        cy.visit("https://front.serverest.dev/login")
    }

    /*static validarEmailInvalido(){
        super.verifyIfElementExists(TXT_ERROR)
    }*/

    static logar(){
        super.typeValue(INP_EMAIL, "hackerman@qa.com")
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
        super.verifyIfElementExists(BTN_LOGOUT)
    }

    static cadastrarUsuarioLogado(){
        super.clickOnElement(BTN_REGISTER_USER)
        super.typeValue(INP_REGISTER_NOME, faker.internet.userName())
        super.typeValue(INP_REGISTER_EMAIL, faker.internet.email())
        super.typeValue(INP_REGISTER_PASSWORD, faker.internet.password())
        super.clickOnElement(BTN_REGISTER_ADMIN)
        super.validarUrl("/admin/cadastrarusuarios")
        super.verifyIfElementExists(BTN_USER)
        super.clickOnElement(BTN_USER)
    }

    /*static validarMsgBoasVindas(){
        super.verifyIfTextIsVisible("Este é seu sistema para administrar seu ecommerce.")
    }*/
}