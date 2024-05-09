import React, { useEffect ,useState} from 'react'
import axiosInstance from './../config/axios.config';
import  {useQuery}  from '@tanstack/react-query';
import useCustomQuery from './../hooks/useCustomQuery';

function Todolist() {
//const [Todos ,setTodos] =useState([])
  const storgeKey ="LoggedinUser"
const userDataString= localStorage.getItem(storgeKey)
const userData = userDataString ? JSON.parse(userDataString) : null;



const {data ,isLoading }=useCustomQuery({
  queryKey:["todos"],
  url:"/users/me?populate=todos",
  config:{headers:{Authorization:`bearer ${userData.jwt}`} }

})

// const {isLoading,error,data} =useQuery({
//   queryKey:["todos"],
//   queryFn :async () => {
//   const {data} =   await axiosInstance.get("/users/me?populate=todos",{
//       headers:{Authorization:`bearer ${userData.jwt}`}
//     })
//     return data
//   }

// })
console.log({isLoading,data});

if (isLoading)return <div>loading...</div>;



  return (
    <div className=' mt-24 container '>
     {data?.todos.length ? data.todos.map((task)=>
      <div key={task.id} className="mt-2 flex items-center justify-center   ">
      <div className='grid grid-cols-5 gap-4 py-1 px-1 hover:bg-slate-300'>
        <div className='col-span-4 text-[16px] font-sans font-semibold text-[#000000a8]'>{task.todo}</div>
        <div className='row-start-auto mt-4'>
          <button className='mx-3 bg-cyan-500 text-white rounded py-[4px] px-[11px]'>Edit</button>
          <button className='mx-3 bg-red-500 text-white rounded py-[4px] px-[11px]'>remove</button>
        </div>
      </div>
      
      
  </div>
     ):<h3>there is no tasks today</h3> }
        
    </div>
  )
}

export default Todolist