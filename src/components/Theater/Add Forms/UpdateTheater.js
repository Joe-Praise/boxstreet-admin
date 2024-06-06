import React, { useEffect, useState } from 'react';
import '../stylesTheater/updateTheater.css';
import TheaterNav from '../Navigation/TheaterNav';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Layout from '../../Layout';

let MODE = 'PROD';
let LOCAL = 'http://localhost:5000';
let ONLINE = 'https://boxstreet.onrender.com';

let BASE_URL = MODE === 'PROD' ? ONLINE : LOCAL;

function UpdateTheater() {
	const { id } = useParams();

	const [updatedTheaterData, setUpdatedTheaterData] = useState({
		name: '',
		screen: 1,
	});

	useEffect(() => {
		axios
			.get(`${BASE_URL}/api/v1/theaters/${id}`)
			.then((response) => {
				const { name, screen } = response.data;
				setUpdatedTheaterData({ name, screen });
			})
			.catch((error) => {
				console.error('Error fetching theater data:', error);
			});
	}, [id]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUpdatedTheaterData({
			...updatedTheaterData,
			[name]: value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		let update_theater_url = `${BASE_URL}/api/v1/theaters/${id}`;
		axios
			.put(update_theater_url, updatedTheaterData)
			.then((response) => {
				alert('Theater updated successfully', response.data);
			})
			.catch((error) => {
				console.error('Error updating theater:', error);
			});
	};

	return (
		<div>
			<Layout>
				<div className='updateTheaterForm'>
					<form className='updateTheaterform' onSubmit={handleSubmit}>
						<h2>Update Theater</h2>
						<div className='updateTheaterform-group'>
							<label htmlFor='name'>Theater Name:</label>
							<input
								type='text'
								name='name'
								value={updatedTheaterData.name}
								onChange={handleChange}
							/>
						</div>
						<div className='updateTheaterform-group'>
							<label htmlFor='screen'>Number of Screens:</label>
							<input
								type='number'
								name='screen'
								value={updatedTheaterData.screen}
								onChange={handleChange}
							/>
						</div>
						<div className='updateTheaterform-group'>
							<button type='submit'>Submit Update</button>
						</div>
					</form>
				</div>
			</Layout>
		</div>
	);
}

export default UpdateTheater;
