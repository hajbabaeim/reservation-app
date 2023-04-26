import React from 'react';

interface Reservation {
  id: number;
  user: {
    name: string;
  };
  start_time: string;
  end_time: string;
}

interface ReservationListProps {
  selectedDate: Date;
  reservations: Reservation[];
}

const ReservationList: React.FC<ReservationListProps> = ({ selectedDate, reservations }) => {
  const filteredReservations = reservations.filter((r) => {
    const date = new Date(r.start_time);
    return (
      date.getFullYear() === selectedDate.getFullYear() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getDate() === selectedDate.getDate()
    );
  });

  return (
    <div>
      <h2>Reservations on {selectedDate.toDateString()}</h2>
      <ul>
        {filteredReservations.map((r) => (
          <li key={r.id}>
            {r.user.name} - {new Date(r.start_time).toLocaleTimeString()} →{' '}
            {new Date(r.end_time).toLocaleTimeString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReservationList;
