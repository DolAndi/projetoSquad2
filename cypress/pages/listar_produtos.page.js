/// <reference types="cypress" />

import Base from "./base.page";
import faker from "faker"


const BUTTON_LISTAR_PRODUTOS= "[data-testid*=listarProdutos]"

export default class ServerestListarProdutos extends Base {

    static acessar_listar_produtos(){
        cy.visit("https://front.serverest.dev/admin/listarprodutos")
    }

    static clicar_botão_listar_produtos(){
        super.clickOnElement(BUTTON_LISTAR_PRODUTOS)
    }

}
