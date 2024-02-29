import { Route, Routes } from 'react-router-dom';
import { Home } from './home';
import { Main } from './main';

const routes = [{ path: '/guardian-protocol-web-page', Page: Main },{ path: '/home', Page: Home }];

function Routing() {
  const getRoutes = () => routes.map(({ path, Page }) => <Route key={path} path={path} element={<Page />} />);

  return <Routes>{getRoutes()}</Routes>;
}

export { Routing };
