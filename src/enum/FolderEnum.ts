type FolderEnum<T extends string> = { [name in T]: string }

export const folderEnum: FolderEnum<string> = {
  controller: 'controllers',
  helper: 'helpers',
  router: 'routers',
  model: 'models',
  middleware: 'middlewares',
  main: 'src'
};
