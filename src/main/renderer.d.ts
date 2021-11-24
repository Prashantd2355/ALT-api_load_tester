export interface IElectronAPI {
  send: (event, arg) => Promise<void>,
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}
