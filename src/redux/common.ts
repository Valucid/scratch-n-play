export type BlockType<DataType = any> = {
    loading: boolean;
    error?: string;
    data?: DataType;
    success: boolean;
    meta?: IMetaData;
  };

  export type ScratchBlockType<DataType = any> = {
    loading: boolean;
    error?: string;
    data?: DataType;
    success: boolean;
    meta?: IMetaData;
  };
  
  export interface IServerResponseType<DataType = any> {
    success: boolean;
    message: string;
    data: DataType;
    meta?: IMetaData;
  }
  
  export const block = {
    loading: false,
    error: '',
    success: false,
    scratchValue: undefined,
    meta: undefined,
  };
  
  export interface IMetaData {
    page: number;
    pages: number;
    total: number;
  }
  
  export interface IAuthState {
    data?: IServerResponseType | null;
    isLoggedIn: boolean;
    loading: boolean;
    error?: string | null;
    success: boolean;
  }
