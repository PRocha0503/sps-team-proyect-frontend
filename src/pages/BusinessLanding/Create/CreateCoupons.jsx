import { Container, Typography, Box, Card, CardHeader, Button, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import Page from '../../../components/Page';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import backArrowIos from '@iconify/icons-eva/arrow-ios-back-outline';
import CouponForm from './CouponForm';

export default function CreateCoupons() {
    const navigate = useNavigate();

  return (
    <Page title="Create Coupons">
      <Container>
      <Card sx={{position: 'relative', mb: 3}}>
            <CardHeader title={'Create a coupon'}
            avatar={
                <IconButton
                color="secondary"
                onClick={() => navigate('/business/coupons')}
                >
                    <Icon icon={backArrowIos} width={30} height={30}/>
                </IconButton>
            }
            />
          </Card>
          <CouponForm />
      </Container>
    </Page>
  );
}