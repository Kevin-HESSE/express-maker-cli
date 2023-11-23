import { exit } from 'process';

/**
 * Abort the programm when the command `ctrl + c` as been invoked.
 */
export function exitCommand(): void{
  console.log(`Aborting action !`);
  exit(1);
}

export default class onCancel {
}