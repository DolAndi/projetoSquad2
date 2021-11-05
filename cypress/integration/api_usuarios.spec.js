/// <reference types="cypress" />

import Factory from '../dynamics/factory'

var usuarioId

describe('Testes na rota /usuarios', () => {
    it('Deve cadastrar um usuário corretamente', () => {
        let usuario = Factory.UsuarioBody()

        cy.cadastrarUsuario(usuario).then( res => {
            expect(res.status).to.be.equal(201)
            expect(res.body).to.have.property('message').to.be.equal('Cadastro realizado com sucesso')
            expect(res.body).to.have.property('_id')
            usuarioId = res.body._id
        })
    })  
    it('Deve dar erro ao cadastrar usuário já cadastrado', () => {
        let usuario = Factory.UsuarioExistente()

        cy.cadastrarUsuario(usuario).then( res => {
            expect(res.status).to.be.equal(400)
            expect(res.body).to.have.property('message').to.be.equal('Este email já está sendo usado')
        })
    })
    it('Deve listar usuários cadastrados', () => {
        cy.listarUsuarios().then(res => {
            expect(res.status).to.be.equal(200)
        })
    })
    it('Deve buscar usuário pelo ID', () => {
        cy.buscarUsuarioId(usuarioId).then(res => {
            expect(res.status).to.be.equal(200)
        })
    })
    it('Deve dar erro ao buscar usuário por ID', () => {
        cy.buscarUsuarioId().then(res => {
            expect(res.status).to.be.equal(400)
            expect(res.body).to.have.property('message').to.be.equal('Usuário não encontrado')
        })
    })
    it('Deve excluir usuario', () => {
        cy.excluirUsuario(usuarioId).then(res =>{
            expect(res.status).to.be.equal(200)
            expect(res.body).to.have.property('message').equal('Registro excluído com sucesso')
        })
    })
})

//fazer a rota para editar usuario
