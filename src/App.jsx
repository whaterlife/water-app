import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Hero from "./pages/home";
import LeakReportForm from "./pages/home/LeakReportForm";
import PlumbersChecklist from "./pages/plist/PlumbersCheckList";
import Dashboard from "./pages/plumber-dashboard/index";
import UserSignup from "./pages/User/UserSignUp";
import LogIn from "./pages/User/UserLogin";
import UserOther from "./pages/User/UserOther";
import Sidebar from "./pages/plumber-dashboard/Sidebar";
import Plumbersignup from "./pages/plumber/PlumberSignUp";
import PlumberLogin from "./pages/plumber/PlumberLogin";
import PlumberList from "./pages/plist/PlumberList";


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
      path: '/sign',
      element: <UserSignup/>,
    },
     
    {
      path: '/list',
      element: <PlumberList/>
    },
    {
      path: '/side',
      element: <Sidebar />,
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
    {
      path: '/plumber',
      element: <Plumbersignup />,
    },
    {
      path: '/plogin',
      element: <PlumberLogin />,
    },
    {
      path: '/leak',
      element: <LeakReportForm />,
    },
    





  ]);

  return <RouterProvider router={router} />;
}

export default App;
