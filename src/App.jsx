import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./pages/Homepage";
import Footer from "./components/Footer";
import LeakReportForm from "./pages/Homepage/LeakReportForm";
import PlumberList from "./pages/Plumberlist";
import PlumbersChecklist from "./pages/Plumberlist/PlumbersCheckList";
import Dashboard from "./pages/plumber dashboard";
import Usersignup from "./pages/User/usersignup";
import LogIn from "./pages/User/userlogin";

function App() {
  const router = createBrowserRouter([
    {
      path: '/log',
      element: <LogIn />,
    },
    {
      path: '/',
      element: <Hero />,
    },
    {
      path: '/use',
      element: <Usersignup />,
    },
     
    {
      path: '/list',
      element: <PlumberList />,
    },
    {
      path: '/checklist',
      element: <PlumbersChecklist />,
    },
    {
      path: '/dash',
      element: <Dashboard />,
    },

    {
      path: '/useother',
      element: <UserOther />,
    },
   
    





  ]);

  return <RouterProvider router={router} />;
}

export default App;
