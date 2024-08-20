import styles from "./styles.module.css";
import { Link } from 'react-router-dom';
import BallotIcon from '@mui/icons-material/Ballot';
const Main = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	return (
		// <div className={styles.main_container}>
		// 	<nav className={styles.navbar}>
		// 	<span className='text-2xl'>
		// 		<a href="/" className='hover:text-lg'><BallotIcon fontSize="large"/></a>
		// 	</span>
		// 	<Link className='hover:text-[#333533] text-lg' to="/"> Home </Link>
		// 	<Link className='hover:text-[#333533] text-lg' to="/profile"> Profile </Link>
		// 	<Link className='hover:text-[#333533] text-lg' to="/manage-poll"> Manage&nbsp;Poll </Link>
		// 	<Link className='hover:text-[#333533] text-lg' to="/manage-user"> Manage&nbsp;User </Link>
		// 	<div className='w-full'></div>
		// 		<button className={styles.white_btn} onClick={handleLogout}>
		// 			Logout
		// 		</button>
		// 	</nav>
		// </div>
		<nav className='w-full px-4 py-2 bg-[#3bb19b] text-white flex place-items-center gap-x-6 sticky top-0 shadow-md'>
		<span className='text-2xl'>
			<a href="/" className='hover:text-lg'><BallotIcon fontSize="large"/></a>
		</span>
		<Link className='hover:text-[#333533] text-lg' to="/"> Home </Link>
		<Link className='hover:text-[#333533] text-lg' to="/profile"> Profile </Link>
		<Link className='hover:text-[#333533] text-lg' to="/manage-poll"> Manage&nbsp;Poll </Link>
		{/* <Link className='hover:text-[#333533] text-lg' to="/manage-user"> Manage&nbsp;User </Link> */}
		<div className='w-full'></div>
	
		<button onClick={handleLogout} type="button" class="text-white bg-gradient-to-r from-#3bb19b via-#3bb19b to-#3bb19b hover:bg-gradient-to-br focus:outline-none focus:ring-#3bb19b  shadow-lg shadow-blue-500/50 dark:shadow-lg font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2  hover:text-[#333533] ">LogOut</button>
	</nav>
	);
};

export default Main;
