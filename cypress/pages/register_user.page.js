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
        const user = {
            username: faker.internet.userName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
        }
        cy.wrap(user).as("user")

        super.clickOnElement(BTN_REGISTER_USER)
        super.typeValue(INP_NAME, user.username)
        super.typeValue(INP_EMAIL, user.email)
        super.typeValue(INP_PASSWORD, user.password)
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
        cy.get("@user").then(user => {
            super.verifyIfTextIsVisible(user.username)
        })
    }

    static validandoComponentes(){
        super.verifyIfTextIsVisible("Funcionalidade de cadastro de usuários para ter acesso ao ecommerce.")
        super.verifyIfTextIsVisible("Funcionalidade de listagem de usuários que estão cadastrados.")
        super.verifyIfTextIsVisible("Funcionalidade de cadastro de produtos para ser utilizado no ecommerce.")
        super.verifyIfTextIsVisible("Funcionalidade de listagem de produtos que estão cadastrados.")
        super.verifyIfTextIsVisible("Funcionalidade de relatórios gerais do sistema de ecommerce.")
    }

    static acessarListaUser(){
        cy.visit("https://front.serverest.dev/admin/listarusuarios")
    }

    static validaUsuarioCriado(){
        cy.get("@user").then(user => {
            cy.contains("td", user.username, { matchCase: false }).then($element => {
                cy.get($element).should("be.visible")
                cy.get($element).parent().contains("td", user.email).should("be.visible") 
                cy.get($element).parent().contains("td", user.password).should("be.visible") 
                cy.get($element).parent().contains("td", "true").should("be.visible") 
            })
        })
    }
}
