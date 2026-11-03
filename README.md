# 🛒 E-commerce Frontend - Teste Técnico Econverse

Este projeto é uma **landing page de e-commerce** desenvolvida como teste técnico para a posição de Front-end Júnior na **Econverse**. O foco foi construir uma interface responsiva, componentizada e fiel ao design aprovado no Figma, consumindo dados de produtos a partir de um ficheiro JSON local (Tentei puxar pelo enviado, deu como não autorizado)

---

## 🚀 Tecnologias e Ferramentas Utilizadas

O projeto foi construído utilizando as ferramentas mais modernas do ecossistema React para garantir performance, organização e facilidade de manutenção:

*   **React (com Vite):** Escolhido pela rapidez no ambiente de desenvolvimento e build leve.
*   **TypeScript:** Para adicionar tipagem estática e garantir maior segurança e previsibilidade no código (interfaces de produtos, props dos componentes).
*   **SCSS (Sass):** Utilizado para estilização. Permite aninhamento de código, uso de variáveis e uma organização muito mais limpa do CSS, mantendo o estilo local para cada componente (`Componente.scss`).
*   **HTML5 Semântico:** Tags como `<section>`, `<article>`, `<header>`, e `<nav>` foram priorizadas para melhorar a acessibilidade e estrutura do código.

---

## ⚙️ Estrutura e Funcionalidades Principais

1.  **Componentização Dinâmica:** A página foi dividida em blocos independentes e reutilizáveis (Header, Categorias, Banner, Vitrine de Produtos, Marcas, Parceiros e Footer).
2.  **Vitrine de Produtos Interativa:**
    *   Filtro local com base em abas (Celular, Acessórios, Tablets, etc.).
    *   Consumo simulado de API através do ficheiro `products.json` localizado na pasta `/public`.
    *   Exibição condicional de mensagem ("Nenhum item foi encontrado") quando uma categoria não possui produtos cadastrados.
    *   Lógica de carrossel dinâmico implementada no React (limitando a exibição no grid e permitindo navegação pelas setas).
3.  **SVGs Inline com React:** Os ícones (como os do Header e das Categorias) foram integrados diretamente no código JSX como variáveis, permitindo a herança de cores no hover via CSS (`fill="currentColor"`).
4.  **Modal de Produto:** Ao clicar num card na vitrine, abre-se um modal interativo com os detalhes do produto e um simulador de contador de quantidade antes de "Comprar".

---

## 📝 Como configurar e adicionar produtos ao JSON

Para que a vitrine de produtos funcione corretamente, o projeto depende do ficheiro de dados simulado.

1.  Aceda à pasta `/public` na raiz do projeto.
2.  Abra (ou crie) o ficheiro `products.json`.
3.  A estrutura **obrigatória** de cada produto dentro do array `"products"` deve conter o atributo `"categoria"`, que fará o match exato com as abas do componente (ex: `"Celular"`, `"Acessorios"`, `"Notebooks"`, etc).

**Exemplo de estrutura JSON esperada:**
```json
{
  "success": true,
  "products": [
    {
      "productName": "Iphone 11 PRO MAX BRANCO",
      "descriptionShort": "Iphone 11 PRO MAX BRANCO 256GB",
      "photo": "[https://url-da-imagem.com/foto.png](https://url-da-imagem.com/foto.png)",
      "price": 8500,
      "categoria": "Celular"
    }
  ]
}