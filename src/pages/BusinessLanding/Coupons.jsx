import { Container, Typography, Box, Card, CardHeader, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import Page from '../../components/Page';
import Coupon from "../CliLandingPage/components/coupons";
import axios from 'axios';
import styles from "./styles/Coupon";
import { useNavigate } from 'react-router-dom';


export default function Coupons() {
  const [coupons, setCoupons] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getCoupons = async () => {
        const req = await axios.get("http://localhost:8080/api/coupons/owner/?owner=John's Candy");
        setCoupons(req.data);
		};
		getCoupons();
	}, []);

  return (
    <Page title="Coupons">
      <Container>
      <Card sx={{mb: 3, position: 'relative'}}>
          <CardHeader title={'Your Coupons'} subheader={'View your coupons here.'}
          action={<Button onClick={() => navigate('create')} sx={{mt: 2, mb: 2, textAlign: 'center'}} variant="contained" size='large'
          color='primary'>
            <Typography>
              Create Coupon
            </Typography>
          </Button>}/>
        </Card>
        <Box
            sx={{
                ...styles.couponsContainer,
            }}
		>
            {Object.keys(coupons).map((key, index) => {
                return <Coupon item={coupons[key]} />;
            })}
        </Box>
      </Container>
    </Page>
  );
}