///<reference types="cypress"/>

import Base from "./base.page";
import faker from "faker"

const BUTTON_CADASTRAR_PRODUTOS = "[data-testid*=cadastrarProdutos]"
const INPUT_NOME_PRODUTO= "[data-testid*=nome]"

export default class ServerestCadastrarProduto extends Base {

    static acessarpaginadecadastro(){
        cy.visit("https://front.serverest.dev/admin/cadastrarprodutos")
    }
    
    static cliclar_no_botao_cadastrar_produto(){
        super.clickOnElement(BUTTON_CADASTRAR_PRODUTOS)
    }

    static preencher_nome_do_produto(){
        super.typeValue(INPUT_NOME_PRODUTO, "Blusa")
    }
}


