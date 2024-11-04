import { useState } from "react"
import { Eye,EyeOff } from "lucide-react"
import { Link } from "react-router-dom"
import { useNavigate} from "react-router-dom"
import RootLayout from "../../layouts/RootLayout"
import Swal from "sweetalert2"


const Plumbersignup = () => {
  const [loading, setLoading] = useState(false)


  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();// prevent the page from reloading
    try {
      // Prepare a data to be sent to the backend
      setLoading(true)
      const formData = new FormData(event.target); // takes data from the form
      const buisnessname = formData.get("buisnessname");
      const firstname = formData.get("firstname");
      const lastname = formData.get("lastname");
      const phone = formData.get("phone");
      const location = formData.get("location");
      const email = formData.get("email");
      const password = formData.get("password");
      const confirmpassword = formData.get("confirmpassword");

      //check if passwords match
      // if (password!== confirmpassword)


      //if key and value are same pick one  eg firstname , if not then state both sepearte with a colon(:)eg firsrname:firstname, 
      const payload = { buisnessname :buisnessname, firstname: firstname, lastname: lastname,  phone: phone, location: location, email: email, password: password }
      const response = await apiSignup(payload);
      console.log(response.data);

      // Show a success notification
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        text: 'You have successfully registered!',
      });

      navigate("/log") // takes user to the login page after a successful registration

    } catch (error) {
      console.log(error);

      // Show an error notification
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: 'There was an error during registration. Please try again.',
      });

    } finally {
      setLoading(false)
    }



  }
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  return (
    <RootLayout>
      <div className='school'>

        <div className="min-h-screen py-12">
          <div className="bg-white-300 flex items-center justify-center">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-2xl shadow-red-600">
              {/* Form Title */}
              <h2 className="text-4xl font-extrabold text-center text-orange-800 mb-6">Plumber Signup</h2>

              {/* SignUP Form */}
              <form className="space-y-4"
                onSubmit={handleSubmit}>
               <div>
                  <label htmlFor="buisnessname" className="block text-red-700 text-sm font-bold mb-2">Buisness Name</label>
                  <input name="buisnessname" type="buisnessname" id="buisnessname" placeholder="Enter BuisnessName" className="w-full p-2 rounded bg-white-100 border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-300" required />
                </div>     

                <div className="flex gap-4">
                  <div className="flex-1">
                    <label htmlFor="firstName" className="block text-red-700 text-sm font-bold mb-2">First Name</label>
                    <input name="firstname" type="text" id="firstName" placeholder="Enter First name" className="w-full p-2 rounded bg-white-100 border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-300" required />
                  </div>
                  <div className="flex-1">
                    <label htmlFor="lastName" className="block text-red-700 text-sm font-bold mb-2">Last name</label>
                    <input name='lastname' type="text" id="lastName" placeholder="Enter Last name" className="w-full p-2 rounded bg-white-100 border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-300" required />
                  </div>
                </div>
                <div>
                  <label htmlFor="phone" className="block text-red-700 text-sm font-bold mb-2">Phone Number</label>
                  <input name="phone" type="phone" id="phone" placeholder="Enter phone Number" className="w-full p-2 rounded bg-white-100 border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-300" required />
                </div>
                <div>
                  <label htmlFor="email" className="block text-red-700 text-sm font-bold mb-2">Email</label>
                  <input name="email" type="email" id="email" placeholder="Enter email" className="w-full p-2 rounded bg-white-100 border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-300" required />
                </div>

                <div className="flex gap-4">
                  <div className="flex-1">
                    <label htmlFor="location" className="block text-red-700 text-sm font-bold mb-2">Location</label>
                    <input name='location' type="location" id="location" placeholder="Enter location" className="w-full p-2 rounded bg-white-100 border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-300" required />
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label htmlFor="password" className="block text-red-700 text-sm font-bold mb-2">Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name='password'
                        id="password"
                        placeholder="Enter Password here"
                        className="w-full p-2 rounded bg-white-100 border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-300"
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-orange-700"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>
                  <div className="flex-1">
                    <label htmlFor="confirmPassword" className="block text-red-700 text-sm font-bold mb-2">Confirm Password</label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name='confirmpassword'
                        id="confirmPassword"
                        className="w-full p-2 rounded bg-white-100 border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-300"
                        placeholder="Confirm Password"
                        required
                      />
                      <button
                        type="submit"
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-red-700"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Remember Me Checkbox */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-red-700 text-sm">Remember me</span>
                  </label>
                  <a href="#" className="text-orange-700 text-sm font-bold">Forgot Password?</a>
                </div>

                <button type="submit" className="w-full bg-red-600 text-white text-lg font-bold py-2 px-4 rounded hover:bg-orange-700 focus:outline-none focus:ring-4 focus:ring-brown-300"> {loading ? "Loading... " : "Register"}


                </button>
              </form>
              <div className="my-5 flex items-center">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-4 text-orange-700 text-xl font-bold">OR</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>

              {/* Social Login Buttons */}
              <button type="button" className="w-full bg-white text-orange-700 text-sm font-bold py-2 px-4 border border-red-700 rounded hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300">
                Sign up with Google
              </button>

              {/* SIGN-UP link */}
              <p >
                Already have an account?{" "}<Link to="/Plu"className="text-center mt-4 text-orange-700 text-sm" >Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export default Plumbersignup;