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
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

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

// TODO: Add a loading screen
export default function BusinessLanding() {
  const navigate = useNavigate();
  const navigateToCupons = () => {
    navigate('/business/coupons', {replace: true});
  };

  let labels = ['0-10', '10-25', '25-35', '35-50', '60+'];
  const [agesInfo, setAgesInfo] = useState(labels.map(() => Math.floor(Math.random() * 1000)));
  const [genders, setGender] = useState([12, 19, 3]);
  const [products, setProducts] = useState({
    'Red': 12, 
    'Blue': 19,
    'Yellow': 3,
    'Green': 5, 
    'Purple': 2,
    'Orange': 3
  });

  useEffect(() => {
    let age = {
      '0-10': 0,
      '10-25': 0,
      '25-35': 0,
      '35-50': 0,
      '60+': 0
    };

    let gender = {
      'male': 0,
      'female': 0,
      'other': 0
    }

    let products = {}

    axios.get(`${process.env.REACT_APP_API}/api/analytics/testBu`)
      .then(res => {
        
        let data = res.data;
        Object.keys(data).forEach((element) => {
          if (data[element].user.age < 10) {
            age['0-10'] += 1;
          }
          else if (data[element].user.age >= 10 && data[element].user.age < 25) {
            age['10-25'] += 1;
          }
          else if (data[element].user.age >= 25 && data[element].user.age < 35) {
            age['25-35'] += 1;
          }
          else if (data[element].user.age >= 35 && data[element].user.age < 50) {
            age['35-50'] += 1;
          }
          else { 
            age['60+'] += 1;
          }

          gender[data[element].user.gender] += 1;
          
          if(data[element].product.name in products) {
            products[data[element].product.name] += 1;
          }
          else {
            products[data[element].product.name] = 1;
          }

          setProducts(products);
          setGender(Object.values(gender));
          setAgesInfo(Object.values(age));
        });
      });
  }, []);
  
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
            <Doughnut data={{
              labels: ['Male', 'Female', 'Other'],
              datasets: [
                {
                  label: '# of Votes',
                  data: genders,
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                  ],
                  borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                  ],
                  borderWidth: 1,
                },
              ],
            }} />
          </Grid>
          <Grid item xs={6}>
            <b>Most sold products</b>
            <PolarArea data={{
              labels: Object.keys(products),
              datasets: [
                {
                  label: '# of Votes',
                  data: Object.values(products), 
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                    'rgba(255, 159, 64, 0.5)',
                  ],
                  borderWidth: 1,
                },
              ],
            }} />
          </Grid>
          <Grid item xs={12}>
            <b>User&apos;s Age</b>
            <Bar data={{
              labels,
              datasets: [
                {
                  label: 'Number of users in this age group',
                  data: agesInfo,
                  backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
              ],
            }} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}