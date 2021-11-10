/// <reference types="cypress" />

import ServerestLogin from "../pages/login.page"

describe("Testes na rota login", () => {
    beforeEach(() => {
        ServerestLogin.acessarServerest()
    })

    it("Logar com sucesso", () => {
        ServerestLogin.preencherEmail()
        ServerestLogin.preencherSenha()
        ServerestLogin.clicarBtEntrar()
        ServerestLogin.validarUrl('/admin/home')
        ServerestLogin.clicarBtLogout()
    })


    it("Logar sem a senha", () => {
        ServerestLogin.preencherEmail()
        ServerestLogin.clicarBtEntrar()
        ServerestLogin.validarAlerta("Password é obrigatório")
    })

    it("Logar sem email", () => {
        ServerestLogin.preencherSenha()
        ServerestLogin.clicarBtEntrar()
        ServerestLogin.validarAlerta("Email é obrigatório")
    })

    it("Logar sem preencher campos", () => {
        ServerestLogin.clicarBtEntrar()
        ServerestLogin.validarAlerta("Password é obrigatório")
        ServerestLogin.validarAlerta("Email é obrigatório")
    })

    it("Validar componentes /login", () => {
        ServerestLogin.validarComponentesLogin()
    })
})
