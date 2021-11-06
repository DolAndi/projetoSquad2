///<reference types="cypress"/>

import faker from "faker"
import Base from "./base.page";


const BTN_REGISTER_USER ="[data-testid*=cadastrar]"

const INP_NAME = "[data-testid*=nome]"
const INP_EMAIL = "[data-testid*=email]"
const INP_PASSWORD = "[data-testid*=password]"

const BTN_REGISTER = "[data-testid=cadastrar]"
const BTN_ADMIN = "[data-testid=checkbox]"


export default class ServerestRegisterUser extends Base {

    static cadastrarUsuarioAleatório() {
        const username = faker.internet.userName()
        cy.wrap(username).as('name')

        super.clickOnElement(BTN_REGISTER_USER)
        super.typeValue(INP_NAME, username)
        super.typeValue(INP_EMAIL, faker.internet.email())
        super.typeValue(INP_PASSWORD, faker.internet.password())
        super.clickOnElement(BTN_ADMIN)
        super.clickOnElement(BTN_REGISTER)
        
    }

    static validarUrlAposCadastroDeUsuario(){
        super.validarUrl("/home")
    }

    static validarMsgCadastroRealizado(){
        super.verifyIfTextIsVisible("Cadastro realizado com sucesso")
    }

    static validarUrl(){
        super.validarUrl("/admin/home")
    }

    static validarMsgBoasVindas(){
        super.verifyIfTextIsVisible("Bem Vindo")
    }

    static validarMsgBoasVindasNome(){
        cy.get("@name").then(name => {
            super.verifyIfTextIsVisible(name)
        })
    }

}
