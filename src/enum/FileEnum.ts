type FileEnum<T extends string> = { [name in T]: string }

export const filesEnum: FileEnum<string> = {
  controller: 'Controller',
  helper: 'Helper',
  router: 'Router',
  model: 'Model',
  index: 'Index',
  configuration: 'Configuration'
};