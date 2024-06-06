import React, { useState, useEffect } from 'react';
import '../stylesTheater/theater.css';
import TheaterNav from '../Navigation/TheaterNav';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TheaterSideNav from '../Navigation/TheaterSideNav';
import Layout from '../../Layout';

const shows = [
	{
		id: 1,
		title: 'Spider-Man: Far From Home',
		genre: 'Action, Adventure, Sci-Fi',
		showingtime: '11:30am - 1:00pm',
		imageUrl:
			'https://media.istockphoto.com/id/506678292/photo/amazing-spider-man-action-figure.webp?s=2048x2048&w=is&k=20&c=XEWBvWPGeRdOww-iZnMWcjd48ns5CnLpdTP-wLYHDn4=',
		description:
			'Following the events of Avengers: Endgame, Spider-Man must step up to take on new threats in a world that has changed forever.',
	},
];

let MODE = 'PROD';
let LOCAL = 'http://localhost:5000';
let ONLINE = 'https://boxstreet.onrender.com';

let BASE_URL = MODE === 'PROD' ? ONLINE : LOCAL;

function TheaterHome() {
	const navigate = useNavigate();

	const [movieListing, setMovieListing] = useState(shows);
	const [genres, setGenre] = useState([]);
	const branch_id = localStorage.getItem('branch_id');

	const handleEditButtonClick = (movieId, movie) => {
		navigate(`/theater/update-movie/${movieId}`, {
			state: { movieData: movie },
		});
	};

	const handleMoviesClick = () => {
		navigate('/theater/add-movie');
	};

	const filterTime = (e) => {
		let index = 0;
		console.log(e);
		// for(let i=0;i<e.length;i++){
		//   let d = new Date(e[i]).getTime();
		//   let today = Date.now();
		//   if(d > today){
		//     index = i;
		//     break;
		//   }
		// }
		return [index];
	};
	useEffect(() => {
		let movie_schedule_url = `${BASE_URL}/api/v1/movies?branch_id=${branch_id}`;
		let genre_url = `${BASE_URL}/api/v1/genres`;

		axios.get(movie_schedule_url).then((res) => {
			let movies = res.data?.data;
			let data = movies?.map((e) => ({
				id: e._id,
				title: e?.name,
				genre: e?.movie_id?.genre,
				showingtime: filterTime(e.show_time),
				imageUrl: e?.image,
				description: e?.description,
			}));
			console.log(data);
			setMovieListing([...data]);
		});

		axios.get(genre_url).then((res) => {
			let data = res.data;
			let info = data?.map((e) => ({
				id: e._id,
				name: e?.name,
			}));
			setGenre([...info]);
		});
	}, [branch_id]);

	const [, setSelectedMovieTime] = useState('Select Movie Time');
	const [, setSelectedGenre] = useState('Genre');

	const handleDeleteButtonClick = (movieId) => {
		if (window.confirm('Are you sure you want to delete this movie?')) {
			axios
				.delete(`${BASE_URL}/api/v1/movies/${movieId}`)
				.then((response) => {
					window.reload();
					setMovieListing((prevMovie) => {
						const updatedMovies = prevMovie.filter(
							(movie) => movie.id !== movieId
						);
						return updatedMovies;
					});
				})
				.catch((error) => {
					console.error('Error Deleting Movie', error);
				});
		}
	};

	return (
		<Layout>
			<div className='theaterDashboard'>
				{/* <TheaterSideNav /> */}
				<div className='theater'>
					<div className='theaterDashHeader'>
						<h2> Theater Dashboard </h2>
						<input
							type='search'
							name=''
							placeholder='what are you looking for?'
							id=''
						/>
					</div>
					<div className='selectBtns'>
						<select
							className='select'
							name='movie time'
							onChange={(e) => setSelectedMovieTime(e.target.value)}
						>
							<option value='Select Movie Time'>Movie Time</option>
							<option value='11:30am - 1pm'>11:30am - 1:00pm</option>
							<option value='1:15pm - 2:45pm'>1:15pm - 2:45pm</option>
							<option value='3:30pm - 4:45pm'>3:30pm - 4:45pm</option>
							<option value='5:00pm - 6:50pm'>5:00pm - 6:50pm</option>
						</select>
						<select
							className='select'
							name='genre'
							onChange={(e) => setSelectedGenre(e.target.value)}
						>
							<option value='Genre'>Genre</option>
							<option value='Action'>Action</option>
							<option value='Adventure'>Adventure</option>
							<option value='Sci-Fi'>Sci-Fi</option>
							<option value='Animation'>Animation</option>
							<option value='Family'>Family</option>
							<option value='Drama'>Drama</option>
							<option value='Fantasy'>Fantasy</option>
							<option value='Comedy'>Comedy</option>
							<option value='Thriller'>Thriller</option>
							<option value='Mystery'>Mystery</option>
							<option value='Horror'>Horror</option>
							<option value='Romance'>Romance</option>
							<option value='Documentary'>Documentary</option>
							<option value='Music'>Music</option>
						</select>
					</div>
					<div className='tMovies'>
						{movieListing.length > 0 ? (
							movieListing.map((movie) => (
								<div className='tmovieBox' key={movie.id}>
									<Link to={`/theater/single-movie/${movie.id}`}>
										<img src={movie.imageUrl} alt={movie.title} />
									</Link>
									<div className='tmovieInfo'>
										<div className='cardDetails'>
											<h3>{movie.title}</h3>
											<span>{movie.genre}</span>
											<p>{movie.description}</p>
										</div>
										<div className='cardActions'>
											<button
												className='btnEdit'
												onClick={() => handleEditButtonClick(movie.id, movie)}
											>
												Edit
											</button>
											<button
												className='btnDelete'
												onClick={() => handleDeleteButtonClick(movie.id)}
											>
												Delete
											</button>
										</div>
									</div>
								</div>
							))
						) : (
							<div>
								<h1 style={{ width: '800px', marginBottom: '50px' }}>
									Welcome, please create movies for the theater below.
								</h1>

								<button className='addmoviesbtn' onClick={handleMoviesClick}>
									Add New Movie
								</button>
							</div>
						)}
					</div>
				</div>
			</div>
		</Layout>
	);
}

export default TheaterHome;
