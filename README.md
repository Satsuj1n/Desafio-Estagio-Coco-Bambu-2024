# Projeto Dev Full Stack 2024 - Biblioteca de Livros

Este é um projeto desenvolvido como parte do Desafio Dev Full Stack 2024 para estágio, que tem como objetivo criar uma aplicação para explorar uma coleção de livros, utilizando a API pública do Google Books. A aplicação permite aos usuários buscar livros, favoritar, adicionar notas pessoais, avaliações e tags, além de gerenciar essa lista de favoritos e realizar filtragens.

## Funcionalidades

- **Busca de Livros**: Permite buscar livros por título ou autor utilizando a Google Books API.
- **Informações dos Livros**: Para cada livro, são exibidos título, autor(es), descrição e capa.
- **Favoritar Livros**: Usuários podem favoritar livros, adicionando-os à lista de favoritos.
- **Adicionar Notas, Avaliações e Tags**: Para os livros favoritados, o usuário pode adicionar notas pessoais, dar uma avaliação (nota de 1 a 5) e incluir tags personalizadas.
- **Gerenciamento de Favoritos**: Permite a edição das notas e avaliação dos livros favoritados.
- **Filtros**: Os favoritos podem ser filtrados por tags e ordenados de acordo com a avaliação ou número de notas e tags.
- **Buscar nos Favoritos**: Permite buscar livros dentro da lista de favoritos por tag, anotações ou título.

## Como Executar o Projeto

### Pré-requisitos

- Node.js (versão 14 ou superior)
- Angular CLI (versão 12 ou superior)
- Git

### Passos para Execução

1. Clone o repositório:

```bash
git clone https://github.com/Satsuj1n/Desafio-Estagio-Coco-Bambu-2024
```

2. Navegue até o diretório do projeto:

```bash
cd Desafio-Estagio-Coco-Bambu-2024
```

3. Instale as dependências do projeto:

```bash
npm install
```

4. Execute a aplicação localmente:

```bash
npm start
```

A aplicação estará disponível no endereço [http://localhost:4200/](http://localhost:4200/).

## Scripts Disponíveis

- **Iniciar o projeto**: `npm start`
- **Testar o projeto**: `npm test`
- **Build de produção**: `npm run build`

## Estrutura do Projeto

- `src/app/components`: Contém os componentes principais da aplicação, como a barra de navegação, cards de livros, barra de busca, etc.
- `src/app/services`: Contém os serviços responsáveis por buscar dados da API do Google Books e gerenciar os favoritos.
- `src/app/models`: Modelos para estruturação dos dados dos livros e notas.

## Testes

Os testes foram implementados utilizando Jasmine e Karma. Para rodar os testes, execute:

```bash
npm test
```

## Como Contribuir

1. Faça um fork do projeto.
2. Crie uma branch para sua feature:

```bash
git checkout -b minha-feature
```

3. Commit suas mudanças:

```bash
git commit -m 'Minha nova feature'
```

4. Faça o push para a branch:

```bash
git push origin minha-feature
```

5. Abra um Pull Request no repositório original.

## Critérios de Aceitação

- Busca por título ou autor.
- Favoritar livros e adicionar notas, avaliações e tags.
- Filtros aplicados corretamente na lista de favoritos.
- Testes unitários implementados.

## Tecnologias Utilizadas

- Angular
- Google Books API
- RxJS
- Jasmine & Karma (para testes unitários)
- PrimeNG

## Melhorias

- Implementado paginação nas buscas de livros.
- Responsividade em dispositivos móveis.
- Otimizar a performance ao carregar muitos favoritos.
- Implementação de filtros extras que contribuem para a experiência do usuário.
- Página em SPA (Single Page Application) para uma navegação mais fluida.

---

Este projeto foi desenvolvido como parte do Desafio Dev Full Stack 2024 para o processo seletivo da Coco Bambu.
