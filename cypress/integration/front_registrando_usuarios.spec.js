/// <reference types="cypress" />

import ServerestLogin from "../pages/login.page"
import ServerestRegisterUser from "../pages/register_user.page"


describe("Testes na rota cadastro de usuário", () => {
    beforeEach(() => {
        ServerestLogin.acessarServerest()
        ServerestRegisterUser.cadastrarUsuarioAleatório()
    })

    it("Validando URL - mensagem de Cadastro realizado com sucesso e boas vindas", () => {
        ServerestRegisterUser.validarMsgCadastroRealizado()
        ServerestRegisterUser.validarUrl()
        ServerestRegisterUser.validarMsgBoasVindas()
        ServerestRegisterUser.validarMsgBoasVindasNome()
    })

    it("Validando Textos dos componentes", () => {
        ServerestRegisterUser.validandoComponentes()
    })

    it("Validando se o usuário cadastrado aparece na lista", () => {
        ServerestRegisterUser.acessarListaUser()
        ServerestRegisterUser.validaUsuarioCriado()
    })
}) 
