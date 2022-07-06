import { Container, Typography, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import Page from '../../components/Page';
import Coupon from "../CliLandingPage/components/coupons";
import axios from 'axios';
import styles from "./styles/Coupon";


export default function Coupons() {
  const [coupons, setCoupons] = useState([]);

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
        <Typography variant="h4" sx={{ mb: 5 }}>
          Coupons
        </Typography>
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