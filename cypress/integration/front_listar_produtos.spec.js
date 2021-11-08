/// <reference types="cypress" />

import ServerestListarProdutos from "../pages/listar_produtos.page"
import ServerestLogin from "../pages/login.page"

describe("Testar camada Listar Produto",() =>{
    beforeEach(() =>{
        ServerestListarProdutos.acessar_listar_produtos()
        ServerestLogin.logar()
    })

    it('Funcionalidade do botão listar produtos',() =>{
        ServerestListarProdutos.clicar_botão_listar_produtos()
    })
})