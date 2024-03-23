import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import Alert from "@mui/joy/Alert";
import Input from "@mui/joy/Input";
import FormHelperText from "@mui/joy/FormHelperText";
import FormLabel from "@mui/joy/FormLabel";
import Button from "@mui/joy/Button";
import IconButton from "@mui/joy/IconButton";
import Checkbox from "@mui/joy/Checkbox";
import Textarea from "@mui/joy/Textarea";
import CloseRounded from "@mui/icons-material/CloseRounded";
import ReportRounded from "@mui/icons-material/ReportRounded";
import CheckRounded from "@mui/icons-material/CheckRounded";

import useDisplay from "../hooks/useDisplay"
import useAxiosIntercept from "../hooks/useAxiosIntercept";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { AxiosError } from "axios";
import { ColorPaletteProp } from "@mui/joy";

interface IForm {
  name: string,
  activeHours: number,
  price: number,
  description: string,
  featured: boolean
}

interface IFormRes {
  success: boolean | null,
  message: string
}

const NewPass = () => {
  const { setDisplay } = useDisplay();
  const axiosIntercept = useAxiosIntercept();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<IForm>({
    defaultValues: {
      name: '',
      activeHours: 0,
      price: 0,
      description: '',
      featured: false
    }
  });

  const [status, setStatus] = useState<IFormRes>({
    success: null,
    message: ''
  });

  const onSubmit = async (data: IForm) => {
    console.log(data);
    setStatus({success: null, message: ''});
    try {
      await axiosIntercept.post<IFormRes>('/admin/pass', {
        data
      }).then(res => {
        setStatus(res.data);
      })
    } catch (e) {
      if(e instanceof AxiosError) {
        if(e.response?.data as IFormRes) setStatus(e.response?.data);
      } else console.log(e);
    }
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <Typography level="h2">New Pass!!</Typography>
        <IconButton onClick={() => setDisplay(prev => {return {...prev, isOpen: false}})}>
          <CloseRounded/>
        </IconButton>
      </Box>
      <Box
        sx={{
          maxWidth: '250px',
          margin: '0 auto'
        }}
      >
        {status.success !== null &&
          <Alert
          color={
            {
              true: 'success',
              false: 'danger'
            }[status.success ? 'true' : 'false'] as ColorPaletteProp
          }
          variant='soft'
          startDecorator={
            {
              true: <CheckRounded />,
              false: <ReportRounded />
            }[status.success ? 'true' : 'false']
          }
          endDecorator={
            !status.success &&
            <IconButton variant='soft' color='danger' onClick={() => setStatus({success: null, message: ''})}>
              <CloseRounded />
            </IconButton>
          }
          >
            <div><b>
            {
              status.success 
                ? 'Success!' 
                : 'Error'
            }
            </b> <Typography level="body-sm" color={status.success ? 'success' : 'danger'}>{
             status.success
              ? 'The pass has been added!'
              : status.message
            }</Typography></div>
          </Alert>
        }
        {!status.success && 
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Box sx={{
              display: 'flex',
              flexDirection: 'column'
            }}>
              <>
                <FormLabel sx={{py: 1, mt: 1}}>Pass Name</FormLabel>
                <Input type='text'
                  { ...register('name', {
                    maxLength: 40,
                    required: "Field required",
                    pattern: {
                      value: /^(?!\s).+(?<!\s)$/gm,
                      message: 'Invalid name format'
                    }
                  })}
                  error={!!errors.name}
                />
                <FormHelperText>{ errors.name?.message }</FormHelperText>
              </>
              <>
                <FormLabel sx={{py: 1, mt: 1}}>Active for how many hours?</FormLabel>
                <Input type='number'
                  { ...register('activeHours', {
                    min: {
                      value: 0, 
                      message: 'Time can\'t be negative'
                    },
                    required: "Field required"
                  })}
                  error={ !!errors.activeHours }
                />
                <FormHelperText>{ errors.activeHours?.message }</FormHelperText>
              </>
              <>
                <FormLabel sx={{py: 1, mt: 1}}>Price (PLN)</FormLabel>
                <Input type='number'
                  { ...register('price', {
                    pattern: {
                      value: /^\d+\.\d{2}$/i,
                      message: 'Invalid price format (x.xx)'
                    },
                    min: {
                      value: 0, 
                      message: 'Price can\'t be negative'
                    },
                    required: "Field required"
                  })}
                  error={ !!errors.price }
                />
                <FormHelperText>{ errors.price?.message }</FormHelperText>
              </>
              <>
                <FormLabel sx={{py: 1, mt: 1}}>Description</FormLabel>
                <Textarea minRows={3}
                  { ...register('description')}
                />
              </>
              <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 1, mt: 2}}>
                <FormLabel sx={{py: 1}}>Feature the pass?</FormLabel>
                <Checkbox size='lg' sx={{backgroundColor: 'white'}}
                  { ...register('featured')}
                />
              </Box>
              <Button sx={{mt: 3}} type='submit' disabled={ isSubmitting } fullWidth>
                Add New Pass
              </Button>
            </Box>
          </form>
        }
        </Box>
    </>
  )
}

export default NewPass