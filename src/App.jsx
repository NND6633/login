import './App.css'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

function App() {
  return (
    <div className="flex min-h-screen">
      {/* Bên trái: Ảnh minh họa */}
      <div className="hidden md:flex items-center justify-center w-1/2 bg-gray-100">
        <img
          src="https://vcdn1-dulich.vnecdn.net/2021/07/16/1-1626437591.jpg?w=460&h=0&q=100&dpr=2&fit=crop&s=i2M2IgCcw574LT-bXFY92g"
          alt="Signup Illustration"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Bên phải: Form */}
      <div className="flex items-center justify-center w-full md:w-1/2 p-8">
        <Card className="w-full max-w-md p-4 h-full flex flex-col justify-center">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Get more opportunities</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <Button className="w-full bg-white text-blue-600 border border-blue-600 hover:bg-blue-50">
              + Sign Up with Google
            </Button>

            <div className="flex items-center w-full gap-2 my-4">
              <div className="flex-grow border-t border-gray-300"></div>
              <p className="text-center text-gray-500 whitespace-nowrap">
                Or sign up with email
              </p>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <p className="text-left ">Full name</p>
            <Input type="text" placeholder="Enter your Full name" />
            <p className="text-left">Email Address</p>
            <Input type="email" placeholder="Enter Email Address" />
            <p className="text-left">Password</p>
            <Input type="password" placeholder="Enter Password" />

            <Button className="w-full bg-blue-600 text-white hover:bg-blue-700" variant="default">
              Continue
            </Button>

            <p className="text-left">
              Already have an account? <a href="#" className="text-blue-600">Login</a>
            </p>

            <p className="text-left">
              By clicking 'Continue', you acknowledge that you have read and accept the
              <a href="#" className="text-blue-600"> Terms of Service </a>
              and
              <a href="#" className="text-blue-600"> Privacy Policy</a>.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default App
