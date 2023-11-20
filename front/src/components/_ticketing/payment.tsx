'use client';
import styled from '../../styles/ticketingP_S/pay.module.css';
import { useEffect, useRef, useState } from 'react';
import {
  loadPaymentWidget,
  PaymentWidgetInstance
} from '@tosspayments/payment-widget-sdk';
import { nanoid } from 'nanoid';
const clientKey = 'test_ck_Z1aOwX7K8me1gxz2JG98yQxzvNPG';
const customerKey = 'YbX2HuSlsC9uVJW6NMRMj';

const Payment = () => {
  const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null);
  const paymentMethodsWidgetRef = useRef<ReturnType<
    PaymentWidgetInstance['renderPaymentMethods']
  > | null>(null);

  const [Users, setUsers] = useState('');
  const [MovieTitle, setMovieTitle] = useState('');
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const storedMovieTitle = localStorage.getItem('영화');
    const storedUsers = localStorage.getItem('인원수');
    const storedPrice = Number(storedUsers) * 12000;

    if (storedMovieTitle) {
      setMovieTitle(storedMovieTitle);
    }
    if (storedUsers) {
      setUsers(storedUsers);
    }

    if (storedPrice) {
      setPrice(storedPrice);
    }
    (async () => {
      const paymentWidget = await loadPaymentWidget(clientKey, customerKey);
      paymentWidget.renderAgreement('#agreement');
      const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
        '#payment-widget',
        price
      );

      paymentWidgetRef.current = paymentWidget;
      paymentMethodsWidgetRef.current = paymentMethodsWidget;
    })();
  }, [Users]);

  useEffect(() => {
    const paymentMethodsWidget = paymentMethodsWidgetRef.current;

    if (paymentMethodsWidget == null) {
      return;
    }

    paymentMethodsWidget.updateAmount(
      price,
      paymentMethodsWidget.UPDATE_REASON.COUPON
    );
  }, [price]);

  const handlePayment = async () => {
    const paymentWidget = paymentWidgetRef.current;

    if (paymentWidget) {
      try {
        const orderId = nanoid(); // 고유한 orderId 생성
        const orderName = `${MovieTitle} 성인${Users}명`;
        const customerName = 'OMT';
        const customerEmail = 'tpgns2289@naver.com';
        const successUrl = `${window.location.origin}/ticketing/pay/success`;
        const failUrl = `${window.location.origin}/fail`;

        await paymentWidget.requestPayment({
          orderId,
          orderName,
          customerName,
          customerEmail,
          successUrl,
          failUrl
        });
      } catch (err) {
        alert(err);
      }
    }
  };

  return (
    <div className={styled.Payment_Layout}>
      <div className={styled.Charge}>{price}원</div>
      <div id='payment-widget' />
      <div id='agreement' />
      <div className={styled.Btn_Layout}>
        <button onClick={handlePayment} className={styled.Pay_Btn}>
          결제하기
        </button>
      </div>
    </div>
  );
};
export default Payment;
