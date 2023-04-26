import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

interface CalendarProps {
  selectedDate: Date | null;
  onDateChange: (date: Date | Date[]) => void;
}

const CustomCalendar: React.FC<CalendarProps> = ({ selectedDate, onDateChange }) => {
  return <Calendar onChange={() => onDateChange} value={selectedDate} />;
};

export default CustomCalendar;
