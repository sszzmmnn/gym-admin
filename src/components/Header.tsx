import { IconButton, Sheet, Typography } from "@mui/joy"
import MenuIcon from '@mui/icons-material/Menu'

import { toggleSidebar } from '../utils/sidebarUtils'

const Header = () => {
  return (
    <Sheet sx={{
      display: { xs: 'flex', md: 'none' },
      zIndex: 5,
      width: '100vw',
      height: '52px',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'fixed',
      top: 0,
      p: 2,
      gap: 1,
      borderBottom: '1px solid',
      borderColor: 'background.level1',
      boxShadow: 'sm'
    }}>
      <IconButton 
        onClick={() => toggleSidebar()}
        variant='outlined'
        color='neutral'
        size='sm'
      >
        <MenuIcon />
      </IconButton>
      <Typography>Header</Typography>
    </Sheet>
  )
}

export default Header