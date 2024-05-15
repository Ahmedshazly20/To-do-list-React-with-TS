import React, { forwardRef, InputHTMLAttributes, Ref } from 'react'

interface IProps extends InputHTMLAttributes<HTMLInputElement> {}


const Input =forwardRef(({...rest}:IProps,ref:Ref<HTMLInputElement>)=> {
  return (
    <input  {...rest} ref={ref}/>
  )
})

export default Input