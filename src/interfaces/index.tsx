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