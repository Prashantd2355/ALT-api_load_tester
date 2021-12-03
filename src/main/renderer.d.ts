export interface IElectronAPI {
  processData: (isBulk: boolean, reqObj: any) => Promise<any[]>;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}
