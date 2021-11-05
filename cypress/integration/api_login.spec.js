/// <reference types="cypress" />

var bearer

describe("Testes da rota /login", () => {
    describe("Deve efetuar os testes positivos da rota", () => {
        it("Deve validar o login com status code 200 e authorization", () => {
            cy.fixture("loginCredentials").then((user) => {
                cy.logar(user.valido).then( res => {
                    expect(res.status).to.equal(200)
                    expect(res.body).to.have.property("authorization")
                    bearer = res.body.authorization
                })
            })
        })
        it("Deve realizar teste de contrato sobre a requisição POST /login", () =>{
            cy.fixture("loginCredentials").then(user => {
                cy.logar(user.valido).then(res => {
                    expect(res.status).to.be.equal(200);
                cy.validarContrato(res, "post_login", 200).then(validacao =>{
                    expect(validacao).to.be.equal("Contrato validado!")
                })  })
            })
        })  
    })
    describe("Deve efetuar testes negativos da rota", () => {
        it("Deve efetuar uma falha em que o campo email não pode ficar em branco e status code 400", () => {
            cy.fixture("loginCredentials").then((user) => {
                cy.logar(user.emailEmBranco).then(res => {
                    expect(res.status).to.be.equal(400);
                    expect(res.body).has.property("email").to.be.equal("email não pode ficar em branco")
                })
            })
        })
        it("Deve efetuar uma falha em que o campo email é obrigatório e status code 400", () => {
            cy.fixture("loginCredentials").then((user) => {
                cy.logar(user.semCampoEmail).then(res => {
                    expect(res.status).to.be.equal(400);
                    expect(res.body).has.property("email").to.be.equal("email é obrigatório")
                })
            })
        })
        it("Deve efetuar uma falha em que o campo senha(password) não pode ficar em branco e status code 400", () => {
            cy.fixture("loginCredentials").then((user) => {
                cy.logar(user.senhaEmBranco).then(res => {
                    expect(res.status).to.be.equal(400);
                    expect(res.body).has.property('password').to.be.equal("password não pode ficar em branco")
                })
            })
        })
        it("Deve efetuar uma falha em que o campo senha(password) é obrigatório e status code 400", () => {
            cy.fixture("loginCredentials").then((user) => {
                cy.logar(user.semCampoSenha).then(res => {
                    expect(res.status).to.be.equal(400);
                    expect(res.body).has.property("password").to.be.equal("password é obrigatório")
                })
            })
        })
        it("Deve efetuar falha em que os todos os campos são vazios, e status code 400", () => {
            cy.fixture("loginCredentials").then((user) => {
                cy.logar(user.semCampos).then(res =>{
                    expect(res.status).to.be.equal(400);
                    expect(res.body).has.property('password').to.be.equal('password é obrigatório')
                    expect(res.body).has.property('email').to.be.equal('email é obrigatório')
               })
            })
        })
    })
})