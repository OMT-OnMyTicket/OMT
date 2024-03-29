import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import styled from '../../styles/ticketingP_S/select.module.css';

const Test: React.FC = () => {
  // const initialDate =
  //   localStorage.getItem('예매날짜') || new Date().toISOString();  기본값 Today

  const [startDate, setStartDate] = useState<Date | null>();
  // new Date(initialDate) 기본값 Today

  const handleDateChange = (date: Date | null) => {
    setStartDate(date);

    if (date) {
      // Format the date to "YYYY-MM-DD"
      const formattedDate = date.toISOString().split('T')[0];

      localStorage.setItem('예매날짜', formattedDate);
    }
  };

  const twoWeeksLater = new Date();
  twoWeeksLater.setDate(twoWeeksLater.getDate() + 14);

  return (
    <DatePicker
      selected={startDate}
      onChange={handleDateChange}
      locale={ko}
      dateFormat='yyyy년 MM월 dd일'
      minDate={new Date()}
      maxDate={twoWeeksLater}
      className={styled.DatePicker}
      placeholderText='날짜를 선택해주세요.'
    />
  );
};

export default Test;
