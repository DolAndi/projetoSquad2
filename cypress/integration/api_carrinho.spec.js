/// <reference types="cypress" />

import Factory from '../dynamics/factory'

var bearer

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
describe('Testes na rota /carrinhos', () => {
    let produto = Factory.produtosCarrinho()
    
    it('Deve cadastrar carrinho corretamente', () => {
        cy.criarCarrinho(bearer, produto).then(res =>{
            expect(res.status).to.be.equal(201)
            expect(res.body).to.have.property('message').equal('Cadastro realizado com sucesso')
        })
    })
    it('Deve dar erro ao cadastrar carrinho sem produto', () => {
        cy.criarCarrinho(bearer,produto).then(res => {
            expect(res.status).to.be.equal(400)
            expect(res.body).to.have.property('message').equal('Produto não encontrado')
        })
    })
    it('Deve listar carrinhos cadastrados', () => {
        cy.listarCarrinhos().then(res => {
            expect(res.status).to.be.equal(200)
            expect(res.body).to.have.property('quantidade')
            expect(res.body).to.have.property('carrinhos')
        })
    })
})
