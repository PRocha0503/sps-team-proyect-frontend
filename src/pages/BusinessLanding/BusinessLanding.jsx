import { Button, Container, Typography } from '@mui/material';
import Page from '../../components/Page'
import { Chart as ChartJS, 
  ArcElement, 
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  RadialLinearScale,
  } from 'chart.js';
import { Doughnut, Bar, PolarArea } from 'react-chartjs-2';
import Grid from '@mui/material/Grid';
import dataAges from './dummy/ages';
import dataGender from './dummy/gender';
import dataProducts from './dummy/productsSold';
import { useNavigate } from 'react-router-dom';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement, 
  RadialLinearScale,
  Title,
  Tooltip, 
  Legend
);

export default function BusinessLanding() {
  const navigate = useNavigate();
  const navigateToCupons = () => {
    navigate('/business/coupons', {replace: true});
  };
  
  return (
    <Page title="Business Landing Page">
      <Container maxWidth="xl">
        <Grid container spacing={0}>
          <Grid item xs={10}>
            <Typography variant="h4" sx={{ mb: 5 }}>
              Dashboard
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Button
              onClick={() => {
                navigateToCupons();
              }}
            >
              See Coupons
            </Button>
          </Grid>
        </Grid>
        <Typography variant="h5" sx={{ mb: 5 }}>
          Users Demography
        </Typography>
        
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <b>User&apos;s Gender</b>
            <Doughnut data={dataGender} />
          </Grid>
          <Grid item xs={6}>
            <b>Most sold products</b>
            <PolarArea data={dataProducts} />
          </Grid>
          <Grid item xs={12}>
            <b>User&apos;s Age</b>
            <Bar data={dataAges} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}