import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import styles from "./styles/App.module.css";
import Header from "./Pages/Header";
import Admin from "./Pages/Admin";
import Boutique from "./Pages/Boutique";
import LaChaussetteEnMohair from "./Pages/LaChaussetteEnMohair";
import Profil from "./Pages/Profil";
import Footer from "./Pages/Footer";
import ArticleDetail from "./Pages/ArticleDetail";
import PageError from "./Pages/PageError";
import Connexion from "./Pages/Connexion";
import Deconnexion from "./Pages/Deconnexion";
import ValidateAccount from "./Pages/ValidateAccount";
import ForgottenPassword from "./Pages/ForgottenPassword";
import UpdatePassword from "./Pages/UpdatePassword";
import AdminProducts from "./Components/AdminProducts";
import OrdersAdmin from "./Components/OrdersAdmin";
import { refreshToken } from "./api/request/customer";
import { isConnected } from "./store/slices/user";

function App() {
   const dispatch = useDispatch();
   const tokenSession = localStorage.getItem("tokenSession");
   

   const checkSession = async () => {
      try {
         const res = await refreshToken(tokenSession);
         if (res.response) {
            console.log(res.response.data);
         } else {
            console.log(res.msg);
            console.log(res.token);
            // localStorage.setItem("token", res.newToken);
            dispatch(isConnected(res.role));
         }
      } catch (error) {
         console.log("Error :", error);
      }
      const token = localStorage.getItem("token");
      console.log("Contenu du token :", token);
   };

   useEffect(() => {
      checkSession(tokenSession);
   }, [tokenSession]);

  

   return (
      <div className={styles.app}>
         <Header className={styles.header} />
         <div className={styles.pageContainer}>
            <Routes>
               <Route index path="/" element={<LaChaussetteEnMohair />} />

               <Route path="boutique" element={<Boutique />}>
                  <Route path=":id" element={<ArticleDetail />} />
               </Route>
               <Route path="profil" element={<Profil />} />

               <Route path="admin" element={<Admin />} >
                  <Route path="products" element={<AdminProducts />} /> 
                  <Route path="orders" element={<OrdersAdmin />} /> 
               </Route>

               <Route path="connexion" element={<Connexion />} />
               <Route path="deconnexion" element={<Deconnexion />} />
               <Route path="validate-account/:uuid" element={<ValidateAccount />} />
               <Route path="forgotten-password" element={<ForgottenPassword />} />
               <Route path="update-password/:uuid" element={<UpdatePassword />} />


               <Route path="not-found" element={<PageError />} />
               <Route index path="*" element={<PageError />} />
            </Routes>
            <Footer />
         </div>
      </div>
   );
}

export default App;