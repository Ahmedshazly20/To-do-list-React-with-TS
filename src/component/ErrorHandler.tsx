import React from 'react'

interface Iprops {
    statuscode?: string,
    title?:string

}

function ErrorHandler({statuscode ="500" ,title="server error"}:Iprops) {
  return (
    <div> server Error {statuscode} - {title}</div>
  )
}

export default ErrorHandler