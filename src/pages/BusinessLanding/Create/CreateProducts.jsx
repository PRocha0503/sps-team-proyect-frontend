import { 
    Container, 
    Typography, 
    Box, 
    Card, 
    CardHeader, 
    Button, 
    IconButton,
    TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import Page from '../../../components/Page';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import backArrowIos from '@iconify/icons-eva/arrow-ios-back-outline';
import ProductForm from './ProductForm';

export default function CreateProducts() {
    const navigate = useNavigate();
   
  return (
    <Page title="Create Products">
      <Container>
      <Card sx={{position: 'relative', mb: 3}}>
            <CardHeader title={'Create a product'}
            avatar={
                <IconButton
                color="secondary"
                onClick={() => navigate('/business/products')}
                >
                    <Icon icon={backArrowIos} width={30} height={30}/>
                </IconButton>
            }
        />
        </Card >
        <ProductForm />
      </Container>
    </Page>
  );
}