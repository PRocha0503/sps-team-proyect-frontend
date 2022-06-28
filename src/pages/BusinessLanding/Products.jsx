import { Container, Typography } from '@mui/material';
import Page from '../../components/Page';
import { ProductTable } from '../../components/Product/index';
import products from './dummy/products'

export default function Products() {

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