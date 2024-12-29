import CommonForm from '@/components/common/Form';
import { registerFormControls } from '@/config';
import { registerUser } from '@/store/auth-slice';
import React ,{useState} from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { useToast } from '@/hooks/use-toast';
const initialState = {
  name :'',
  email:"",
  password:""
}
const AuthRegister = () => {
  const [formData,setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const onSubmit = (e)=>{
  e.preventDefault();
  dispatch(registerUser(formData)).then((data)=>{
    if(data?.payload?.success){
      toast({
        title:data?.payload?.message
      });
      navigate('/auth/login')
    }
    else{
      toast({
        title:data?.payload?.message,
        variant: "destructive",
      });
      }
    }
  )
}
  return (
    <>
    <div className='mx-auto w-full max-w-md space-y-6'>
        <div className='text-center'>
            <h1 className='text-3xl font-bold tracking-tighter text-foreground'>Create New Account</h1>
            <p className='mt-2'>Already have an account 
              <Link to='/auth/login' className='font-medium text-primary hover:underline'> Login</Link></p>
        </div>
        <CommonForm formControls={registerFormControls} formData={formData} buttonText={'Create Account'} setFormData={setFormData}
     onSubmit={onSubmit}
    />
    </div>
    
    </>
  )
}

export default AuthRegister
