// ** React Imports
import { ReactNode } from 'react'

// ** MUI Imports
import { Theme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import Box from '@mui/material/Box'

// ** Layout Imports
// !Do not remove this Layout import
import Layout from 'src/@core/layouts/Layout'

// ** Navigation Imports
// import VerticalNavItems from 'src/navigation/vertical'
// import HorizontalNavItems from 'src/navigation/horizontal'

import Heart from 'mdi-material-ui/Heart'

// ** Component Import
// Uncomment the below line (according to the layout type) when using server-side menu
import VerticalNavItems from 'src/navigation/vertical'

import VerticalAppBarContent from './components/vertical/AppBarContent'

// ** Hook Import
import { useSettings } from 'src/@core/hooks/useSettings'
import themeConfig from 'src/configs/themeConfig'

interface Props {
  children: ReactNode
}

const UserLayout = ({ children }: Props) => {
  // ** Hooks
  const { settings, saveSettings } = useSettings()

  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'))
  
return (
    <Layout
      hidden={hidden}
      settings={settings}
      saveSettings={saveSettings}
      footerContent={() => {
        return (
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
              {`© ${new Date().getFullYear()} ${themeConfig.templateName}. Crafted with`}&nbsp;
              <Heart fontSize='small' color='error' />
              &nbsp;by Yahya Abdul Hamid
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>V. 22.09.17-01</Box>
          </Box>
        )
      }}
      { ...{
            verticalNavItems: VerticalNavItems(),
            verticalAppBarContent: props => (
              <VerticalAppBarContent
                hidden={hidden}
                settings={settings}
                saveSettings={saveSettings}
                toggleNavVisibility={props.toggleNavVisibility}
              />
            )
          }}
    >
      {children}
    </Layout>
  )
}

export default UserLayout



