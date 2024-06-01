import React,{useState,ChangeEvent, useEffect} from 'react'
import loginpng from '../assets/loginpng.png';
import {Logintype} from '../typs/index'
import {SignupInputstyle} from '../typs/Style'
import Button from '../component/ui/Button';
import { useForm, SubmitHandler } from "react-hook-form"
import InputErrorMessage from '../component/ui/InputErrorMessage';
import Input from '../component/ui/input';
import axiosInstance from '../config/axios.config';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../validation';
import { AxiosError } from 'axios';
import { IErrorResponse } from '../interfaces';
import { toast } from 'react-hot-toast';

// New import here !!


const LoginPageandsignup = () => {
  interface IFormInput {
    identifier: string;
    password: string;
  }



  const [isLoading, setIsLoading] = useState(false); 
  const { register, handleSubmit,formState:{errors} } = useForm<IFormInput>({resolver:yupResolver(loginSchema)})
 
  const onSubmit: SubmitHandler<IFormInput> = async data=>{
    
    try{
      setIsLoading(true);
     const {status , data:userdata} =   await axiosInstance.post("/auth/local",data);
     if (status === 200) {
      toast.success("You will navigate to the home page after 2 seconds.", {
        position: 'top-center',
        duration: 2500,
        icon: '👏',
      });
      
      localStorage.setItem("LoggedinUser",JSON.stringify(userdata))
      setTimeout(() => {
        location.replace('/');
      }, 2500);
      
       
     }
     
     }catch(errors){
      const errorobj = errors as AxiosError<IErrorResponse>
      
      toast.error(`${errorobj.response?.data.error.message}`, {
        position: "bottom-center",
        duration: 2500,
      });
   
     }
      
     finally{
      setIsLoading(false);
     }
    
  
  } 
   
   console.log(errors);
   
 

  const renderinput= Logintype.map(({name,type,id,label,validation})=><div className='flex flex-col' key={id}>
  <label className='ml-5 text-[18px] text-[#121212a3]'>{label}</label>
    <Input type={type} {...register(name,validation)}    className={`${SignupInputstyle}`}  placeholder={label} />
    {errors[name] && <InputErrorMessage msg={errors[name]?.message} />}
    </div>
    ) 
  

    const notify = () => toast('Here is your toast.');

  return (
    <div className="container mx-auto mt-0  bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div className="grid  grid-cols-12 gap-1">
        <div className='flex  justify-start  col-span-5 flex-col'>
         <div> 
           <h3 className='text-[34px] font-[700] font-DM Sans'>Sign in</h3>
           <p>Lorem ipsum dolor sit ame consectetur emet</p>

         </div>
         
        
         <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col mt-6  '>
          {renderinput}
           <Button isLoading={isLoading} name='Login'/>
         </form>
         <p className='mt-4 ml-3 text-[#6F6C90] '><a href='#'>Forgot your password? </a>  </p>
         <p className='h-[2px] w-[390px] mt-8 bg-[#EFF0F6] relative'><span className='absolute'>or</span> </p>
         </div>
        <div className='bg-[#F3F1FF] flex  col-span-7  justify-center'>
         <img src={loginpng}/>
         </div> 
</div>
</div>
  );
};

export default LoginPageandsignup;
