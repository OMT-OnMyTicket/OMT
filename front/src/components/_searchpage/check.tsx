'use client';
import styled from '../../styles/search_P_S/checkList.module.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const URL = process.env.NEXT_PUBLIC_URL;
const Check = () => {
  const accessToken: string | null = localStorage.getItem('Token');
  useEffect(() => {
    axios
      .get(`${URL}/api/v1/users/movies`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      .then((res) => {
        console.log(res);
      });
  });

  return (
    <div className={styled.CheckList}>
      <div>이 영화를 시청했습니다.</div>
      <div>내 인생작입니다.</div>
    </div>
  );
};
export default Check;
