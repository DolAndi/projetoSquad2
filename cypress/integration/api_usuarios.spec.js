/// <reference types="cypress" />

import Factory from '../dynamics/factory'

var usuarioId

describe('Testes na rota /usuarios e validações de contrato', () => {
    it('Deve cadastrar um usuário corretamente', () => {
        let usuario = Factory.UsuarioBody()

        cy.cadastrarUsuario(usuario).then( res => {
            expect(res.status).to.be.equal(201)
            expect(res.body).to.have.property('message').to.be.equal('Cadastro realizado com sucesso')
            expect(res.body).to.have.property('_id')
        cy.validarContrato(res, "post_usuarios", 201).then(validacao =>{
            expect(validacao).to.be.equal("Contrato validado!")
        }) 
            usuarioId = res.body._id
        })
    })  
    it('Deve dar erro ao cadastrar usuário já cadastrado', () => {
        let usuario = Factory.UsuarioExistente()

        cy.cadastrarUsuario(usuario).then( res => {
            expect(res.status).to.be.equal(400)
            expect(res.body).to.have.property('message').to.be.equal('Este email já está sendo usado')
        cy.validarContrato(res, "post_usuarios", 400).then(validacao =>{
            expect(validacao).to.be.equal("Contrato validado!")
            }) 
        })
    })
    it('Deve listar usuários cadastrados', () => {
        cy.listarUsuarios().then(res => {
            expect(res.status).to.be.equal(200)
        cy.validarContrato(res, "get_usuarios", 200).then(validacao =>{
            expect(validacao).to.be.equal("Contrato validado!")
            }) 
        })
    })
    it('Deve buscar usuário pelo ID', () => {
        cy.buscarUsuarioId(usuarioId).then(res => {
            expect(res.status).to.be.equal(200)
        cy.validarContrato(res, "get_usuarios_id", 200).then(validacao =>{
            expect(validacao).to.be.equal("Contrato validado!")
            })
        })
    })
    it('Deve dar erro ao buscar usuário por ID', () => {
        cy.buscarUsuarioId().then(res => {
            expect(res.status).to.be.equal(400)
            expect(res.body).to.have.property('message').to.be.equal('Usuário não encontrado')
        cy.validarContrato(res, "get_usuarios_id", 400).then(validacao =>{
            expect(validacao).to.be.equal("Contrato validado!")
            })
        })
    })
    it('Deve editar usuário', () => {
        let body = Factory.UsuarioEdit()
       
        cy.editarUsuario(usuarioId, body).then(res => {
            expect(res.status).to.be.equal(200)
            expect(res.body).to.have.property('message').equal('Registro alterado com sucesso')
        cy.validarContrato(res, 'put_usuarios_id', 200).then(validacao =>{
            expect(validacao).to.be.equal('Contrato validado!')
            })
       })
   })
   it('Deve cadastrar usuário caso não seja encontrato usuário para editar', () =>{
    let usuario = Factory.UsuarioBody()
    let body = Factory.UsuarioEdit()

       cy.editarUsuario(usuario, body).then(res => {
            expect(res.status).to.be.equal(201)
            expect(res.body).to.have.property('message').equal('Cadastro realizado com sucesso')
            expect(res.body).to.have.property('_id')
        cy.validarContrato(res, 'put_usuarios_id', 201).then(validacao =>{
            expect(validacao).to.be.equal('Contrato validado!')
            })
        })
   })
   it('Deve dar erro ao editar usuário com dados já cadastrados', () => {
    let body = Factory.UsuarioExistente()
   
    cy.editarUsuario(usuarioId, body).then(res => {
        expect(res.status).to.be.equal(400)
        expect(res.body).to.have.property('message').equal('Este email já está sendo usado')
    cy.validarContrato(res, 'put_usuarios_id', 400).then(validacao =>{
        expect(validacao).to.be.equal('Contrato validado!')
        })
   })
})
    it('Deve excluir usuário', () => {
        cy.excluirUsuario(usuarioId).then(res =>{
            expect(res.status).to.be.equal(200)
            expect(res.body).to.have.property('message').equal('Registro excluído com sucesso')
        cy.validarContrato(res, 'delete_usuarios_id', 200).then(validacao =>{
            expect(validacao).to.be.equal('Contrato validado!')
            })
        })
    })
    it('Deve dar erro excluir usuário com carrinho cadastrado', () => {
        cy.excluirUsuario().then(res => {
           expect(res.status).to.be.equal(400)  //criar usuario com carrinho cadastrado
            expect(res.body).to.have.property('message').equal('Não é permitido excluir usuário com carrinho cadastrado')
            expect(res.body).to.have.property('idCarrinho')
        cy.validarContrato(res, "delete_usuarios_id", 400).then(validacao =>{
            expect(validacao).to.be.equal("Contrato validado!")
            })
        }) 
    })
})
