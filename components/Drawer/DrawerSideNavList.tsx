'use client'
import React from 'react'
import { IDrawerMenu, Role } from '@/Interfaces'
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Skeleton,
} from '@mui/material'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const ListItemSkeleton = ({
  role = 'staff'
}: {
  role?: Role
}) => {
  return (
    <>
      <ListItem>
        <ListItemButton>
          <ListItemText>
            <Skeleton />
          </ListItemText>
        </ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton>
          <ListItemText>
            <Skeleton />
          </ListItemText>
        </ListItemButton>
      </ListItem>

      {role === 'admin' && (
        <ListItem>
          <ListItemButton>
            <ListItemText>
              <Skeleton />
            </ListItemText>
          </ListItemButton>
        </ListItem>
      )}
    </>
  )
}

const DynamicLink = ({
  children,
  nextLink = false,
  onClick,
  href
}: {
  children: React.ReactNode,
  href: string,
  nextLink?: boolean,
  onClick?: () => void
}) => {

  return (
    <>
      {nextLink ? (
        <Link href={href} style={{ textDecoration: 'none' }}>
          {children}
        </Link>
      ) : (
        <a href={href} onClick={onClick} style={{ textDecoration: 'none' }}>
          {children}
        </a>
      )}
    </>
  )
}

const DrawerSideNavList = ({
  menus,
  open,
  role = 'staff'
}: {
  menus: IDrawerMenu[]
  open: boolean
  role?: Role
}) => {
  const pathname = usePathname()

  return (
    <List>
      {menus.length === 0 && <ListItemSkeleton role={role} />}
      {menus.map((menu, index) => {
        return (
          <ListItem key={menu.text} disablePadding sx={{ display: 'block' }}>
            <DynamicLink href={menu.href} onClick={menu.onClick} nextLink={!!menu.onClick ? false : true}>
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
            </DynamicLink>
          </ListItem>
        )
      })}
    </List>
  )
}

export default DrawerSideNavList
