 export type UserdataType= "job"|"bio"|"email"|"username"|"Phone"|"DateoFbirth"|"Country"|"Address" ;
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

  export  interface IsignupUser {
    type: string;
    name: string;
    id: string;
    label: string;
    validation: {
      required?: boolean | string;
      minLength?: number;
      pattern?: RegExp;
    };
  }
  
  export  interface updateUserData{
    type: string;
    name: UserdataType;
    id: string;
    label: string;
   
  }
  export interface userDetailsT {
    job:string;
    email:string,
    username:string,
    Phone:string,
    DateoFbirth:string,
    Country:string,
    Address:string,
    bio:string;
  }




  