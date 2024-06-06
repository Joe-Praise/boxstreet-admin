import React, { useEffect, useState } from 'react';
import '../stylesTheater/seatLayout.css';
import TheaterNav from '../Navigation/TheaterNav';
import useCategoryColors from '../../../CategoryColors';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Layout from '../../Layout';

function ViewSeatingLayer() {
	const [col_matrix_1, setColMatrix1] = useState([[{}]]);
	const [col_matrix_2, setColMatrix2] = useState([[{}]]);
	const colors = useCategoryColors();
	const [categories, setCategory] = useState([]);
	const cinema_id = localStorage.getItem('cinema_id');

	let MODE = 'PROD';
	let LOCAL = 'http://localhost:5000';
	let ONLINE = 'https://boxstreet.onrender.com';

	let BASE_URL = MODE === 'PROD' ? ONLINE : LOCAL;
	let { id } = useParams();
	let theater_id = id;
	let [capacity, setCapacity] = useState(0);

	const TransformCategory = (arr, colors) => {
		const arrCopy = arr;
		arrCopy.forEach((el, i) => {
			el.color = colors[i];
		});
		setCategory(arrCopy);
	};

	const confirmSeatCategory = (seat, categories) => {
		const updatedSeat = seat;
		categories?.forEach((el) => {
			if (el.name === updatedSeat?.category_id?.name)
				updatedSeat.category_id.color = el.color;
		});
		return updatedSeat;
	};

	useEffect(() => {
		let left_seats = {};
		let right_seats = {};

		let category_url = `${BASE_URL}/api/v1/categories?cinema_id=${cinema_id}`;

		axios
			.get(category_url)
			.then((res) => {
				let data = res.data;
				TransformCategory(data, colors);
			})
			.catch((err) => {
				console.log(err.message);
			});

		let seat_url = `${BASE_URL}/api/v1/theaters/${theater_id}/seats-summary`;
		axios.get(seat_url).then((res) => {
			let data = res.data;

			for (let i = 0; i < data.col_matrix_1.length; i++) {
				let d = data.col_matrix_1[i];
				capacity += 1;
				if (!left_seats[d.row]) {
					left_seats[d.row] = [d];
				} else {
					left_seats[d.row].push(d);
				}
			}

			for (let i = 0; i < data.col_matrix_2.length; i++) {
				let d = data.col_matrix_2[i];
				// capacity += 1
				if (!right_seats[d.row]) {
					right_seats[d.row] = [d];
				} else {
					right_seats[d.row].push(d);
				}
			}

			setCapacity(capacity);
			setColMatrix1(Object.values(left_seats));
			setColMatrix2(Object.values(right_seats));
		});
	}, []);

	// console.log('categories', categories);

	return (
		<Layout>
			{/* <div> */}
			<div>
				<div className='vs-container'>
					<div className='vs-container-seat'>
						<p className='vs-choose-seat-text'>Seat Type</p>
						{/* <div className='vs-seat-side'>
							<span className='vs-seat-vvip'></span>
							<p>VVIP</p>
						</div>
						<div className='vs-seat-side'>
							<span className='vs-seat-vip'></span>
							<p>VIP</p>
						</div>
						<div className='vs-seat-side'>
							<span className='vs-seat-regular'></span>
							<p>Regular</p>
						</div> */}
						{categories?.map((el, i) => (
							<div className='seat-side' key={el._id}>
								<span
									className='seat-element'
									style={{ background: `${el.color}` }}
								></span>
								<p>{el.name.toUpperCase()}</p>
							</div>
						))}
					</div>
					<div className='container-col1'>
						<div className='col-flex'>
							<div className='box-line'>
								<p className='line'></p>
							</div>
							<div className='box-container'>
								<div className='main-boxx'>
									<div className='box1'>
										{col_matrix_1.map((arr, i1) => {
											return (
												<div className='box1-col1' key={i1}>
													{arr.map((c, i2) => {
														const color = confirmSeatCategory(c, categories);
														// const angle = (i2 / arr.length) * Math.PI;
														// const radius = 70;
														// const top = radius * Math.sin(angle);
														// const left = radius * Math.cos(angle);

														return (
															<p
																style={{
																	border: `0.0625rem solid ${color?.category_id?.color}`,
																	background: `${
																		c.is_booked && c.is_active
																			? color.category_id.color
																			: ''
																	}`,
																	// position: 'absolute',
																	// top: '50%', // Center vertically
																	// left: '50%', // Center horizontally
																	// transform: `translate(${left}px, ${top}px)`,
																	// rotate: '220deg',
																}}
																className={
																	c.is_booked
																		? `${c?.category_id?.name} col1 booked`
																		: `${c?.category_id?.name} col1`
																}
																key={i2}
															>
																<span></span>
															</p>
														);
													})}
												</div>
											);
										})}
									</div>
									<div className='box2'>
										{col_matrix_2.map((arr, i1) => {
											return (
												<div className='box2-col2' key={i1}>
													{arr.map((c, i2) => {
														const color = confirmSeatCategory(c, categories);
														return (
															<p
																style={{
																	border: `0.0625rem solid ${color?.category_id?.color}`,
																	background: `${
																		c.is_booked && c.is_active
																			? color.category_id.color
																			: ''
																	}`,
																}}
																className={
																	c.is_booked
																		? `${c?.category_id?.name} col2 booked`
																		: `${c?.category_id?.name} col2`
																}
																key={i2}
															>
																<span></span>
															</p>
														);
													})}
												</div>
											);
										})}
									</div>
								</div>
								<div>
									<div className='vs-total'>
										<h3 className='vs-totalh'>Theater Capacity : {capacity}</h3>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* </div> */}
		</Layout>
	);
}

export default ViewSeatingLayer;
