/// <reference types="cypress" />

import Factory from '../dynamics/factory'

var usuarioId

describe("Testes na rota /usuarios e validações de contrato", () => {
    describe("Deve efetuar os testes positivos da rota", () => {
    it("Deve cadastrar um usuário corretamente, possuindo status code 200 e propriedade '_id'", () => {
        let usuario = Factory.UsuarioBody()

        cy.cadastrarUsuario(usuario).then( res => {
            expect(res.status).to.be.equal(201)
            expect(res.body).to.have.property("message").to.be.equal("Cadastro realizado com sucesso")
            expect(res.body).to.have.property("_id")
        cy.validarContrato(res, "post_usuarios", 201).then(validacao =>{
            expect(validacao).to.be.equal("Contrato validado!")
            }) 
            usuarioId = res.body._id
        })
    })  
    it("Deve listar usuários cadastrados possuindo status code 200", () => {
        cy.listarUsuarios().then(res => {
            expect(res.status).to.be.equal(200)
        cy.validarContrato(res, "get_usuarios", 200).then(validacao =>{
            expect(validacao).to.be.equal("Contrato validado!")
            }) 
        })
    })
    it("Deve buscar usuário pelo ID possuindo status code 200 e propriedade 'nome' e 'email'", () => {
        cy.buscarUsuarioId(usuarioId).then(res => {
            expect(res.status).to.be.equal(200)
            expect(res.body).to.have.property("nome")
            expect(res.body).to.have.property("email")
        cy.validarContrato(res, "get_usuarios_id", 200).then(validacao =>{
            expect(validacao).to.be.equal("Contrato validado!")
            })
        })
    })
    it("Deve editar usuário possuindo status code 200 e propriedade 'message'", () => {
        let body = Factory.UsuarioEdit()
       
        cy.editarUsuario(usuarioId, body).then(res => {
            expect(res.status).to.be.equal(200)
            expect(res.body).to.have.property("message").equal("Registro alterado com sucesso")
        cy.validarContrato(res, "put_usuarios_id", 200).then(validacao =>{
            expect(validacao).to.be.equal("Contrato validado!")
            })
       })
   })
   it("Deve cadastrar usuário caso o mesmo não possua cadastro possindo status code 201, propriedades 'message' e '_id'", () =>{
    let usuario = Factory.UsuarioBody()
    let body = Factory.UsuarioEdit()

       cy.editarUsuario(usuario, body).then(res => {
            expect(res.status).to.be.equal(201)
            expect(res.body).to.have.property("message").equal("Cadastro realizado com sucesso")
            expect(res.body).to.have.property("_id")
        cy.validarContrato(res, "put_usuarios_id", 201).then(validacao =>{
            expect(validacao).to.be.equal("Contrato validado!")
            })
        })
   })
   it("Deve excluir usuário possuindo status code 200 e propriedade 'message'", () => {
        cy.excluirUsuario(usuarioId).then(res =>{
            expect(res.status).to.be.equal(200)
            expect(res.body).to.have.property("message").equal("Registro excluído com sucesso")
        cy.validarContrato(res, "delete_usuarios_id", 200).then(validacao =>{
            expect(validacao).to.be.equal("Contrato validado!")
            })
        })
    })
})
describe("Deve efetuar os testes negativos da rota", () => {
    it("Deve dar erro ao tentar cadastrar usuário já cadastrado possuindo status code 400 e propriedade 'message'", () => {
        let usuario = Factory.UsuarioExistente()

        cy.cadastrarUsuario(usuario).then( res => {
            expect(res.status).to.be.equal(400)
            expect(res.body).to.have.property("message").to.be.equal("Este email já está sendo usado")
        cy.validarContrato(res, "post_usuarios", 400).then(validacao =>{
            expect(validacao).to.be.equal("Contrato validado!")
            }) 
        })
    })
    it("Deve dar erro ao buscar usuário por ID possuindo status code 400 epropriedade 'message'", () => {
        cy.buscarUsuarioId().then(res => {
            expect(res.status).to.be.equal(400)
            expect(res.body).to.have.property("message").to.be.equal("Usuário não encontrado")
        cy.validarContrato(res, "get_usuarios_id", 400).then(validacao =>{
            expect(validacao).to.be.equal("Contrato validado!")
            })
        })
    })
    it("Deve dar erro ao editar usuário com email já cadastrado possuindo status code 400 e prorpiedade 'message'", () => {
    let body = Factory.UsuarioExistente()
   
    cy.editarUsuario(usuarioId, body).then(res => {
        expect(res.status).to.be.equal(400)
        expect(res.body).to.have.property("message").equal("Este email já está sendo usado")
    cy.validarContrato(res, "put_usuarios_id", 400).then(validacao =>{
        expect(validacao).to.be.equal("Contrato validado!")
                })
            })
        })
    })
})
