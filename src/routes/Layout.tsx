import { Outlet } from "react-router-dom"


const Layout = () => {
  return (
    <main className="bg-gray-900">
      <Outlet /> 
    </main>
  )
}

export default Layout