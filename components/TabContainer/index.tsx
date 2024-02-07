import React from 'react'
import { Box, Stack, Tab, Tabs } from '@mui/material'
import { ITabContainerProps, ITabPanelProps } from '@/Interfaces'

export function CustomTabPanel(props: ITabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Stack p={2} pt={4}>{children}</Stack>
      )}
    </div>
  )
}

const TabContainer = ({ tabs, children, currentTab, handleChange }: ITabContainerProps) => {
  return (
    <Box sx={{ maxWidth: '100%', bgcolor: 'background.paper' }}>
      <Tabs
        value={currentTab}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ borderBottom: 1, borderColor: 'divider' }}
      >
        {tabs?.map((tab, index) => (
          <Tab key={tab.index} label={tab.label} />
        ))}
      </Tabs>
      {children}
    </Box>
  )
}

export default TabContainer