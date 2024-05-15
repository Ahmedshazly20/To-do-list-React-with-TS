import React, { ChangeEvent, useState } from 'react'
import MyModal from './Modal'
import Input from './ui/input';
import Textarea from './ui/Textarea';
import InputErrorMessage from './ui/InputErrorMessage';
import { yupResolver } from '@hookform/resolvers/yup';
import { UpdateTodo } from '../validation';
import { ITodo } from '../interfaces';
import { SubmitHandler, useForm } from 'react-hook-form';
import axiosInstance from './../config/axios.config';
import { toast } from 'react-hot-toast';
import { addTodoInputstyle } from './../typs/Style';

interface ITodoAdd{
    todo: string,
    description: string,
   } 
  

export default function AddTodo() {
    const [openaddTodo ,setopenaddTodo] =useState(false)
    const [NewTodo ,setNewTodo] =useState<ITodo>({
        id: 0,
        todo: "",
        description: "",
      });
      const storgeKey ="LoggedinUser"
      const userDataString= localStorage.getItem(storgeKey)
      const userData = userDataString ? JSON.parse(userDataString) : null;
      

 const isCloseEdit =()=>{
        setopenaddTodo(false)}


 const onChangeHandler = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

    const { value, name } = evt.target;
    setNewTodo({ ...NewTodo, [name]: value });
};

          
          
const { register, handleSubmit,formState:{errors} } = useForm<ITodoAdd>({
     resolver: yupResolver(UpdateTodo),
})
          

          const EditSubmit: SubmitHandler<ITodoAdd> = async () =>{
  
            const { todo, description } = NewTodo;
          
             try{
              const {status } = await axiosInstance.post(`/todos/`, {
                data:{ todo, description }},
                {
                  headers: {
                    Authorization: `Bearer ${userData.jwt}`,
                  },
                }
                )
             }catch{(err: any)=>
              console.log(err)
          
             }
          
             if(status =200){
                isCloseEdit()
              toast.success("Todo has added", {
                position: 'top-center',
                duration: 2500,
                icon: '👏',
              }); }}     

  return (
    <div className=' mt-4 container '>
        <div className='flex items-center justify-center'>
          <button className='bg-[#4A3AFF] text-white px-6 py-1 rounded' onClick={()=>setopenaddTodo(true)}>AddTodo</button>

          <MyModal closeModal={isCloseEdit} isOpen={openaddTodo}  title='Add new todo'>
          <form className="space-y-3" onSubmit={handleSubmit(EditSubmit)}>

                <div className="flex items-center flex-col  ">
                    <label className='text-lg font-semibold '>Todo title</label>
                <Input   className={`${addTodoInputstyle}`} {...register("todo")}  name="todo"     onChange={onChangeHandler}/>
                {errors["todo"] && <InputErrorMessage msg={errors["todo"]?.message} />}
                <label className=' mt-1'>Todo description</label>
                <Textarea  
                    {...register("description")} 
                    name="description"
                  
                    onChange={onChangeHandler}/>
                </div>

                <div className="flex items-center space-x-3">
                <button type='submit' className="bg-indigo-600 py-1 px-3 rounded hover:bg-indigo-800 text-white">Add todo</button>
                <button type='button' className="bg-gray-300  py-1 px-3 rounded hover:bg-gray-400" onClick={isCloseEdit}>Cancel</button>
                </div>
         </form>

          </MyModal>
        </div>
        
        
        </div>
  )
}
