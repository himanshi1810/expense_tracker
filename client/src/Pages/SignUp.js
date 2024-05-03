import Logo from "../assets/Logo.png"
import Template from "../Components/Core/Auth/Template"

function SignUp() {
  return (
    <Template
      img = {Logo}
      title="Track expenses effortlessly, take control of your finances, and budget "
      title2="Smarter with our intuitive app"
      description1="Simplify your spending, categorize transactions, and stay financially organized with ease."
      formType="signup"
    />
  )
}

export default SignUp