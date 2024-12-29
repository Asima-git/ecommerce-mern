import CommonForm from '@/components/common/Form';
import { loginFormControls } from '@/config';
import { loginUser } from '@/store/auth-slice';
import React ,{useState} from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { useToast } from '@/hooks/use-toast';

const initialState = {
  email:"",
  password:""
}
const AuthLogin = () => {
  const [formData,setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const onSubmit = (e)=>{
   e.preventDefault();
   dispatch(loginUser(formData)).then((data)=>{
    if(data?.payload?.success){
      toast({
        title:data?.payload?.message
      });
    }
    else{
      toast({
        title:data?.payload?.message,
        variant: "destructive",
      });
      }
    }
  )}
    return (
      <>
      <div className='mx-auto w-full max-w-md space-y-6'>
          <div className='text-center'>
              <h1 className='text-3xl font-bold tracking-tighter text-foreground'>Sign Up your Account</h1>
              <p className='mt-2'>Don't have an account  please 
                <Link to='/auth/register' className='font-medium text-primary hover:underline'> Register</Link></p>
          </div>
          <CommonForm formControls={loginFormControls} formData={formData} buttonText={'Login'} setFormData={setFormData}
       onSubmit={onSubmit}
      />
      </div>
      
      </>
    )
}

export default AuthLogin
