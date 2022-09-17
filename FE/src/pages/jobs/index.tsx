// ** MUI Imports

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import FormControlLabel from '@mui/material/FormControlLabel'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import OutlinedInput from '@mui/material/OutlinedInput'
import Switch from '@mui/material/Switch'
import Briefcase from 'mdi-material-ui/Briefcase'
import SearchWeb from 'mdi-material-ui/Magnify'
import GlobeLight from 'mdi-material-ui/Earth'
import { Ref, useRef, useState } from 'react'
import TableJobs from 'src/views/jobs/Table'

interface Filter {
  description: string;
  location: string;
  type: boolean;
}

const Home = () => {
  const description: Ref<any> | undefined = useRef()
  const location: Ref<any> | undefined = useRef()
  const [checked, setChecked] = useState<boolean>(true)
  const [filter, setFilter] = useState<Filter>({
    description : '',
    location : '',
    type : true
  })

  const handleFilter = () => {
    const description_val: string = description?.current?.value
    const location_val: string = location?.current?.value
    const filter = {
      description: description_val,
      location: location_val,
      type: checked
    }
    setFilter(filter)
  }
  
return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title={`Daftar Pekerjaan`}></CardHeader>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Box
          sx={{
            p: 1,
            pb: 0,
            width: '100%',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', width: 1200 }}>
            <OutlinedInput
              inputRef={description}
              size='small'
              sx={{ mr: 5, mb: 2, minWidth: '40%' }}
              placeholder='Filter by title, benefit, companies, expertise'
              startAdornment={
                <InputAdornment position='start'>
                  <IconButton size='large' edge='start'>
                    <Briefcase fontSize='medium' />
                  </IconButton>
                </InputAdornment>
              }
            />
            <OutlinedInput
              inputRef={location}
              size='small'
              sx={{ mr: 5, mb: 2, minWidth: '40%' }}
              placeholder='Filter by city, state, zip code, or county'
              startAdornment={
                <InputAdornment position='start'>
                  <IconButton size='large' edge='start'>
                    <GlobeLight fontSize='medium' />
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormControlLabel
              control={<Switch color='success' size='medium' checked={checked} onChange={(event) => setChecked(event?.target?.checked)} />}
              labelPlacement='end'
              label='Full Time Only'
            />
          </Box>
          <Button
            sx={{ mb: 2 }}
            color='primary'
            variant='outlined'
            onClick={handleFilter}
            startIcon={<SearchWeb fontSize='small' />}
          >
            Search
          </Button>
        </Box>
      </Grid>
      <Grid item xs={12}>
              <TableJobs filter={filter}/>
      </Grid>
    </Grid>
  )
}

export default Home
