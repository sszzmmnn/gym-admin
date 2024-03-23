import { GlobalStyles, Typography, Sheet, Box, List, ListItem, ListItemButton, Divider, ListItemContent } from "@mui/joy"
import { closeSidebar } from "../utils/sidebarUtils"
import LogoutIconButton from "./LogoutIconButton"
import AddRounded from "@mui/icons-material/AddRounded"
import { sidebarListItems, COMPONENTS } from "../constants"
import useApiPath from "../hooks/useApiPath"
import useDisplay from "../hooks/useDisplay"


const Sidebar = () => {
  const { setApiPath } = useApiPath();
  const { setDisplay } = useDisplay();
  return (
    <Sheet
      className='Sidebar'
      sx={{
        position: { xs: 'fixed', md: 'sticky' },
        zIndex: 10,
        top: 0,
        width: 'var(--Sidebar-width)',
        height: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        p: 2,
        gap: 2,
        transform: {
          xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
          md: 'none'
        },
        transition: 'transform 0.4s, width 0.4s',
        borderRight: '1px solid',
        borderColor: 'divider'
      }}
    >
      <GlobalStyles
        styles={theme => ({
          ':root': {
            '--Sidebar-width': '220px',
            [theme.breakpoints.up('lg')]: {
              '--Sidebar-width': '240px',
            },
          },
        })}
      />
      <Box 
        className='sidebar-overlay'
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 8,
          width: '100vw',
          height: '100vh',
          opacity: 'var(--SideNavigation-slideIn)',
          backgroundColor: 'var(--joy-palette-background-backdrop)',
          transform: {
            xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))',
            lg: 'translateX(-100%)'
          },
          transition: 'opacity 0.4s'
        }}
        onClick={closeSidebar}
      />
      <Box sx={{display: 'flex', gap: 1, alignItems: 'center', justifyContent: 'space-between'}}>
        <Typography level='title-lg'>FitTime Admin</Typography>
        <LogoutIconButton />
      </Box>
      <Divider />
      <Box>
        <List 
          size='sm'
          sx={{
            gap: 1,
            '--ListItem-radius': (theme) => theme.vars.radius.sm
          }}
        >
          {sidebarListItems.map((item, index) => (
            <ListItem key={index}>
              <ListItemButton onClick={() => {setApiPath({path: item.path, page: 0}); setDisplay(prev => { return { ...prev, isOpen: false }})}} >
                <item.icon />
                <ListItemContent>
                  <Typography level='title-sm'>{item.title}</Typography>
                </ListItemContent>
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem>
            <ListItemButton onClick={() => setDisplay({component: <COMPONENTS.PASS/>, isOpen: true})} >
              <AddRounded />
              <ListItemContent>
                <Typography level='title-sm'><b>New Pass</b></Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={() => setDisplay({component: <COMPONENTS.CLASS/>, isOpen: true})} >
              <AddRounded />
              <ListItemContent>
                <Typography level='title-sm'><b>New Class</b></Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Sheet>
  )
}

export default Sidebar