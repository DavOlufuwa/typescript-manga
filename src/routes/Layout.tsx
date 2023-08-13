import Footer from "@/components/Footer"
import NavBar from "@/components/NavBar"
import { Outlet } from "react-router-dom"



const Layout = () => {
  return (
      <>
      <NavBar />
      <main className="bg-[#0e0d0d] min-h-screen">
        <Outlet /> 
      </main>
      <Footer />
      </>
  )
}

export default Layout