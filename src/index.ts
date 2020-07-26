import {
  ExtensionContext,
  LanguageClient,
  ServerOptions,
  LanguageClientOptions,
  TransportKind,
  services,
  workspace,
} from 'coc.nvim'

const EXTENSION_ID = 'graphql'

export async function activate(context: ExtensionContext): Promise<void> {
  const { subscriptions } = context

  const config = workspace.getConfiguration(EXTENSION_ID)
  const debug: boolean = config.get('debug')
  const filetypes: string[] = config.get('filetypes')
  const watcherPattern: string = config.get('watcherPattern')

  const serverModule = context.asAbsolutePath('./lib/server.js')

  let serverOptions: ServerOptions = {
    run: {
      module: serverModule,
      transport: TransportKind.ipc,
    },
    debug: {
      module: serverModule,
      transport: TransportKind.ipc,
      options: {
        execArgv: ['--nolazy', '--inspect=localhost:6009'],
      },
    },
  }

  let clientOptions: LanguageClientOptions = {
    documentSelector: filetypes.map((filetype) => ({
      language: filetype,
      scheme: 'file',
    })),
    synchronize: {
      fileEvents: workspace.createFileSystemWatcher(watcherPattern),
    },
    outputChannel: workspace.createOutputChannel(EXTENSION_ID),
    outputChannelName: EXTENSION_ID,
  }

  let client = new LanguageClient(
    EXTENSION_ID,
    serverOptions,
    clientOptions,
    debug
  )

  subscriptions.push(services.registLanguageClient(client))
}
