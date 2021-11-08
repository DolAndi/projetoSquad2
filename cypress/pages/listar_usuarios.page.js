///<reference types="cypress"/>

import Base from "./base.page";
import faker from "faker"

const BUTTON_LISTAR_USUARIOS= "[data-testid*=listarUsuarios]"


export default class ServerestListarUsuarios extends Base {
    static acessar_listar_usuarios(){
        cy.visit("https://front.serverest.dev/admin/listarusuarios")
    }

    static clicar_botão_listar(){
        super.clickOnElement(BUTTON_LISTAR_USUARIOS)
    }

    static validarUrl(){
        super.validarUrl("https://front.serverest.dev/admin/listarusuarios")
    }
}