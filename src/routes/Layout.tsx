import { Outlet } from "react-router-dom"


const Layout = () => {
  return (
    <main className="bg-[#0e0d0d] min-h-screen">
      <Outlet /> 
    </main>
  )
}

export default Layout