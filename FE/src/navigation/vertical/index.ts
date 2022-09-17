// ** Icon imports
import HomeOutline from 'mdi-material-ui/HomeOutline'
import Jobs from 'mdi-material-ui/Briefcase'

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Home',
      icon: HomeOutline,
      path: '/home',
    }, 
    {
      title: 'Daftar Pekerjaan',
      icon: Jobs,
      path: '/jobs',
    },
  ]
}

export default navigation
