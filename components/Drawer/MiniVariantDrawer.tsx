'use client'
import React, { useEffect, useMemo, useState } from 'react'
import { usePathname } from 'next/navigation'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles'
import Box from '@mui/material/Box'
import MuiDrawer from '@mui/material/Drawer'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import { Button, Stack } from '@mui/material'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'
import AssessmentIcon from '@mui/icons-material/Assessment'
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import LogoutIcon from '@mui/icons-material/Logout'
import Link from 'next/link'
import { IDrawerMenu, IMiniVariantDrawerProps } from '@/Interfaces'
import DrawerSideNavList from './DrawerSideNavList'

const drawerWidth = 240
const defaultDrawerTop: IDrawerMenu[] = [
  {
    text: 'Official Receipt',
    href: '/official-receipt',
    icon: ReceiptLongIcon,
  },
  {
    text: 'Report',
    href: '/report',
    icon: AssessmentIcon,
  },
  {
    text: 'Library',
    href: '/library',
    icon: LibraryBooksIcon,
  },
]

const defaultDrawerTopAdmin: IDrawerMenu[] = [
  {
    text: 'Official Receipt',
    href: '/official-receipt',
    icon: ReceiptLongIcon,
  },
  {
    text: 'Report',
    href: '/report',
    icon: AssessmentIcon,
  },
  {
    text: 'Library',
    href: '/library',
    icon: LibraryBooksIcon,
  },
  {
    text: 'User Management',
    href: '/user-management',
    icon: ManageAccountsIcon,
  },
]

const defaultDrawerMenuBottom: IDrawerMenu[] = [
  {
    text: 'Logout',
    href: '#',
    icon: LogoutIcon,
    onClick: () => {
      console.log('logout')
    },
  },
]

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
})

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}))

const MiniVariantDrawer = ({
  children,
  name,
  role,
  handleLogoutDialogOpen,
}: IMiniVariantDrawerProps) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [open, setOpen] = useState(true)
  ///const [drawerMenuTop, setDrawerMenuTop] = useState<IDrawerMenu[]>(defaultDrawerTop)
  const [drawerMenuBottom, setDrawerMenuBottom] = useState<IDrawerMenu[]>(
    defaultDrawerMenuBottom
  )
  const drawerMenuTop = useMemo<IDrawerMenu[]>(() => {
    if (role === 'admin') {
      return defaultDrawerTopAdmin
    } else {
      return defaultDrawerTop
    }
  }, [role])

  useEffect(() => {
    if (isMobile) {
      handleDrawerClose()
    } else {
      handleDrawerOpen()
    }
  }, [isMobile])

  useEffect(() => {
    setDrawerMenuBottom(
      defaultDrawerMenuBottom.map((menu) => {
        if (menu.text === 'Logout') {
          return {
            ...menu,
            onClick: handleLogoutDialogOpen,
          }
        }
        return menu
      })
    )
  }, [])

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position='fixed' open={open}>
        <Toolbar
          sx={{
            minHeight: { xs: '3em', sm: '3.5em' },
          }}
        >
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Box>
            <Link href='/official-receipt' style={{ textDecoration: 'none' }}>
              <Button
                sx={{
                  display: { xs: 'none', sm: 'block' },
                  color: 'primary.contrastText',
                }}
              >
                {name}
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant='permanent' open={open}>
        <DrawerHeader
          sx={{
            minHeight: { xs: '3em', sm: '3.5em' },
          }}
        >
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <DrawerSideNavList menus={drawerMenuTop} open={open} />
        <Divider />
        <DrawerSideNavList menus={drawerMenuBottom} open={open} />
      </Drawer>

      <Box
        component='main'
        sx={(theme) => ({
          flexGrow: 1,
          background: theme.palette.background.default,
          color: theme.palette.text.primary,
          height: '100vh',
          overflowY: 'auto',
        })}
      >
        <DrawerHeader />
        <Stack>{children}</Stack>
      </Box>
    </Box>
  )
}

export default MiniVariantDrawer
