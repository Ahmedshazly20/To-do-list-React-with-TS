export interface Isignup {
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


export const Signuptype:Isignup[] =[
{
    type :'text',
    name:'username',
    id: "username",
    label: "username",
    validation: {
        required: "username is required",
        minLength: 5,
      },

},
{
    type :'text',
    name:'email',
    id: "email",
    label: "Email",
    validation: {
        required:"Email is required",
        pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
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
}];

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
    