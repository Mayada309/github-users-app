import { NavLink } from 'react-router';
import Searchbar from '../components/Searchbar';
import UserCard from '../components/UserCard';
import Pagination from '../components/Pagination';
import { useEffect } from 'react';
import { getAllUsers } from '../services/users';

function Home() {
  useEffect(() => {
    const getUsers = async () => {
      const Users = await getAllUsers();
      console.log(Users);
    };
    getUsers();
  }, []);
  return (
    <>
      <div className=''>
        {' '}
        <NavLink to={'/favorites'} end>
          <div>View Favorites</div>
        </NavLink>
        <Searchbar />
        <UserCard />
        <Pagination />
      </div>
    </>
  );
}

export default Home;
