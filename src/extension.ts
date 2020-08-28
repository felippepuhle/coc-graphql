import {
  ExtensionContext,
  OutputChannel,
  LanguageClient,
  ServerOptions,
  LanguageClientOptions,
  TransportKind,
  services,
  workspace,
  RevealOutputChannelOn,
} from 'coc.nvim'

export async function activate(context: ExtensionContext): Promise<void> {
  let outputChannel: OutputChannel = workspace.createOutputChannel(
    'GraphQL Language Server'
  )
  const config = workspace.getConfiguration('coc-graphql')
  const debug: boolean = config.get('debug')

  const serverModule = context.asAbsolutePath('./lib/server.js')

  const debugOptions = {
    execArgv: ['--nolazy', '--inspect=localhost:6009'],
  }

  let serverOptions: ServerOptions = {
    run: {
      module: serverModule,
      transport: TransportKind.ipc,
    },
    debug: {
      module: serverModule,
      transport: TransportKind.ipc,
      options: { ...(debug ? debugOptions : {}) },
    },
  }

  let clientOptions: LanguageClientOptions = {
    documentSelector: [
      { scheme: 'file', language: 'graphql' },
      { scheme: 'file', language: 'javascript' },
      { scheme: 'file', language: 'javascriptreact' },
      { scheme: 'file', language: 'typescript' },
      { scheme: 'file', language: 'typescriptreact' },
    ],
    synchronize: {
      fileEvents: workspace.createFileSystemWatcher(
        '**/*.{graphql,gql,js,jsx,ts,tsx}'
      ),
    },
    outputChannel,
    outputChannelName: 'GraphQL Language Server',
    revealOutputChannelOn: RevealOutputChannelOn.Never,
  }

  let client = new LanguageClient(
    'coc-graphql',
    'GraphQL Language Server',
    serverOptions,
    clientOptions,
    debug
  )

  context.subscriptions.push(services.registLanguageClient(client))
}
