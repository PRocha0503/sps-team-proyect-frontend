import { Container, Typography, Card, CardHeader, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import Page from '../../components/Page';
import { ProductTable } from '../../components/Product/index';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Products() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
		const getProducts = async () => {
			const req = await axios.get("http://localhost:8080/api/products/business/?owner_name=John's Candy");
			setProducts(req.data);
		};
		getProducts();
	}, []);

  return (
    <Page title="Products">
      <Container>
      <Card sx={{mb: 3, position: 'relative'}}>
          <CardHeader title={'Your Products'} subheader={'View your products here.'}
          action={<Button onClick={() => navigate('create')} sx={{mt: 2, mb: 2, textAlign: 'center'}} variant="contained" size='large'
          color='primary'>
            <Typography>
              Create Product
            </Typography>
          </Button>}/>
        </Card>
        <ProductTable products={products} />
      </Container>
    </Page>
  );
}