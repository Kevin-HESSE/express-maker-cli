type FolderEnum<T extends string> = { [name in T]: string }

export const folderEnum: FolderEnum<string> = {
  controller: 'controllers',
  test: 'controllers/__test__',
  helper: 'helpers',
  router: 'routers',
  model: 'models',
  middleware: 'middlewares',
  main: 'src'
};
