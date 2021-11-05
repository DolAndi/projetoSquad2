/// <reference types="cypress" />

import ServerestLogin from "../pages/login.page"
import ServerestRegisterUser from "../pages/register_user.page"


describe("Testes na rota cadastro de usuário", () => {
    beforeEach(() => {
        ServerestLogin.acessarServerest()
        ServerestRegisterUser.cadastrarUsuarioAleatório()
    })

    it("Validando url após cadastro", () => {
       ServerestRegisterUser.validarUrl()
    })

    /*it("Validando se a imagem da serverest está visível", () => {
        ServerestRegisterUser.verifyIfImgIsVisible()
    })*/
}) 

describe("Testes negativos na rota cadastro", () => {
    beforeEach(() => {
        ServerestLogin.acessarServerest()
    })

    it.only("validar usuario invalido", () => {
        ServerestRegisterUser.cadastrarUsuarioAleatórioEInvalido()
    })

})