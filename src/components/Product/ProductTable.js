import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import ProductCard from './ProductCard';


ProductTable.propTypes = {
  products: PropTypes.array.isRequired
};

export default function ProductTable({ products, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {Object.keys(products).map((key, index) => {
					return (
						<Grid item xs={6} md={3}>
							<ProductCard product={products[key]} />
						</Grid>
					);
				})}
    </Grid>
  );
}