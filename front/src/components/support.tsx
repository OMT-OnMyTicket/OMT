'use client';
import Modal from '../components/modal';
import { useState } from 'react';
import styled from '../styles/support.module.css';

const support = () => {
  const [ModalOpen, setModalOpen] = useState(false);

  const handleClick = () => {
    setModalOpen(true);
  };

  return (
    <>
      <img
        src='/OMT_web.png'
        className={styled.container}
        onClick={handleClick}
      />

      {ModalOpen && <Modal setModalOpen={setModalOpen} />}
    </>
  );
};

export default support;
