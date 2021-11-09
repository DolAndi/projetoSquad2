/// <reference types="cypress" />

import ServerestListarProdutos from "../pages/listar_produtos.page"
import ServerestLogin from "../pages/login.page"

describe("Testar camada Listar Produto",() =>{
    beforeEach(() =>{
        ServerestListarProdutos.acessar_listar_produtos()
        ServerestLogin.logar()
    })

    it('Listar produtos e validar url',() =>{
        ServerestListarProdutos.validarUrl()
        ServerestListarProdutos.clicar_botão_listar_produtos()
    })
})