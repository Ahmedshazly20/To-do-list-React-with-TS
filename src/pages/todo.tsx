import React, { useEffect ,useState,ChangeEvent, TextareaHTMLAttributes, ChangeEventHandler, FormEvent} from 'react'
import axiosInstance from './../config/axios.config';
import  {useQuery}  from '@tanstack/react-query';
import useCustomQuery from './../hooks/useCustomQuery';
import Modal from './../component/Modal';
import Input from '../component/ui/input';
import MyModal from './../component/Modal';
import { EditTodoInputstyle } from '../typs/Style';
import { ITodo } from '../interfaces';
import Textarea from '../component/ui/Textarea';
import { useForm,SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {  UpdateTodo } from '../validation';
import InputErrorMessage from '../component/ui/InputErrorMessage';
import { toast } from 'react-hot-toast';
import AddTodo from './../component/AddTodo';
import Paginator from '../component/ui/Pagnator';






function Todolist() {
 
 interface ITodoAdd{
  todo: string,
  description: string,
 } 





const storgeKey ="LoggedinUser"
const userDataString= localStorage.getItem(storgeKey)
const userData = userDataString ? JSON.parse(userDataString) : null;
const [todoToEdit, setTodoToEdit] = useState<ITodo>({
  id: 0,
  todo: "",
  description: "",
});
const [isOpen, setisOpen]= useState(false)
const [queryVersion, setQueryVersion] = useState(1);
const [isOpenRemove, setisOpenRemove]= useState(false)
const {data ,isLoading }=useCustomQuery({
  queryKey:["todos" ,`${queryVersion}`],  
  url:"/users/me?populate=todos",
  config:{headers:{Authorization:`bearer ${userData.jwt}`} }

})



const isCloseEdit = ()=>{
  setisOpen(false);
}
const onCancel = () => {
  setTodoToEdit({
    id: 0,
    todo: "",
  description: "",
  });
  setisOpen(false);
};


   
 const onChangeHandler = (
  evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  const { value, name } = evt.target;
  setTodoToEdit({ ...todoToEdit, [name]: value });
};


const { register, handleSubmit,formState:{errors} } = useForm<ITodoAdd>({
  resolver: yupResolver(UpdateTodo),
})


const EditSubmit: SubmitHandler<ITodoAdd> = async () =>{
  
  const { todo, description } = todoToEdit;

   try{
    const {status } = await axiosInstance.put(`/todos/${todoToEdit.id}`, {
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
    setQueryVersion((prev) => prev + 1);
    onCancel()
    toast.success("Todo has updated", {
      position: 'top-center',
      duration: 2500,
      icon: '👏',
    }); }}

const handleRemove = async (evt:FormEvent<HTMLFormElement>)=>{
  evt.preventDefault();
try{
  const {status} = await axiosInstance.delete(`/todos/${todoToEdit.id}`,
  {
    headers: {
      Authorization: `Bearer ${userData.jwt}`,
    },
  } )}catch (error) {
      console.log(error);
    }
    if(status =200){
      setQueryVersion((prev) => prev + 1);
      toast.success("Todo has Removed", {
        position: 'top-center',
        duration: 2500,
        icon: '👏',
      }); 
      setisOpenRemove(false);
    }




}

const RemoveModel = (todo: ITodo) => {
  setTodoToEdit(todo);
  setisOpenRemove(true);
};
const onCancelRemove = () => {
  setisOpenRemove(false);
  setTodoToEdit({
    id: 0,
    todo: "",
  description: "",
  });
 
};



const onOpenEditModal =(todo: ITodo) => {
  setTodoToEdit(todo);
  setisOpen(true);
};


if (isLoading)return <div>loading...</div>;

  return (


    <div className=' mt-24 container '>

      <AddTodo/>
     {data?.todos.length ? data.todos.map((task: ITodo)=>
      <div key={task.id} className="mt-2 flex items-center justify-center   ">
       
      <div className='grid grid-cols-5 gap-4 py-1 px-1 hover:bg-slate-300'>
        <div className='col-span-4 text-[16px] font-sans font-semibold text-[#000000a8]'>{task.todo}</div>
        <div className='row-start-auto mt-4'>
          <button  onClick={()=>onOpenEditModal(task)}  className='mx-3 bg-cyan-500 text-white rounded py-[4px] px-[11px]'>Edit</button>
          <button onClick={()=>RemoveModel(task)} className='mx-3 bg-[#c2344d] text-white rounded py-[4px] px-[11px]'>remove</button>
        </div>
      </div>
      
      
  </div>
     ):<h3>there is no tasks today</h3> }
        <MyModal isOpen={isOpen} title="Edit this Todo" closeModal={isCloseEdit}>
        <form className="space-y-3" onSubmit={handleSubmit(EditSubmit)}>

        <div className="flex items-center flex-col  ">
          <Input   className={`${EditTodoInputstyle}`} {...register("todo")}  name="todo"    value={todoToEdit.todo} onChange={onChangeHandler}/>
          {errors["todo"] && <InputErrorMessage msg={errors["todo"]?.message} />}
          <Textarea  
            {...register("description")} 
              name="description"
             value={todoToEdit.description}
             onChange={onChangeHandler}/>
        </div>

        <div className="flex items-center space-x-3">
          <button type='submit' className="bg-indigo-600 py-1 px-3 rounded hover:bg-indigo-800 text-white">Submit</button>
          <button type='button' className="bg-gray-300  py-1 px-3 rounded hover:bg-gray-400" onClick={onCancel}>Cancel</button>
        </div>
        </form>
        </MyModal>


        {/* Confirm Remove modal   */}
        
        <MyModal isOpen={isOpenRemove} 
        title={`Are you sure you want to remove ${todoToEdit.todo} Task?`}
        description="Deleting this todo will remove it permenantly from your inventory. Any associated data, sales history, and other related information will also be deleted. Please make sure this is the intended action."
        closeModal={isCloseEdit}>
        <form className="space-y-3" onSubmit={handleRemove}>
        <div className="flex items-center space-x-3">
          <button type='submit' className="bg-[#c2344d] py-1 px-3 rounded hover:bg-indigo-800 text-white">Remove</button>
          <button type='button' className="bg-gray-300  py-1 px-3 rounded hover:bg-gray-400" onClick={onCancelRemove}>Cancel</button>
        </div>
        </form>
        </MyModal>
        <Paginator/>
    </div>
  )
}

export default Todolist