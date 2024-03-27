'use client'
import React from 'react'
import { IDrawerMenu } from '@/Interfaces'
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const DrawerSideNavList = ({
  menus,
  open,
}: {
  menus: IDrawerMenu[]
  open: boolean
}) => {
  const pathname = usePathname()

  return (
    <List>
      {menus.map((menu, index) => {
        return (
          <ListItem key={menu.text} disablePadding sx={{ display: 'block' }}>
            <Link href={menu.href} style={{ textDecoration: 'none' }}>
              <ListItemButton
                onClick={menu.onClick ?? undefined}
                sx={(theme) => ({
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  background:
                    pathname === menu.href
                      ? theme.palette.secondary.main
                      : 'unset',
                  color:
                    pathname === menu.href
                      ? theme.palette.secondary.contrastText
                      : theme.palette.text.primary,
                  '&:hover': {
                    background: theme.palette.secondary.light,
                    color: 'white',
                  },
                })}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {
                    <menu.icon
                      sx={{
                        color: pathname === menu.href ? 'white' : 'unset',
                      }}
                    />
                  }
                </ListItemIcon>
                <ListItemText
                  primary={menu.text}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </Link>
          </ListItem>
        )
      })}
    </List>
  )
}

export default DrawerSideNavList
