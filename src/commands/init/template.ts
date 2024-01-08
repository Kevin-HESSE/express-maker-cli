import { Template } from './interface';

export const templates: Template[] = [
  {
    name: 'api-js',
    userConfiguration : {
      hasViewEngine: false,
      isApiRest: true,
      defaultPort: 3000,
      useTypescript: false,
      packageManager: 'npm',
      useTest: true
    }
  },
  {
    name: 'api-ts',
    userConfiguration : {
      hasViewEngine: false,
      isApiRest: true,
      defaultPort: 3000,
      useTypescript: true,
      packageManager: 'npm',
      useTest: true
    }
  },
]