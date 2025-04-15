'use client'
import { DatePicker } from '@mui/x-date-pickers'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Dayjs } from 'dayjs'
import { useState } from 'react'


export default function DateReserve({onDateChange, defaultDate}:{onDateChange:Function, defaultDate?: Dayjs|null}) {

    const [reserveDate, setReserveDate] = useState<Dayjs|null>(defaultDate || null);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker 
            className="bg-white"
            value={reserveDate}
            onChange={(value) => {setReserveDate(value); onDateChange(value)}}/>
        </LocalizationProvider>
    )
}