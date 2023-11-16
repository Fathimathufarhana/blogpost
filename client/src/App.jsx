import React from 'react'
import Login from "./Login"
import Register from './Register'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import CreateProfile from './createProfile'

function App() {

  const router = createBrowserRouter([
    {
      path:"/",
      element:<Login/>
    },
    {
      path:"/register",
      element:<Register/>
    },
    {
      path:"/createProfile",
      element:<CreateProfile/>
    },

  ])  

  return (
    <>
      <RouterProvider router={router}/>
      
    </>
  )
}

export default App
