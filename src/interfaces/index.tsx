 export interface Isignup {
    username:string;
    Email:string;
    password:string;
    
}
export interface IErrorResponse {
    error: {
      details?: {
        errors: {
          message: string;
        }[];
      };
      message?: string;
    };
  }
  export interface ITodo {
    id: number;
    todo: string;
    description: string;
  }