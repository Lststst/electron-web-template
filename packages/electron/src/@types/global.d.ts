declare module "*.json" {
  const value: any;
  export default value;
}

declare namespace NodeJS {
  interface ProcessEnv {
    readonly webDevPort?: string
  }

  interface Process {
    electronApp: import('node:child_process').ChildProcess
  }
}