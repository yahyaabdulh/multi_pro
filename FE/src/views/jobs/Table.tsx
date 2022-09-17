import { Card, CardContent } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import moment from 'moment'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { get } from 'src/axios'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(58,62,91,255)' : theme.palette.customColors.tableHeaderBg,
        color: theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.grey[600],
        padding: 10,
        fontSize: 12,
        fontWeight: 400
    },
    [`&.${tableCellClasses.footer}`]: {
        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(58,62,91,255)' : theme.palette.customColors.tableHeaderBg,
        color: theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.grey[600],
        fontSize: 12,
        fontWeight: 400
    }
}))

interface Props {
    description: string;
    location: string;
    type: boolean;
}
const TableJobs = ({ filter }: { filter: Props }) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [data, setData] = useState<any[]>([])
    const [page, setPage] = useState<number>(1)
    const [hasMore, setHasMore] = useState<boolean>(true)

    const fetchTableData = useCallback(
        async (page_number: number, search: any) => {
            setLoading(true)
            await get('/job_lists', {
                params: {
                    per_page: 5,
                    page: page_number,
                    sort: 'title',
                    order: 'asc',
                    ...search
                }
            })
                .then(response => {
                    setData(prevState => {
                        return [...prevState, ...response?.data]
                    })
                    response?.total_pages === response?.page && setHasMore(false)
                    setLoading(false)
                })
                .catch(err => {
                    alert(err.message)
                    setLoading(false)
                })
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    )

    useEffect(() => {
        setData([])
        setHasMore(true)
        setPage(1)
        fetchTableData(1, filter)
    }, [fetchTableData, filter])

    const fetchMoreData = () => {
        const next_page = page + 1
        setPage(next_page)
        fetchTableData(next_page, filter)
    }

    return (
        <Card>
            <CardContent>
                <Table aria-label='simple table'>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>
                                Job List
                            </StyledTableCell>
                            <StyledTableCell >

                            </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {loading ? (
                            <TableRow
                                sx={{
                                    '&:last-of-type td, &:last-of-type th': {
                                        border: 0
                                    }
                                }}
                            >
                                <TableCell sx={{ p: 0 }} colSpan={2}>
                                    <Box
                                        sx={{
                                            height: '50vh',
                                            display: 'flex',
                                            alignItems: 'center',
                                            flexDirection: 'column',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <CircularProgress disableShrink size={60} />
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ) : (
                            ''
                        )}

                        {!loading && data?.map((row, index) => (
                            <TableRow
                                key={index}
                                sx={{
                                    '&:last-of-type td, &:last-of-type th': {
                                        border: 0
                                    }
                                }}
                            >
                                <TableCell sx={{ p: 0 }}>
                                    <Link href={`/jobs/${row?.id}`} passHref>
                                        <Typography component={'a'} lineHeight={1.5} variant='body1' color='primary' sx={{ fontWeight: 500 }}>
                                            {row?.title}
                                        </Typography>
                                    </Link>
                                    <Typography lineHeight={1.5} variant='body2' sx={{ color: 'text.primary', display: 'flex' }}>
                                        {row?.company} -
                                        <Typography lineHeight={1.5} variant='body2' color={'green'} sx={{ ml: 2 }}>
                                            {row?.type}
                                        </Typography>
                                    </Typography>

                                </TableCell>
                                <TableCell sx={{ p: 0 }} align='right'>
                                    <Typography lineHeight={1.5} variant='body1' sx={{ color: 'text.primary' }}>
                                        {row?.location}
                                    </Typography>
                                    <Typography lineHeight={1.5} variant='body1' color={'gray'} >
                                        {moment(row?.created_at).format('DD-MM-YYYY, hh:mm')}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                        {hasMore && data?.length ? <TableRow
                            sx={{
                                '&:last-of-type td, &:last-of-type th': {
                                    border: 0
                                }
                            }}
                        >
                            <TableCell sx={{ p: 0 }} align='center' colSpan={2} >
                                <Button variant='contained' color='primary' fullWidth onClick={fetchMoreData}>
                                    More Jobs
                                </Button>
                            </TableCell>
                        </TableRow> : ''}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

export default TableJobs;