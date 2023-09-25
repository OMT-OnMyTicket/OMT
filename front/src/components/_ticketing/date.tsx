import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import styled from '../../styles/ticketingP_S/select.module.css';

const Test: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date | null) => {
    setStartDate(date);
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
