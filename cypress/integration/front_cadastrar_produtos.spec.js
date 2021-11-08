/// <reference types="cypress" />

import ServerestCadastrarProduto from "../pages/cadastrarProdutos.page"
import ServerestLogin from "../pages/login.page"

describe("Teste na camada Cadastrar Produto", () => {
    beforeEach(() => {
        ServerestCadastrarProduto.acessarpaginadecadastro()
        ServerestLogin.logar()
    })

    it("Cadastro de Produto", () =>{
        ServerestCadastrarProduto.cliclar_no_botao_cadastrar_produto()
        ServerestCadastrarProduto.preencher_nome_do_produto()
    })
})                                                  

