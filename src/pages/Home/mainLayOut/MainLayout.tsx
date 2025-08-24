import {  Outlet } from "react-router-dom";
import Navbar from "../../Shared/NavBar";
import Footer from "../../Shared/Footer";


export default function MainLayout() {
    return(
       <div>
      <Navbar />

      <main className="container w-max-7xl mx-auto p-4 min-h-screen">
        <Outlet /> 
      </main>
      <Footer/>

      
    </div>
    )
}