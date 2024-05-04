import React, { HTMLAttributes } from 'react'

interface Ibutton extends HTMLAttributes<HTMLButtonElement>{
    name:string,
    isLoading:Boolean;
}

function Button({name,isLoading}:Ibutton) {

  return (
    <>
    <button disabled={isLoading} type='submit'  className='w-full flex items-center justify-center disabled:bg-indigo-400 mr-2 bg-[#4A3AFF] mt-3 font-DM Sans text-white  font-[18px] px-4 placeholder:px-2  shadow-[0_px_8px_20px_#4a3aff42 ] focus:outline-none rounded-[46px] py-[18px] w-100 border-solid border-2 border-[#F3F1FF]'>
      {name}
      {isLoading ? (
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      ) : null}
      </button>
    </>
  )
}

export default Button