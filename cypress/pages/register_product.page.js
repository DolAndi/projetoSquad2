///<reference types="cypress"/>

import faker from "faker"
import Base from "./base.page";


const INP_NAME = "[data-testid=nome]"
const INP_PRICE = "[data-testid=preco]"
const INP_DESC = "[data-testid=descricao]"
const INP_QTD = "[data-testid=quantity]"
const INP_FILE = "input[type=file]"

const BTN_REGISTER = "[data-testid=cadastarProdutos]"


export default class ServerestRegisterProducts extends Base {
    static cadastrarProdutoAleatório() {
        const product = {
            name: faker.commerce.productName(),
            price: faker.datatype.number(),
            desc: faker.commerce.productDescription(),
            qtd: faker.datatype.number(),
        }
        cy.wrap(product).as("product")

        super.typeValue(INP_NAME, product.name)
        super.typeValue(INP_PRICE, product.price)
        super.typeValue(INP_DESC, product.desc)
        super.typeValue(INP_QTD, product.qtd)
        cy.get(INP_FILE).attachFile("imagem-teste.jpg")
    }

    static clicarBtnCadastrar() {
        super.clickOnElement(BTN_REGISTER)
    }

    static validarProdutoCriado() {
        cy.get('@product').then(product => {
            cy.contains("td", product.name, {matchCase: false}).then($product => {
                cy.get($product).should("be.visible")
                cy.get($product).parent().contains("td", product.name).should("be.visible")
                cy.get($product).parent().contains("td", product.price).should("be.visible")
                cy.get($product).parent().contains("td", product.desc).should("be.visible")
                cy.get($product).parent().contains("td", product.qtd).should("be.visible")
            })
        })
    }

    static acessarProduto(){
        cy.visit("https://front.serverest.dev/admin/cadastrarprodutos")
    }
}