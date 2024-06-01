// import { Isignup } from "../interfaces";
import {IsignupUser,updateUserData} from "../interfaces"
  export const Signuptype:IsignupUser[] = [
    {
      type: 'text',
      name: 'username',
      id: 'username',
      label: 'Username',
      validation: {
        required: 'Username is required',
        minLength: 5,
      },
    },
    {
      type: 'text',
      name: 'email',
      id: 'email',
      label: 'Email',
      validation: {
        required: 'Email is required',
        pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
      },
    },
    {
      type: 'password',
      name: 'password',
      id: 'password',
      label: 'Password',
      validation: {
        required: 'Password is required',
        minLength: 6,
      },
    },
  ];
  



export const Logintype =[
    {
        type :'text',
        name:'identifier',
        id: "username",
        label: "Email",
        validation: {
            required: "Email is required",
            minLength: 5,
          },
    
    },
    {
        type :'password',
        name:'password',
        id: "password",
        label: "password",
        validation: {
            required: "password is required",
            minLength: 6,
          },
    }]
    

export const EditUserData:updateUserData[] =[
        {
            type :'text',
            name:'username',
            id: "username",
            label: "name",
        },
        {
            type :'text',
            name:'job',
            id: "job",
            label: "Job",
           
        
        },
        {
            type :'text',
            name:'Phone',
            id: "Phone",
            label: "Phone",
        }, 
        {
            type :'text',
            name:'Address',
            id: "Address",
            label: "Address",
           
        
        },
        {
            type :'text',
            name:'Country',
            id: "Country",
            label: "Country",
           
        
        },
        {
          type :'text',
          name:'email',
          id: "email",
          label: "email",
         
      
      },
      {
        type :'text',
        name:'bio',
        id: "bio",
        label: "Bio",
       
    
    }
    ];
    