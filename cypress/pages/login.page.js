///<reference types="cypress"/>

import Base from "./base.page";
import faker from "faker"
import factory from "../dynamics/factory"

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

const TEXT_WELCOME = "[h1]"

const IMG = ".imagem"
const TXT_LOGIN = ".font-robot"
const INP_LOGIN = "[data-testid=senha]"


export default class ServerestLogin extends Base {

    static acessarServerest(){
        cy.visit("https://front.serverest.dev/login")
    }


    static preencherEmail(){
        super.typeValue(INP_EMAIL, "hackerman@qa.com")
    }
    static preencherSenha(){
        super.typeValue(INP_PASSWORD, "teste")
    }
    static clicarBtEntrar(){
        super.clickOnElement(BTN_ENTRAR)
    }

    static validarAlerta(text){
        super.verifyIfTextIsVisible(text)
    }

    static validarComponentesLogin(){
        super.verifyIfElementIsVisible(IMG)
        super.verifyIfElementIsVisible(TXT_LOGIN)
        super.verifyIfElementIsVisible(INP_REGISTER_EMAIL)
        super.verifyIfElementIsVisible(INP_LOGIN)
        super.validatePlaceholder(INP_REGISTER_EMAIL,"Digite seu email")
        super.validatePlaceholder(INP_LOGIN,"Digite sua senha")
    }

    static logar(){
        cy.intercept("GET", `https://serverest.dev/usuarios`).as("Wait_load")
        super.typeValue(INP_EMAIL, "hackerman@qa.com")
        super.typeValue(INP_PASSWORD, "teste")
        super.clickOnElement(BTN_ENTRAR)
        cy.wait('@Wait_load')
    }

    static clicarBtLogout() {
        super.verifyIfElementExists(BTN_LOGOUT)
        super.clickOnElement(BTN_LOGOUT)
    }

    static logarViaApi() {
        const user = factory.UsuarioBody()
        cy.cadastrarUsuario(user)
        cy.logar({
            email: user.email,
            password: user.password
        }).then(logar => {
            cy.window().then(window => {
                window.localStorage.setItem("serverest/userPassword", user.password)
                window.localStorage.setItem("serverest/userEmail", user.email)
                window.localStorage.setItem("serverest/userToken", logar.body.authorization)
                window.localStorage.setItem("serverest/userNome", user.nome)
            })
        })
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
    
    static validarTextos(){
        super.validateElementText(TEXT_WELCOME)
    }
}