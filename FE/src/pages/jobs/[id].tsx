// ** MUI Imports

import Card from '@mui/material/Card'
import Back from 'mdi-material-ui/ArrowLeft'
import Button from '@mui/material/Button'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import { useEffect, useState } from 'react'
import { get, AxiosError } from 'src/axios'
import { useRouter } from 'next/router'
import CustomAvatar from 'src/@core/components/mui/avatar'
import Link from 'next/link'

const DetailJobs = () => {
    const [data, setData] = useState<any | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()
    const { id } = router?.query

    useEffect(() => {
        if (router?.isReady) {
            setLoading(true)
            get(`job_lists/${id}`).then(res => {
                setData(res)
                setLoading(false)
            }).catch((err: AxiosError) => {
                alert(Object(err.response?.data)?.message)
                setLoading(false)
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router?.isReady])
    if (!data || loading) return null

    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <Card>
                    <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography variant='h6'>
                            Detail Pekerjaan
                        </Typography>
                        <Button
                            color='primary'
                            variant='outlined'
                            onClick={() => router.back()}
                            startIcon={<Back fontSize='small' />}
                        >
                            Kembali
                        </Button>
                    </CardContent>
                </Card>

            </Grid>
            <Grid item xs={12}>
                <Card>
                    <CardContent>
                        <Typography variant='body2'>
                            {data?.type} / {data?.location}
                        </Typography>
                        <Typography variant='h6'>
                            {data?.title}
                        </Typography>
                        <Divider sx={{ mt: 3, mb: 4 }} />
                        <Grid container spacing={6} >

                            <Grid item xs={8}>
                                <Typography variant='body2'>
                                    <div dangerouslySetInnerHTML={{ __html: data?.description }} />
                                </Typography>
                            </Grid>

                            <Grid item xs={4}>
                                <Grid container>
                                    <Grid xs={12} item>
                                        <Card>
                                            <CardContent>
                                                <Typography variant='h6'>
                                                    {data?.company}
                                                </Typography>
                                                <Divider />
                                                <CustomAvatar src={data?.company_logo} sx={{ borderRadius: 0, width: '100%', height: '100%' }} />
                                                <Divider />
                                                <Typography variant='body2'>
                                                    <Link href={data?.company_url}>{data?.company_url}</Link>
                                                </Typography>
                                            </CardContent>

                                        </Card>
                                    </Grid>
                                    <Grid item xs={12} sx={{ mt: 10 }}>
                                        <Card>
                                            <CardContent >
                                                <Typography variant='h6'>
                                                    How To Apply
                                                </Typography>
                                                <Divider />
                                                <Typography variant='body2'>
                                                    Email your resume to <Link href={data?.company_url}>{data?.company_url}</Link><br />
                                                    apply direct at :
                                                    <div dangerouslySetInnerHTML={{ __html: data?.how_to_apply }} />
                                                </Typography>
                                            </CardContent>

                                        </Card>
                                    </Grid>
                                </Grid>
                            </Grid>

                        </Grid>
                    </CardContent>
                </Card>

            </Grid>
        </Grid>
    )
}

export default DetailJobs
