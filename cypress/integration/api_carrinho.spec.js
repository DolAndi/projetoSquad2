/// <reference types="cypress" />

import Factory from '../dynamics/factory'

var bearer

describe("Teste da rota /login para execução posterior da rota /produtos", () => {
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

describe('Testes na rota /carrinhho', () => {
    it('Deve cadastrar carrinho corretamente', () => {
        let carrinho = Factory.gerarCarrinho
        cy.cadastrarCarrinho(bearer, carrinho).then(res =>{
            expect(res.status).to.be.equal(201)
            expect(res.body).to.have.property('message').equal('Cadastro realizado com sucesso')
        })
    })
})