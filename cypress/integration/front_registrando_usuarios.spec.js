/// <reference types="cypress" />

import ServerestLogin from "../pages/login.page"
import ServerestRegisterUser from "../pages/register_user.page"


describe("Testes na rota cadastro de usuário", () => {
    beforeEach(() => {
        ServerestLogin.acessarServerest()
    })

    it("Cadastrando usuário aleatório", () => {
        ServerestRegisterUser.cadastrarUsuarioAleatório()
    })

    it("Validando a URL após o usuário estar cadastrado", () => {
        ServerestRegisterUser.validarUrlAposCadastroDeUsuario()
    })

    it("Validar Mensagem de boas vindas após cadastro", () => {
        ServerestRegisterUser.validarMsgBoasVindas()
    })

})