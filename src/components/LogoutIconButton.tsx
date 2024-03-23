import { useState, useEffect } from 'react'
import IconButton from '@mui/joy/IconButton';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import useLogout from '../hooks/useLogout';

const LogoutIconButton = () => {
  const logout = useLogout();
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    if(!isMounted) setIsMounted(true);
  }, [])

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;

    btn.setAttribute('disabled', '');
    await logout();
    btn.removeAttribute('disabled');
  }

  return (
    <>
      {isMounted && 
        <IconButton variant='outlined' color="neutral" size="sm"
         onClick={handleLogout}
        >
          <LogoutRoundedIcon />
        </IconButton>
      }
    </>
  )
}

export default LogoutIconButton