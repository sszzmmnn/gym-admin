import { useState, useEffect } from "react"
import useAxiosIntercept from "../hooks/useAxiosIntercept"
import { useForm } from 'react-hook-form'
import useDisplay from "../hooks/useDisplay"
import { AxiosError } from "axios"


import Typography from "@mui/joy/Typography"
import Box from "@mui/joy/Box"
import IconButton from "@mui/joy/IconButton"
import Select from "@mui/joy/Select"
import Option from "@mui/joy/Option"
import Button from "@mui/joy/Button"
import Stack from "@mui/joy/Stack"
import FormLabel from "@mui/joy/FormLabel"
import Alert from "@mui/joy/Alert"
import CloseRounded from "@mui/icons-material/CloseRounded"
import CheckRounded from "@mui/icons-material/CheckRounded"
import ReportRounded from "@mui/icons-material/ReportRounded"
import { ColorPaletteProp } from "@mui/joy"

interface IForm {
  name: string,
  date: string,
  time: string
}

interface IFormRes {
  success: boolean | null,
  message: string
}

const NewClass = () => {
  const { setDisplay } = useDisplay();
  const axiosIntercept = useAxiosIntercept();
  const { register, handleSubmit, formState: { errors, isSubmitting }} = useForm<IForm>({
    defaultValues: {
      name: '',
      date: '',
      time: ''
    }
  });

  const [classList, setClassList] = useState<string[]>([]);
  const [status, setStatus] = useState<IFormRes>({
    success: null,
    message: ''
  });

  const onSubmit = async (data: IForm) => {
    const parsedDate = new Date(Date.parse(`${data.date} ${data.time}`)).toJSON();
    const newData = {
      name: data.name,
      date: parsedDate
    }
    await axiosIntercept.post<IFormRes>('/admin/class', { data: newData })
      .then(res => {
        setStatus(res.data);
      }).catch(e => {
        if (e instanceof AxiosError) {
          if(e.response?.data as IFormRes) setStatus(e.response?.data);
        } else {
          console.log(e);
          setStatus({success: false, message: 'Failed to add the class'});
        }
      })
  }

  useEffect(() => {
    (async () => {
      await axiosIntercept.get('/admin/class/names')
        .then(res => {
          setClassList(res.data);
        }).catch(e => {
          console.log(e);
        })
    })();
  }, [])

  return (
    <>
      <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between'
      }}
      >
        <Typography level="h2">New Class!!</Typography>
        <IconButton onClick={() => setDisplay(prev => {return {...prev, isOpen: false}})}>
          <CloseRounded/>
        </IconButton>
      </Box>
      <Box
      sx={{
        width: '300px',
        margin: '0 auto'
      }}
      >
      { status.success !== null &&
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
      { !status.success && 
        <form onSubmit={handleSubmit(onSubmit)} noValidate style={{display: 'flex', flexDirection: 'column', gap: 2}}>
          <div>
            <FormLabel sx={{py: 1, mt: 1}}>Class Name</FormLabel>
            <Select
              size='sm'
              placeholder='Select...'
              slotProps={{ button: {sx: { whiteSpace: 'nowrap' }}}}
              { ...register('name', {
                required: 'Field required'
              })}
            >
              {classList.map(_class => (
                <Option key={_class} value={_class}>{_class}</Option>
              ))}
            </Select>
            { errors.name && <Typography level="body-sm" color="danger">{errors.name.message}</Typography> }
          </div>
          <Stack sx={{ width: '300px' }}>
          <FormLabel sx={{py: 1, mt: 1}}>Class Date</FormLabel>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
              <div>
                <input style={{
                  height: '2rem',
                  border: '#cdd7e1 1px solid',
                  borderRadius: '0.33rem',
                  font: '0.85rem Inter, sans-serif',
                  padding: '0.33rem',
                  color: '#636b74',
                  backgroundColor: '#32383e05',
                  boxShadow: '0 0 #000, 0px 1px 2px 0px rgba(21, 21, 21, 0.08)'
                }}
                type='date' 
                {...register('date', {
                  required: 'Field required'
                })}
                />
                { errors.date && <Typography level="body-sm" color="danger">{errors.date.message}</Typography> }
              </div>
              <div>
                <input style={{
                  height: '2rem',
                  border: '#cdd7e1 1px solid',
                  borderRadius: '0.33rem',
                  font: '0.85rem Inter, sans-serif',
                  padding: '0.33rem',
                  color: '#636b74',
                  backgroundColor: '#32383e05',
                  boxShadow: '0 0 #000, 0px 1px 2px 0px rgba(21, 21, 21, 0.08)'
                }}
                type='time' 
                {...register('time', {
                  required: 'Field required'
                })}
                />
                { errors.time && <Typography level="body-sm" color="danger">{errors.time.message}</Typography> }
              </div>
            </div>
          </Stack>
          <Button type='submit' sx={{mt: 2}} disabled={ isSubmitting }>Create</Button>
        </form>
      }    
      </Box>
    </>
  )
}

export default NewClass