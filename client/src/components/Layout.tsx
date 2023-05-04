import Header from './Header';
import { Outlet } from 'react-router-dom';

export default function Layout(): JSX.Element {
  return (
    <main className="p-4 flex flex-col min-h-screen">
      <Header />
      <Outlet />
    </main>
  );
}
