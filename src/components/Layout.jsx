import {Outlet, NavLink, Link } from "react-router";

function Layout() {
    return ( <>
    <header>
      <NavLink to="/" className={({ isActive }) => isActive ? "active" : "" }>Задачи</NavLink>      
      <NavLink to="/categories" className={({ isActive }) => isActive ? "active" : "" }>Категории</NavLink>
      {/* <NavLink to="/contacts" className={({ isActive }) => isActive ? "active" : "" }>Contacts</NavLink>    
      <NavLink to="/forms" className={({ isActive }) => isActive ? "active" : "" }>Forms</NavLink>     */}
    </header>

    <Outlet/>

    {/* <footer>Footer</footer> */}
    </> );
}

export default Layout;