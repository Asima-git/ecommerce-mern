import { Route, Routes } from 'react-router-dom'
import AuthLayout from './components/auth/Layout'
import AuthLogin from './pages/auth/Login'
import AuthRegister from './pages/auth/Register'
import AdminLayout from './components/admin-view/Layout'
import AdminDashboard from './pages/admin-view/Dashboard'
import AdminFeatures from './pages/admin-view/Features'
import AdminOrders from './pages/admin-view/Orders'
import AdminProducts from './pages/admin-view/Products'
import ShoppingLayout from './components/shopping-view/Layout'
import NotFound from './pages/not-found'
import ShoppingHome from './pages/shopping-view/Home'
import ShoppingList from './pages/shopping-view/Listing'
import ShoppingCheckout from './pages/shopping-view/Checkout'
import ShoppingAccount from './pages/shopping-view/Account'
import CheckAuth from './components/common/CheckAuth'
import UnauthPages from './pages/unauth-pages'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { checkAuth } from './store/auth-slice'
import { Skeleton } from "@/components/ui/skeleton"
import PaypalReturn from './pages/shopping-view/PaypalReturn'
import PaymentSuccess from './pages/shopping-view/PaymentSuccess'
import Search from './pages/shopping-view/Search'

function App() {
  const {isAuthenticated,user,isLoading} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  useEffect(()=>{
    console.log(isAuthenticated);
    dispatch(checkAuth());
  },[dispatch])
  if(isLoading) return <Skeleton className="w-[800px] bg-slate-300 h-[600px]" />
  
  return (
    <div className='flex flex-col overflow-hidden bg-white'>
       <Routes>
       <Route
          path="/"
          element={
            <CheckAuth
              isAuthenticated={isAuthenticated}
              user={user}
            ></CheckAuth>
          }
        />
         <Route path='/auth' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout/>
          </CheckAuth>
          }>
            <Route path='login' element={<AuthLogin/>} />
            <Route path="register" element={<AuthRegister />} />
         </Route>
         <Route path='/admin' element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout/>
            </CheckAuth>
          }>
           <Route path='dashboard' element={<AdminDashboard/>} />
           <Route path='features' element={<AdminFeatures/>} />
           <Route path='orders' element={<AdminOrders/>} />
           <Route path='products' element={<AdminProducts/>} />
         </Route>
         <Route path='/shop' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <ShoppingLayout/>
          </CheckAuth>}>
             <Route path='home' element={<ShoppingHome/>} />
             <Route path='listing' element={<ShoppingList/>} />
             <Route path='checkout' element={<ShoppingCheckout/>} />
             <Route path='account' element={<ShoppingAccount/>} />
             <Route path='paypal-return' element={<PaypalReturn/>} /> 
             <Route path='payment-success' element={<PaymentSuccess/>} />  
             <Route path='search' element={<Search/>} /> 
         </Route>
         <Route path='/shop' element={<ShoppingLayout/>}>
             <Route path='home' element={<ShoppingHome/>} />
             <Route path='listing' element={<ShoppingList/>} />
             <Route path='search' element={<Search/>} /> 
         </Route>
         <Route path='*' element={<NotFound/>}></Route>
         <Route path='/unauth-page' element={<UnauthPages/>}></Route>
       </Routes>
    </div>
  )
}

export default App
