# Server da NeoBIRL

## 📋 Índice

- [Introdução](#introdução)
- [Como Funciona](#como-funciona)
- [Executando o Projeto](#executando-o-projeto)
- [Contribuidores](#contribuidores)


## Introdução

NeoBIRL (Neo-<b>B</b>ambam's "<b>I</b>t's show time" <b>R</b>ecursive <b>L</b>anguage) nada mais é do que uma linguagem humorística, OAG (Orientada a Gambiarra), Go Horse e baseada na semi-falecida <a href="https://github.com/birl-language/" target="_blank">BIRL Language</a>. NeoBIRL funciona do mesmo modo que sua antecessora, mas com algumas funcionalidades a mais. Pretendemos dar continuidade para a linguagem mais TREZE já criada!

## Como funciona

Primeiramente, recebemos uma requisição do cliente com:
- O código (Neo)BIRL;
- Os valores de ENTRADA.

```javascript
{
  code: `
    HORA DO SHOW
      CE QUER VER ESSA PORRA? ("Hello, World! Porra!\n");
      BORA CUMPADE 0;
    BIRL
  `,
  stdin: ""
}
```

Esses valores são enviados para a rota <b>/compile</b> através do método <b>POST</b>.

Após isso, recebemos uma resposta do servidor contendo o stdout (ou "saída do código"):

```json
{
"stdout":"Hello, World! Porra!\n",
"error":null
}
```

O código é traduzido de (Neo)BIRL para C através de uma função de expressões regulares, após a tradução, compilamos o código, o executamos e enviamos a saída ao cliente.

## Executando o Projeto

1. <b>Esteja em um ambiente Unix</b> (MacOS/Linux), a função "exec" executará comandos para ambientes de Unix. Caso esteja usando Windows, se vire e vá instalar um Linux da vida ou modifique o código para que ele rode no Windows. 
2. Tenha o Node.js e o <b>GCC</b> instalados.
```bash 
$ git clone https://github.com/neobirl/server
$ cd server
$ npm install

#Para rodar em modo de desenvolvimento.
$ npm run start:dev

#O servidor estará rodando na porta 3000
```

## Contribuidores

Caso queira contribuir, é só abrir um PR bonitinho e escrever os testes antes.


