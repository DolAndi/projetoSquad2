import faker from "faker"

export default class factory{
    
    static UsuarioBody(){
        return{
            "nome": `${faker.name.firstName()} ${faker.name.lastName()}`,
            "email": `${faker.internet.email()}`,
            "password": faker.internet.password(),
            "administrador": "true"
        }
    }
    static UsuarioSemAdmin(){
        return{
            "nome": `${faker.name.firstName()} ${faker.name.lastName()}`,
            "email": `${faker.internet.email()}`,
            "password": `${faker.internet.password()}`,
            "administrador": "false"
        }
    }
    static UsuarioExistente(){
        return {
            "nome": "Fulano da Silva",
            "email": "beltrano@qa.com.br",
            "password": "teste",
            "administrador": "true"
        }
    }
    static gerarProduto() {
        return {
        "nome": `${faker.commerce.product()} ${faker.commerce.color()} ${faker.commerce.productAdjective()}`,
        "preco": faker.commerce.price,
        "descricao": faker.commerce.productDescription(),
        "quantidade": faker.datatype.number(),
        }
    }
    static produtoExistente() {
        return  {
            "nome": "Logitech MX Vertical",
            "preco": 470,
            "descricao": "Mouse",
            "quantidade": 381
          }
    }
    static produtoNomeBranco() {
        return  {
            "nome": "",
            "preco": 470,
            "descricao": "Mouse",
            "quantidade": 381
          }
    }
    static produtoSemNome(){
        return  {
            "preco": 470,
            "descricao": "asdasd",
            "quantidade": 381
          }
    }
    static produtoSemDescricao() {
        return  {
            "nome": "Logitech MX Vertical",
            "preco": 470,
            "descricao": "",
            "quantidade": 381
          }
    }
}