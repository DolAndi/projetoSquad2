/// <reference types="cypress" />

import ServerestLogin from "../pages/login.page"
import ServerestRegisterProducts from "../pages/register_product.page"

describe("Testes na rota cadastro de produto", () => {
    beforeEach(() => {
        ServerestLogin.logarViaApi()
        ServerestRegisterProducts.acessarProduto()
    })

    it("Cadastrando produto e validando na lista", () => {
        ServerestRegisterProducts.cadastrarProdutoAleatório()
        ServerestRegisterProducts.clicarBtnCadastrar()
        ServerestRegisterProducts.validarProdutoCriado()
    })

})