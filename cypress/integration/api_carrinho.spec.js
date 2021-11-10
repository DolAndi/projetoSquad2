/// <reference types="cypress" />

import Factory from '../dynamics/factory'

var bearer
var carrinhoId
describe("Teste da rota /login para execução posterior da rota /carrinhos", () => {
    it("Deve validar o login com status code 200 e authorization", () => {
        cy.fixture("loginCredentials").then((user) => {
            cy.logar(user.valido).then( res => {
                expect(res.status).to.equal(200)
                expect(res.body).to.have.property("authorization")
                bearer = res.body.authorization
            })
        })
    })
})

describe("Testes na rota /carrinhos e validações de contrato", () => {
    describe('Testes na rota /carrinhos', () => {
        let produto = Factory.produtosCarrinho()
        
        it('Deve cadastrar carrinho corretamente', () => {
            cy.criarCarrinho(bearer,produto).then(res =>{
                expect(res.status).to.be.equal(201)
                expect(res.body).to.have.property('message').equal('Cadastro realizado com sucesso')
                carrinhoId = res.body._id
            })
        })
        it('Deve dar erro ao cadastrar mais de um carrinho para o mesmo usuário', () => {
            cy.criarCarrinho(bearer,produto).then(res => {
                expect(res.status).to.be.equal(400)
                expect(res.body).to.have.property('message').equal('Não é permitido ter mais de 1 carrinho')
            })
        })
        it("Deve listar carrinhos cadastrados possuindo status code 200 e propriedade 'quantidade' e 'carrinhos'", () => {
            cy.listarCarrinhos().then(res => {
                expect(res.status).to.be.equal(200)
                expect(res.body).to.have.property("quantidade")
                expect(res.body).to.have.property("carrinhos")
            })
        })
        it('Deve excluir carrinho e concluir compra', () => {
            cy.excluirCarrinho(carrinhoId, bearer).then(res => {
                expect(res.status).to.be.equal(200)
                expect(res.body).to.have.property('message').equal('')
            })
        })
    })
})

//após cadastrar usuário puxar um email e password para login (sempre mudando)
