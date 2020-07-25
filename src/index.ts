import { ExtensionContext, LanguageClient, ServerOptions, LanguageClientOptions, TransportKind, services, workspace } from 'coc.nvim'

const EXTENSION_ID = 'coc-graphql'
const EXTENSION_NAME = 'graphql'

export async function activate(context: ExtensionContext): Promise<void> {
  const { subscriptions } = context

  const serverModule = context.asAbsolutePath('./lib/server.js')

  let serverOptions: ServerOptions = {
    run: {
      module: serverModule,
      transport: TransportKind.ipc
    },
    debug: {
      module: serverModule,
      transport: TransportKind.ipc
    }
  }

  let clientOptions: LanguageClientOptions = {
    documentSelector: [
      { scheme: 'file', language: 'graphql' },
      { scheme: 'file', language: 'javascript' },
      { scheme: 'file', language: 'javascriptreact' },
      { scheme: 'file', language: 'typescript' },
      { scheme: 'file', language: 'typescriptreact' }
    ],
    synchronize: {
      fileEvents: workspace.createFileSystemWatcher(
        '**/*.{graphql,gql,js,jsx,ts,tsx}'
      )
    },
    outputChannel: workspace.createOutputChannel(
      EXTENSION_NAME
    ),
    outputChannelName: EXTENSION_NAME
  };


  let client = new LanguageClient(
    EXTENSION_ID,
    EXTENSION_NAME,
    serverOptions,
    clientOptions,
  )

  subscriptions.push(
    services.registLanguageClient(client)
  )
}
