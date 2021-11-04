/// <reference types="cypress" />

import Ajv from "ajv"
const ajv = new Ajv({allErrors: true, verbose: true, strict: false})

//LOGIN
Cypress.Commands.add("logar", usuario => {
    return cy.request({
        method: "POST",
        url: `${Cypress.env("base_url")}/login`,
        failOnStatusCode: false,
        body: usuario
    })
})

//USUÁRIO
Cypress.Commands.add('cadastrarUsuario', (usuario) =>{
    return cy.request({
        method: 'POST',
        url: `${Cypress.env('base_url')}/usuarios`,
        failOnStatusCode: false,
        body: usuario
    })
})
Cypress.Commands.add('listarUsuarios', (usuario) =>{
    return cy.request({
        method: 'GET',
        url: `${Cypress.env('base_url')}/usuarios`,
        failOnStatusCode: false,
        body: usuario
    })
})
Cypress.Commands.add('buscarUsuarioId', (id) => {
    return cy.request({
        method: 'GET',
        url: `${Cypress.env('base_url')}/usuarios/${id}`,
        failOnStatusCode: false,
    })
})
Cypress.Commands.add('editarUsuario', (id) => {
    return cy.request({
        method: 'PUT',
        url: `${Cypress.env('base_url')}/usuarios/${id}`,
        failOnStatusCode: false,
    })
})

//PRODUTO
Cypress.Commands.add("cadastrarProduto", (bearer, produto) =>{
    return cy.request({
        method: "POST",
        url: `${Cypress.env("base_url")}/produtos`,
        failOnStatusCode: false,
        body: produto,
          headers: {Authorization: bearer}
    })
})

Cypress.Commands.add("buscarProdutos", () =>{
    return cy.request({
        method: "GET",
        url: `${Cypress.env("base_url")}/produtos`,
        failOnStatusCode: false
    })
})

Cypress.Commands.add("buscarProdutoId", (id) =>{
    return cy.request({
        method: "GET",
        url: `${Cypress.env("base_url")}/produtos/${id}`,
        failOnStatusCode: false
    })
})

Cypress.Commands.add("buscarProdutoPorId", (id) =>{
    return cy.request({
        method: "GET",
        url: `${Cypress.env("base_url")}/produtos/${id}`,
        failOnStatusCode: false
    })
})