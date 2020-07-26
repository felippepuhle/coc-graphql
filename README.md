# coc-graphql

[GraphQL Language Service](https://github.com/graphql/graphiql) extension for [coc.nvim](https://github.com/neoclide/coc.nvim).


## Install

1. Add [vim-graphql](https://github.com/jparise/vim-graphql)

2. In your vim/neovim, run command:

   ```
   :CocInstall coc-graphql
   ```

3. Add a valid [graphql-config](https://github.com/kamilkisiela/graphql-config) file in the project root.


## Configuration options

- `graphql.debug` - (default: `false`)
- `graphql.filetypes` - (default: `['graphql', 'javascript', 'javascriptreact', 'typescript', 'typescriptreact', 'reason']`)
- `graphql.watcherPattern` - (default: `"**/*.{graphql,gql,js,jsx,ts,tsx,re}"`)

## License

MIT
