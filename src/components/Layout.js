import TheaterSideNav from './Theater/Navigation/TheaterSideNav';
import TheaterNav from './Theater/Navigation/TheaterNav';

const Layout = ({ children }) => {
	return (
		<div className='layoutNav'>
			<div className='layout-sideNav'>
				<TheaterSideNav />
				<TheaterNav />
			</div>
			<div className='layout-content'>{children}</div>
		</div>
	);
};

export default Layout;
