import { Container, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import Page from '../../components/Page';
import { ProductTable } from '../../components/Product/index';
import axios from 'axios';

export default function Products() {
  const [products, setProducts] = useState([]);

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
        <Typography variant="h4" sx={{ mb: 5 }}>
          Products
        </Typography>
        <ProductTable products={products} />
      </Container>
    </Page>
  );
}