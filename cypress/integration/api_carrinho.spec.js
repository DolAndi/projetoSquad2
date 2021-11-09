/// <reference types="cypress" />

import Factory from '../dynamics/factory'


describe("Teste da rota /login para execução posterior da rota /carrinhos", () => {
    it("Deve validar o login com status code 200 e authorization", () => {
        cy.fixture("loginCredentials").then((user) => {
            cy.logar(user.valido).then( res => {
                expect(res.status).to.equal(200)
                expect(res.body).to.have.property("authorization")
            })
        })
    })
})
describe('Testes na rota /carrinhos e validações de contrato', () => {
    it('Deve listar carrinhos cadastrados', () => {
        cy.listarCarrinhos().then(res => {
            expect(res.status).to.be.equal(200)
            expect(res.body).to.have.property('quantidade')
            expect(res.body).to.have.property('carrinhos')
        cy.validarContrato(res, "get_carrinhos", 200).then(validacao =>{
            expect(validacao).to.be.equal("Contrato validado!")
            }) 
        })
    })
})
