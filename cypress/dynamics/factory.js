
import faker from "faker"

export default class Factory {
    
    static gerarProduto() {

        return {
            "nome": `${faker.commerce.product} ${faker.commerce.color()}`,
            "preco": 920,
            "descricao": "produto valioso",
            "quantidade": 20
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