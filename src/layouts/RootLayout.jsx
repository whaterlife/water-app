
import Navbar from '../components/Navbar'
import Footer from '../components/Footer';

const RootLayout = ({children}) => {
  return (
    <div>
        <Navbar/>
        <div>{children}</div>
      <Footer />
        </div>
  );
};

export default RootLayout;