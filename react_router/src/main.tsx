import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Layout from './Layout.tsx'
import Home from './components/Home.tsx'
import About from './components/About.tsx'
import Contact from './components/Contact.tsx'
import Address from './components/Address.tsx'
import User from './components/User.tsx'
import Github from './components/Github.tsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Home />} />
      <Route path="user/:username" element={<User />} />
      <Route path='about' element={<About />} >
        <Route path='address' element={<Address />} />
      </Route>
      <Route path='contact' element={<Contact />} />
      <Route loader={
        async function githubLoader() {
          const response = await fetch('https://api.github.com/users/adilahmed3886')
          const data = await response.json()
          return data
        }
      } path='github' element={<Github />} />
    </Route>
  )
)

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router}>
    <App />
  </RouterProvider>,
)
