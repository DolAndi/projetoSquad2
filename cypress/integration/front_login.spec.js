/// <reference types="cypress" />

import ServerestLogin from "../pages/login.page"

describe("Testes na rota login", () => {
    beforeEach(() => {
        ServerestLogin.acessarServerest()
        ServerestLogin.logar()
    })


    it("Validando URL após login", () => {
        ServerestLogin.validarUrl()
    })

    it("Validando se os botões do cabeçalho estão visíveis", () => {
        ServerestLogin.validarBotõesDoHeader()
    })

    it.only("Cadastrando usuário após estar logado - validar url", () => {
        ServerestLogin.cadastrarUsuarioLogado()
    })

    /*it("Validando mensagem de boas vindas Fulano da Silva", () => {
        ServerestLogin.verifyIfTextIsVisible()
    })*/

})
