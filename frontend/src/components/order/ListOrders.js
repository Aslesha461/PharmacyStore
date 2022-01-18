import React,{Fragment,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {MDBDataTable} from 'mdbreact'
import Loader from '../layouts/Loader'
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {myOrder,clearErrors} from '../../actions/orderActions'
import Metadata from "../layouts/Metadata";

const ListOrders = () => {

	const alert = useAlert();
  const dispatch = useDispatch();

    const { loading, error, orders } = useSelector(state => state.myOrders);
    console.log(orders)
		
		useEffect(() => {
			
			dispatch(myOrder());
			//console.log(orders);

			if (error) {
					alert.error(error);
					dispatch(clearErrors())
			}
	}, [dispatch, alert, error]);

	const setOrders = () => {
		const data = {
			columns: [
					{
							label: 'Order ID',
							field: 'id',
							sort: 'asc'
					},
					{
							label: 'Num of Items',
							field: 'numOfItems',
							sort: 'asc'
					},
					{
							label: 'Amount',
							field: 'amount',
							sort: 'asc'
					},
					{
							label: 'Status',
							field: 'status',
							sort: 'asc'
					},
					{
							label: 'Actions',
							field: 'actions',
							sort: 'asc'
					},
			],
			rows: []
	}
	//console.log(orders);
	orders.forEach(order => {
		data.rows.push({
				id: order._id,
				numOfItems: order.orderItems.length,
				amount: `$${order.TotalPrice}`,
				status: order.orderStatus && String(order.orderStatus).includes('Delivered')
						? <p style={{ color: 'green' }}>{order.orderStatus}</p>
						: <p style={{ color: 'red' }}>{order.orderStatus}</p>,
				actions:
						<Link to={`/order/${order._id}`} className="btn btn-primary">
								<i className="fa fa-eye"></i>
						</Link>
		})
})
return data;
}

	return (
		<Fragment>
			<Metadata title={'My Orders'} />
			<h1 className="my-5">My Orders</h1>
			{loading
			?<Loader/>
			:(
				<MDBDataTable
                    data={setOrders()}
                    className="px-3"
                    bordered
                    striped
                    hover
                />
			)
			
		   }
			
		</Fragment>
	)
}

export default ListOrders
