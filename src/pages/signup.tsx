import React,{useState,ChangeEvent} from 'react'
import { IErrorResponse } from '../interfaces';
import loginpng from '../assets/loginpng.png';
import {Signuptype} from '../typs/index'
import {SignupInputstyle} from '../typs/Style'
import Button from '../component/ui/Button';
import Input from '../component/ui/input';
import { useForm, SubmitHandler } from "react-hook-form"
import InputErrorMessage from '../component/ui/InputErrorMessage';
import { yupResolver } from "@hookform/resolvers/yup"
import { registerSchema } from '../validation';
import axiosInstance from '../config/axios.config';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

interface IFormInput {
  username: string;
  email: string;
  password: string;
}
function Signup() {
  const Navigate =useNavigate()
  const [isLoading, setIsLoading] = useState(false); 



  
 const { register, handleSubmit,formState:{errors} } = useForm<IFormInput>({resolver:yupResolver(registerSchema)})
 
  const onSubmit: SubmitHandler<IFormInput> = async data=>{
    
   
    try{
      setIsLoading(true);
     const {status} =   await axiosInstance.post("/auth/local/register",data,)

     if (status === 200) {
      toast.success("Congratulations on becoming a part of our community!  ", {
        position: 'top-center',
        duration: 2500,
        icon: '🎉',
      });

      setTimeout(() => {
        Navigate("/login");
      }, 2000);
    }
     
     }catch(errors){
     
 
     }
      
     finally{
      setIsLoading(false);
     }
    
  
  } 
   
   
   

    
const renderinput= Signuptype.map(({name,type,id,label,validation})=><div className='flex flex-col' key={id}>
              <label className='ml-5 text-[18px] text-[#121212a3]'>{label}</label>
                <Input type={type} {...register(name,validation)}    className={`${SignupInputstyle}`}  placeholder={label} />
                {errors[name] && <InputErrorMessage msg={errors[name]?.message} />}
                </div>
                ) 
    
  return (
    <div className="container mx-auto  bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
         <div className="grid grid-cols-12 gap-1">
             <div className='flex  justify-start items-center  col-span-5  flex-col'>
             <div> 
                <h3 className='text-[34px] w-full font-[700] font-DM Sans text-center'>Signup</h3>
                <p>Join us and get your tasks done ✅</p>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className=' mt-6 w-full '>
                 {renderinput}
                
                <Button isLoading={isLoading} name={isLoading ? "Loading... " : "Register"} />
                {/* <button type='submit' className='w-full mr-2 bg-[#4A3AFF] mt-3 font-DM Sans text-white  font-[18px] px-4 placeholder:px-2  shadow-[0_px_8px_20px_#4a3aff42 ] focus:outline-none rounded-[46px] py-[18px] w-100 border-solid border-2 border-[#F3F1FF]'>Signup</button> */}
              </form>
              
              <p className='mt-4 ml-3 text-[#6F6C90] '>or <a href='#' className='text-[#4A3AFF] mr-2'>Login</a></p>
              </div>
             <div className='bg-[#F3F1FF] flex col-span-7 justify-center'>
              <img src={loginpng}/>
              </div> 
</div>
    </div>
  )
}


export default Signup