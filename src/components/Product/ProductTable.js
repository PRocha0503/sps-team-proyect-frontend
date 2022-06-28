import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import ProductCard from './ProductCard';

// ----------------------------------------------------------------------

ProductTable.propTypes = {
  products: PropTypes.array.isRequired
};

export default function ProductTable({ products, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {products.map((product) => (
        <Grid key={product.id} item xs={12} sm={6} md={3}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}