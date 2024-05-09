import { useState } from 'react'
import { RouterProvider } from "react-router-dom";
import router from './Router/router'
import './output.css'
function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='bg-gray-50'>
       <RouterProvider router={router} />
    </div>
  )
}

export default App
