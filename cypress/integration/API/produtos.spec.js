/// <reference types="cypress" />

import Factory from "../dynamics/factory.js"

var bearer
var idProduto

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
describe("Testes da rota /produtos", () => {
    describe("Deve efetuar os testes positivos da rota", () => {
        it("Deve cadastrar produto corretamente possuindo status code 201 e exibir propriedade message", () => {

            let produto = Factory.gerarProduto()
    
            cy.cadastrarProduto(bearer, produto).then(res => {
                expect(res.status).to.be.equal(201);
                expect(res.body).has.property("message").equal("Cadastro realizado com sucesso")
                idProduto = res.body._id
            })
        })
        it("Deve buscar produtos e se possui status code 200", () => {
            cy.buscarProdutos().then(res => {
                expect(res.status).to.equal(200)
            })
        })
        it("Deve buscar produto por id e se possui status code 200", () =>{
            cy.buscarProdutoPorId(idProduto).then(res => {
                expect(res.status).to.be.equal(200);
            })
        })
    })
    describe("Deve efetuar os testes negativos da rota", () => {
        it("Deve falhar o cadastro do produto por ser existente, possuindo propriedade message e status code 400", () => {
            let produtoExistente = Factory.produtoExistente(); 
            cy.cadastrarProduto(bearer, produtoExistente).then(res =>{
                expect(res.status).to.be.equal(400);
                expect(res.body).has.property("message").equal("Já existe produto com esse nome")
            })
        })
        it("Deve falhar o cadastro do produto por não possuir nome, possuindo propriedade message e status code 400", () => {
            let produtoSemNome = Factory.produtoNomeBranco()
            cy.cadastrarProduto(bearer, produtoSemNome).then(res =>{
                expect(res.status).to.be.equal(400);
                expect(res.body).has.property("nome").equal("nome não pode ficar em branco")
            })
        })
        it("Deve falhar o cadastro do produto por não possuir descrição, possuindo propriedade message e status code 400", () => {
            let produtoSemDescricao = Factory.produtoSemDescricao();
            cy.cadastrarProduto(bearer, produtoSemDescricao).then(res =>{
                expect(res.status).to.be.equal(400);
                expect(res.body).has.property("descricao").equal("descricao não pode ficar em branco")
            })
        })
        it("Deve falhar o cadastro do produto por não possuir nome, possuindo propriedade message e status code 400", () => {
            let produtoSemNome = Factory.produtoSemNome()
            cy.cadastrarProduto(bearer, produtoSemNome).then(res =>{
                expect(res.status).to.be.equal(400);
                expect(res.body).has.property("nome").equal("nome é obrigatório")
            })
        })
    })
})