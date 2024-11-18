import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import RootLayout from "../../layouts/RootLayout";
import Swal from "sweetalert2";
import { apiSignup } from "../../services/users";

const Plumbersignup = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(event.target);
      const password = formData.get("password");
      const confirmpassword = formData.get("confirmpassword");

      if (password !== confirmpassword) {
        Swal.fire({
          icon: 'error',
          title: 'Password Mismatch',
          text: 'Passwords do not match. Please try again.',
        });
        return;
      }

      const payload = {
        officeName: formData.get("officeName"),
        firstname: formData.get("firstname"),
        lastname: formData.get("lastname"),
        phoneNumber: formData.get("phoneNumber"),
        location: formData.get("location"),
        email: formData.get("email"),
        password: password
      };

      const photoFile = formData.get("photo");
      if (photoFile && photoFile.size > 0) {
        payload.photo = photoFile;
      }

      await apiSignup(payload);

      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: "You have successfully registered!",
      });

      navigate("/plogin");

    } catch (error) {
      console.error('Registration error:', error);
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.message || "There was an error during registration. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <RootLayout>
      <div className="school">
        <div className="min-h-screen py-12">
          <div className="bg-white-300 flex items-center justify-center">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-2xl shadow-blue-600">
              <h2 className="text-4xl font-extrabold text-center text-blue-800 mb-6">Plumber Signup</h2>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="officeName" className="block text-blue-700 text-sm font-bold mb-2">Office Name</label>
                  <input name="officeName" type="text" id="officeName" placeholder="Enter Office Name" className="w-full p-2 rounded bg-white-100 border border-cyan-200 focus:outline-none focus:ring-2 focus:ring-blue-300" required />
                </div>

                <div className="flex gap-4">
                  <div className="flex-1">
                    <label htmlFor="firstName" className="block text-blue-700 text-sm font-bold mb-2">First Name</label>
                    <input name="firstname" type="text" id="firstName" placeholder="Enter First name" className="w-full p-2 rounded bg-white-100 border border-cyan-200 focus:outline-none focus:ring-2 focus:ring-blue-300" required />
                  </div>
                  <div className="flex-1">
                    <label htmlFor="lastName" className="block text-blue-700 text-sm font-bold mb-2">Last Name</label>
                    <input name="lastname" type="text" id="lastName" placeholder="Enter Last name" className="w-full p-2 rounded bg-white-100 border border-cyan-200 focus:outline-none focus:ring-2 focus:ring-blue-300" required />
                  </div>
                </div>

                <div>
                  <label htmlFor="phoneNumber" className="block text-blue-700 text-sm font-bold mb-2">Phone Number</label>
                  <input name="phoneNumber" type="tel" id="phoneNumber" placeholder="Enter Phone Number" className="w-full p-2 rounded bg-white-100 border border-cyan-200 focus:outline-none focus:ring-2 focus:ring-blue-300" required />
                </div>

                <div>
                  <label htmlFor="email" className="block text-blue-700 text-sm font-bold mb-2">Email</label>
                  <input name="email" type="email" id="email" placeholder="Enter Email" className="w-full p-2 rounded bg-white-100 border border-cyan-200 focus:outline-none focus:ring-2 focus:ring-blue-300" required />
                </div>

                <div className="flex gap-4">
                  <div className="flex-1">
                    <label htmlFor="location" className="block text-blue-700 text-sm font-bold mb-2">Location</label>
                    <input name="location" type="text" id="location" placeholder="Enter Location" className="w-full p-2 rounded bg-white-100 border border-cyan-200 focus:outline-none focus:ring-2 focus:ring-blue-300" required />
                  </div>
                </div>

                <div>
                  <label htmlFor="photo" className="block text-blue-700 text-sm font-bold mb-2">Photo</label>
                  <input name="photo" type="file" id="photo" className="w-full p-2 rounded bg-white-100 border border-cyan-200 focus:outline-none focus:ring-2 focus:ring-blue-300" required />
                </div>

                <div className="flex gap-4">
                  <div className="flex-1">
                    <label htmlFor="password" className="block text-blue-700 text-sm font-bold mb-2">Password</label>
                    <div className="relative">
                      <input type={showPassword ? "text" : "password"} name="password" id="password" placeholder="Enter Password" className="w-full p-2 rounded bg-white-100 border border-cyan-200 focus:outline-none focus:ring-2 focus:ring-blue-300" required />
                      <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-700" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>
                  <div className="flex-1">
                    <label htmlFor="confirmPassword" className="block text-blue-700 text-sm font-bold mb-2">Confirm Password</label>
                    <div className="relative">
                      <input type={showConfirmPassword ? "text" : "password"} name="confirmpassword" id="confirmPassword" placeholder="Confirm Password" className="w-full p-2 rounded bg-white-100 border border-cyan-200 focus:outline-none focus:ring-2 focus:ring-blue-300" required />
                      <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-700" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-blue-700 text-sm">Remember me</span>
                  </label>
                  <a href="#" className="text-blue-700 text-sm font-bold">Forgot Password?</a>
                </div>

                <button type="submit" className="w-full bg-blue-600 text-white text-lg font-bold py-2 px-4 rounded hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-blue-300"> {loading ? "Loading... " : "Register"}


                </button>

              </form>

              <div className="my-5 flex items-center">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-4 text-blue-700 text-xl font-bold">OR</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>

              <button type="button" className="w-full bg-white text-blue-700 text-sm font-bold py-2 px-4 border border-cyan-700 rounded hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300">
                Sign up with Google
              </button>

              <p>
                Already have an account?{" "}
                <Link to="/plogin" className="text-center mt-4 text-blue-700 text-sm">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export default Plumbersignup;
