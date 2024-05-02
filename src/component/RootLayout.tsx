import React from 'react'
import { Outlet } from 'react-router-dom'
import Example from './navbar'

function RootLayout() {
  return (
    <>
      <Example/>
      <Outlet/>
      <div className="bg-slate-500 mt-4">hello from tallwind css</div>

    </>
  )
}

export default RootLayout