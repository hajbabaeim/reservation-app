import React, { useState } from 'react'
import { useSession, SessionProvider } from 'next-auth/react'
import Navbar from '../components/Navbar'
import CustomCalendar from '../components/Calendar'
import ReservationList from '../components/ReservationList'
import ReservationForm from '../components/ReservationForm'
import { useQuery } from 'react-query'
import { useUser } from '@auth0/nextjs-auth0/client'

const fetchReservations = async () => {
  const response = await fetch('/api/reservations')
  return await response.json()
}

const Home: React.FC = () => {
  const session = true
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const {
    data: reservations,
    /*isLoading,*/ isError,
    isSuccess,
    refetch,
  } = useQuery(['reservations'], () => fetchReservations())
  const { user, error, isLoading } = useUser()

  // const renderResult = () => {
  //   if (isLoading) {
  //     return <p>isLoading</p>;
  //   }

  //   if (isError) {
  //     return <p>isError</p>;
  //   }

  //   if (isSuccess) {
  //     return <p>Success</p>;
  //   }

  //   return <></>;
  // };
  const renderResult = () => {
    if (isLoading) return <div>Loading...</div>
    if (error) return <div>{error.message}</div>

    if (user) {
      return (
        <div>
          Welcome {user.name}! <a href="/api/auth/logout">Logout</a>
        </div>
      )
    }
    return <></>
  }

  const handleDateChange = (date: Date | Date[]) => {
    setSelectedDate(date instanceof Date ? date : null)
  }

  return (
    <div>
      <Navbar />
      <>
        {renderResult()}
        <CustomCalendar
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
        />
        {selectedDate && (
          <>
            <ReservationList
              selectedDate={selectedDate}
              reservations={reservations || []}
            />
            <ReservationForm />
          </>
        )}
      </>
    </div>
  )
}

export default Home
