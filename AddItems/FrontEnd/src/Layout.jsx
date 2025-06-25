import { Link, Outlet } from 'react-router-dom';

function Layout() {
  return (
    <>
      {/* This is like your house's menu bar */}
      <nav>
        <Link to="/">Food List</Link>
        <Link to="/addfood">Add Food</Link>
      </nav>

      {/* This is like your TV screen that keeps changing */}
      <Outlet />
    </>
  );
}

export default Layout;
