// ** MUI Imports

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import themeConfig from 'src/configs/themeConfig'

const Home = () => {

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title={`Selamat Datang di Aplikasi ${themeConfig?.templateName} 🚀`}></CardHeader>
          <CardContent>
            <Typography sx={{ mb: 2 }}>{themeConfig?.description}.</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default Home
