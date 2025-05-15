import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from "react-router";
import { Provider, useSelector } from "react-redux";  // Importing the Redux Provider
import createAppRouter from './router';
import store from './store/store';

// Create a query client for react-query
const queryClient = new QueryClient();

function AppWrapper() {
  const { userId, role, token } = useSelector((state) => state.auth);  // Now inside a component

  console.log(token);
  

  return (
    <QueryClientProvider client={queryClient}>  {/* Wrap with QueryClientProvider */}
      <RouterProvider router={createAppRouter(!!userId, role)} />  {/* Router for your app */}
    </QueryClientProvider>
  );
}

function App() {
  return (
    <Provider store={store}>  {/* Wrap with Provider for Redux */}
      <AppWrapper />  {/* This component now uses useSelector */}
    </Provider>
  );
}

export default App;
