import { CssVarsProvider } from '@mui/joy/styles'
import Sheet from '@mui/joy/Sheet'
import Typography from '@mui/joy/Typography'
import Input from '@mui/joy/Input'
import Button from '@mui/joy/Button'
import Box from '@mui/joy/Box'
import FormHelperText from '@mui/joy/FormHelperText'
import Alert from '@mui/joy/Alert'
import IconButton from '@mui/joy/IconButton'
import ReportRounded from '@mui/icons-material/ReportRounded'
import CloseRounded from '@mui/icons-material/CloseRounded'

import { useForm } from 'react-hook-form'
import useLogin from '../hooks/useLogin'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import useAuth from '../hooks/useAuth'

interface IForm {
  email: string,
  password: string
}

const Login = () => {
  const { auth } = useAuth();
  const login = useLogin();
  const navigate = useNavigate();

  const [error, setError] = useState<string>('');

  useEffect(() => {
    if(auth) navigate('/', { replace: true });
  })

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<IForm>({
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = async (data: IForm) => {
    console.log(data);
    const result = await login(data.email, data.password);
    if(result.success) navigate('/', { replace: true });
    else setError(result.message);
  }

  return (
    <CssVarsProvider>
    <Box sx={{width: 300, mx: 'auto'}}>
      {error &&
        <Alert
          color='danger'
          variant='soft'
          startDecorator={<ReportRounded />}
          endDecorator={
            <IconButton variant='soft' color='danger' onClick={() => setError('')}>
              <CloseRounded />
            </IconButton>
          }
          >
            <div><b>Error</b> <Typography level="body-sm" color='danger'>{error}</Typography></div>
        </Alert>}
      <Sheet sx={{
        mx: 'auto',
        my: 3,
        py: 3,
        px: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        borderRadius: 'sm',
        boxShadow: 'md'
      }} variant='outlined'>
        <div>
          <Typography level='h4' component='h1'>
            Welcome!
            </Typography>
          <Typography level='body-sm'>Login</Typography>
        </div>
          {/* <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Controller 
              name='email'
              control={control}
              rules={{required: {
                value: true,
                message: "Field required"
              }}}
              render={({ field }) => <Input type='email' placeholder='E-mail' { ...field } />}
            />
            <Typography>{errors?.email && errors.email.message}</Typography>
            <Controller 
              name='password'
              control={control}
              rules={{required: {
                value: true,
                message: "Field required"
              }}}
              render={({ field }) => <Input type='password' placeholder='Password' { ...field } />}
            />
          <Button sx={{mt: 1}} type='submit'>
            Log In
          </Button>
        </form> */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2
          }}>
            <div>
              <Input type='email' placeholder='E-mail'
                { ...register('email', {
                  required: "Field required"
                })}
                error={!!errors.email}
              />
              <FormHelperText>{ errors.email?.message }</FormHelperText>
            </div>
            <div>
              <Input type='password' placeholder='Password'
                { ...register('password', {
                  required: "Field required"
                })}
                error={ !!errors.password }
              />
              <FormHelperText>{ errors.password?.message }</FormHelperText>
            </div>
            <Button sx={{mt: 1}} type='submit' disabled={ isSubmitting } fullWidth>
              Log In
            </Button>
          </Box>
        </form>
      </Sheet>
      </Box>
    </CssVarsProvider>
  )
}

export default Login
