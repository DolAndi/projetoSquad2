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

})
