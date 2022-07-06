import { Box, Typography, Grid } from "@mui/material";
import styles from "../styles/pastOrder";

const PastOrder = ({ order }) => {
	return (
		<Box sx={{ ...styles.root }}>
			<Grid
				container
				sx={{ ...styles.top }}
				xs={12}
				spacing={2}
				direction="row"
			>
				<Grid item xs={4}>
					<Typography variant="body2" color="text.secondary">
						Date: {order.date}
					</Typography>
				</Grid>
				<Grid item>
					<Typography variant="body2" color="text.secondary">
						Total: ${order.price}
					</Typography>
				</Grid>
			</Grid>
			<Grid
				container
				sx={{ ...styles.details }}
				xs={12}
				spacing={2}
				direction="row"
			>
				<Grid item xs={4}>
					<Box
						component="img"
						sx={{
							width: "100%",
							borderRadius: 0.5,
						}}
						src={order.product.image}
					/>
				</Grid>
				<Grid item>
					<Typography variant="h5"> {order.product.name}</Typography>
					<Typography variant="body2" color="primary.blue">
						{order.product.owner}
					</Typography>
				</Grid>
			</Grid>
		</Box>
	);
};

export default PastOrder;
