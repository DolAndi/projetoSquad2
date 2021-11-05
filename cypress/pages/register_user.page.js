///<reference types="cypress"/>

import faker from "faker"
import Base from "./base.page";


const BTN_REGISTER_USER ="[data-testid*=cadastrar]"

const INP_NAME = "[data-testid*=nome]"
const INP_EMAIL = "[data-testid*=email]"
const INP_PASSWORD = "[data-testid*=password]"

const BTN_REGISTER = "[data-testid=cadastrar]"
const BTN_ADMIN = "[data-testid=checkbox]"

const IMG = ".imagem"



export default class ServerestRegisterUser extends Base {

    static cadastrarUsuarioAleatório() {
        super.clickOnElement(BTN_REGISTER_USER)
        super.typeValue(INP_NAME, faker.internet.userName())
        super.typeValue(INP_EMAIL, faker.internet.email())
        super.typeValue(INP_PASSWORD, faker.internet.password())
        super.clickOnElement(BTN_ADMIN)
        super.clickOnElement(BTN_REGISTER)
    }

    static validarUrlAposCadastroDeUsuario(){
        super.validarUrl("/home")
    }

    static validarMsgBoasVindas(){
        super.verifyIfTextIsVisible("Cadastro realizado com sucesso")
    }

    static validarUrl(){
        super.validarUrl("/admin/home")
    }

    static cadastrarUsuarioAleatórioEInvalido(){
        super.clickOnElement(BTN_REGISTER_USER)
        super.typeValue(INP_NAME, "fulanoqa")
        //super.typeValue(INP_EMAIL, "a")
        super.typeValue(INP_PASSWORD, faker.internet.password())
        super.clickOnElement(BTN_ADMIN)
        super.clickOnElement(BTN_REGISTER)
    }

}


/*        super.typeValue(INP_NAME, faker.name.firstName())
        super.typeValue(INP_EMAIL, faker.internet.email())
        super.typeValue(INP_PASSWORD, faker.internet.password()) */