import './styles/createmovieschedule.css';
import { useEffect, useState } from 'react';
import { FcAddDatabase, FcAddImage } from 'react-icons/fc';
import DisplayMovieScheduleInfo from './DisplayMovieScheduleInfo';
import TheaterNav from '../../Theater/Navigation/TheaterNav';
import axios from 'axios';
import Layout from '../../Layout';

let MODE = 'PROD';
let LOCAL = 'http://localhost:5000';
let ONLINE = 'https://boxstreet.onrender.com';

let BASE_URL = MODE === 'PROD' ? ONLINE : LOCAL;

function MovieScheduleBooking() {
	let branch_id = localStorage.getItem('branch_id');
	let cinema_id = localStorage.getItem('cinema_id');

	const [value, onChange] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const [formInfo, setFormInfo] = useState({
		show_time: [],
		price: 0,
		movie_id: '',
		branch_id,
		cinema_id,
	});
	const [preview, setPreview] = useState({
		preview: [],
		previewFile: [],
		image: '',
	});

	const [movies, setMovies] = useState([]);

	useEffect(() => {
		let movie_url = `${BASE_URL}/api/v1/movies?branch_id=${branch_id}`;

		axios.get(movie_url).then((res) => {
			let info = res.data.data;
			let movieinfo = info?.map((e) => ({
				id: e._id,
				name: e.name,
			}));
			console.log(info);
			setMovies([...movieinfo]);
		});
	}, []);

	useEffect(() => {
		if (!preview.previewFile) return;
		let tmp = [];

		for (let i = 0; i < preview.previewFile.length; i++) {
			tmp.push(URL.createObjectURL(preview.previewFile[i]));
		}
		const objecturls = tmp;

		setPreview((prevState) => {
			return {
				...prevState,
				preview: objecturls,
			};
		});

		for (let i = 0; i < objecturls.length; i++) {
			return () => {
				URL.revokeObjectURL(objecturls[i]);
			};
		}
	}, [preview.image, preview.previewFile]);

	const handleMultiDates = (date) => {
		// const newDate = new Date(date).toISOString();
		const newDate = new Date(date).toLocaleString();
		const oldDate = formInfo.show_time;
		setFormInfo((prev) => {
			return {
				...prev,
				show_time: [...oldDate, newDate],
			};
		});
	};

	const inputChangeHandler = (e) => {
		let name = e.target.name;
		let value = e.target.value;
		if (name === 'image') {
			setPreview((prev) => {
				return {
					...prev,
					previewFile: e.target.files,
				};
			});
			let file = e.target.files[0];
			setPreview((prev) => {
				return {
					...prev,
					image: file,
				};
			});
		}
		setFormInfo({ ...formInfo, [name]: value });
	};

	// console.log(formInfo.show_time);
	const handleFormSubmittion = (e) => {
		e.preventDefault();

		axios
			.post(`${BASE_URL}/api/v1/movieschedule`, formInfo)
			.then((res) => {
				alert('Movie has been scheduled');
				setFormInfo((prevState) => {
					return {
						...prevState,
						show_time: [],
						price: 0,
					};
				});
			})
			.catch((err) => {
				console.error('Error in scheduling this movie:', err);
			});

		setIsLoading(true);
		setTimeout(() => {
			setIsLoading(false);
		}, 1000);
	};

	const [cinemaName, setCinemaName] = useState('');
	useEffect(() => {
		const cinemaUrl = `${BASE_URL}/api/v1/cinemas/${cinema_id}`;

		axios
			.get(cinemaUrl)
			.then((res) => {
				const cinemaData = res.data;
				if (cinemaData) {
					setCinemaName(cinemaData.name);
				}
				console.log(cinemaData);
			})
			.catch((err) => {
				console.error('Error fetching cinema name:', err);
			});
	}, [cinema_id]);

	const [branchName, setBranchName] = useState('');

	useEffect(() => {
		const branchUrl = `${BASE_URL}/api/v1/branches/${branch_id}`;

		axios
			.get(branchUrl)
			.then((res) => {
				const branchData = res.data;
				if (branchData) {
					setBranchName(branchData?.location_id?.name);
				}
				// console.log(branchName);
			})
			.catch((err) => {
				console.error('Error fetching branch name:', err);
			});
	}, [branch_id]);

	console.log('coming from value', value);

	return (
		<Layout>
			<div className='mainContent'>
				<div>
					<form className='movieScheduleForm'>
						<legend className='movieScheduleLegend'>
							Create Movie Schedule
							<p>Double click on the date picker container to choose a date</p>
						</legend>
						<div className='addtheaaterform-group'>
							<label htmlFor='movie_id'>Movie</label>
							{/* <input type="text" id="movie_id" name="movie_id" /> */}
							<select
								name='movie_id'
								id='movie_id'
								onChange={inputChangeHandler}
							>
								<option value=''>Select a movie</option>
								{movies.map((e) => (
									<option key={e.id} value={e.id}>
										{e.name}
									</option>
								))}
							</select>
						</div>
						<div className='addmovieform-group'>
							<button
								className='addcastBTN'
								type='button'
								onClick={
									value
										? () => handleMultiDates(value)
										: () => {
												return;
										  }
								}
								disabled={!value.length}
							>
								<FcAddDatabase /> Add more dates
							</button>
						</div>
						<div className='movieScheduleFormInputContainer'>
							<div className='addtheaaterform-group'>
								<label htmlFor='show_time'>Show time</label>
								<input
									type='datetime-local'
									id='show_time'
									name='show_time'
									onChange={(e) => onChange(e.target.value)}
									value={value}
								/>
							</div>
							<div className='addtheaaterform-group'>
								<label htmlFor='price' name='price'>
									Price
								</label>
								<input
									type='number'
									id='price'
									name='price'
									onChange={inputChangeHandler}
								/>
							</div>
						</div>
						<div>
							<DisplayMovieScheduleInfo
								preview={preview}
								formInfo={formInfo}
								onSetFormInfo={setFormInfo}
							/>
						</div>

						<div className='movieScheduleFormBtnContainer'>
							<button onClick={handleFormSubmittion}>
								{!isLoading ? 'Create Schedule' : 'Creating...'}
							</button>
						</div>
					</form>
				</div>
			</div>
		</Layout>
	);
}

export default MovieScheduleBooking;
