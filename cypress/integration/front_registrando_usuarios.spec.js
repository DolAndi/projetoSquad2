/// <reference types="cypress" />

import ServerestLogin from "../pages/login.page"
import ServerestRegisterUser from "../pages/register_user.page"


describe("Testes na rota cadastro de usuário", () => {
    beforeEach(() => {
        ServerestLogin.acessarServerest()
        ServerestRegisterUser.cadastrarUsuarioAleatório()
    })

    it("Validando URL e mensagem de boas vindas", () => {
        ServerestRegisterUser.validarMsgCadastroRealizado()
        ServerestRegisterUser.validarUrl()
        ServerestRegisterUser.validarMsgBoasVindas()
        ServerestRegisterUser.validarMsgBoasVindasNome()
    })

}) 
