import { ToastContainer } from 'react-toastify';
import { Outlet, ScrollRestoration } from 'react-router';
import Navbar from './Navbar';
import Footer from './Footer';
import { useSelector } from 'react-redux';
import AdminSidebar from './AdminSidebar';
import ManagerSidebar from './ManagerSidebar';
import Chat from '../../components/ui/Chat';
import CustomerSidebar from './CustomerSidebar';

const RootLayout = () => {
  const { role } = useSelector((state) => state.auth);  // Now inside a component
  const { isOpenCustomerSidebar } = useSelector((state) => state.reservations);  // Access sidebar state from reservations slice
  return (
    <div className="flex min-h-[125vh]">

      {role === "admin" && <AdminSidebar />}
      {role === "manager" && <ManagerSidebar />}
      {role === "customer" && isOpenCustomerSidebar && <CustomerSidebar />}

      {/* Main Content Wrapper */}
      <div className="flex flex-col w-full">
        <Navbar />
        {/* Page Content + Footer */}
        <div className="w-full flex-grow">
          <Outlet />
        </div>
        <Footer />
      </div>
      {role === "customer" && <Chat />}
      <ScrollRestoration />
      <ToastContainer />
    </div>
  );
};

export default RootLayout