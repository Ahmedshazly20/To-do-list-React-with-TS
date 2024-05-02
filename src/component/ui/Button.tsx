import React from 'react'

interface Ibutton{
    name:string;
    
}

function Button({name}:Ibutton) {
  return (
    <>
    <button type='submit'  className='w-full mr-2 bg-[#4A3AFF] mt-3 font-DM Sans text-white  font-[18px] px-4 placeholder:px-2  shadow-[0_px_8px_20px_#4a3aff42 ] focus:outline-none rounded-[46px] py-[18px] w-100 border-solid border-2 border-[#F3F1FF]'>{name}</button>
    </>
  )
}

export default Button