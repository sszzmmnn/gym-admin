import ButtonGroup from "@mui/joy/ButtonGroup"
import IconButton from "@mui/joy/IconButton"
import EditRounded from "@mui/icons-material/EditRounded"
import DeleteRounded from "@mui/icons-material/DeleteRounded"
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import useApiPath from "../hooks/useApiPath"
import { useState, useEffect, useRef } from 'react'
import useAxiosIntercept from "../hooks/useAxiosIntercept";
import { AxiosError } from "axios";

type Props = {
  data: any
}

const RowButtons = (props: Props) => {
  const { data } = props;
  const { apiPath } = useApiPath();
  const axiosIntercept = useAxiosIntercept();

  const [isConfirm, setIsConfirm] = useState<boolean>(false);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const timeoutId = useRef<number>(0);

  useEffect(() => {
    if(isConfirm) {
      setIsConfirm(false);
      toggleTimeout();
    };
    setIsDeleted(false);
  }, [apiPath])

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if(apiPath.path !== 'pass') return alert('Deleting is not implemented for this data yet.');
    const btn = e.currentTarget;

    if(!isConfirm) {
      setIsConfirm(true);
      toggleTimeout();
    } else {
      toggleTimeout();
      btn.setAttribute('disabled', '');
      await axiosIntercept.delete('/admin/pass', {
        params: { id: data._id }
      }).then(res => {
        console.log(data._id);
        console.log(res.data);
        setIsDeleted(true);
      }).catch(e => {
        if(e instanceof AxiosError) {
          console.log(e.response?.data?.error);
        } else {
          console.log(e);
        }
      }).finally(() => {
        btn.removeAttribute('disabled');
        setIsConfirm(false);
      })
    }
  }

  const toggleTimeout = () => {
    if(timeoutId.current) {
      clearTimeout(timeoutId.current);
      timeoutId.current = 0;
      return;
    }

    timeoutId.current = setTimeout(
      () => {
        setIsConfirm(false);
        timeoutId.current = 0;
      }, 5000)
  }

  return (
    <ButtonGroup variant='solid' size='sm' disabled={ isDeleted }>
      <IconButton color='primary' onClick={() => alert('Editing is not implemented yet.')}>
        <EditRounded />
      </IconButton>
      <IconButton color={isConfirm ? 'success' : 'danger'} onClick={handleDelete}>
        {isConfirm 
          ? <CheckRoundedIcon />
          : <DeleteRounded />
          }
      </IconButton>
    </ButtonGroup>
  )
}

export default RowButtons