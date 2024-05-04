import Logo from "../assets/Logo.png"
import Template from "../Components/Core/Auth/Template"

function Login() {
  return (
    <Template
      img = {Logo}
      title="Welcome Back "
      title2="To Expense Tracker"
      description1="Simplify your spending, categorize transactions, and stay financially organized with ease."
      formType="login" 
    />
  )
}

export default Login