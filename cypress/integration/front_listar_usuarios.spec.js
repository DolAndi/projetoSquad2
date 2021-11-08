/// <reference types="cypress" />


import ServerestListarUsuarios from "../pages/listar_usuarios.page"
import ServerestLogin from "../pages/login.page"

describe("Teste na camada Listar Usuarios",() =>{
    beforeEach(() =>{
        ServerestListarUsuarios.acessar_listar_usuarios()
        ServerestLogin.logar()
    })

    it.only("Listar Usuarios", () =>{
        ServerestListarUsuarios.clicar_botão_listar()
        ServerestListarUsuarios.validarUrl()
    })
})

