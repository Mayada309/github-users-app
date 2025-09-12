import { NavLink } from 'react-router';

function App() {
  return (
    <>
      <div className=''>
        {' '}
        <NavLink to={'/favorites'} end>
          <div>View Favorites</div>
        </NavLink>
      </div>
    </>
  );
}

export default App;
