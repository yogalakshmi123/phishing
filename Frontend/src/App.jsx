import { BrowserRouter, Route, Routes } from "react-router-dom"
import Chatbot from "./Chatbot"
import Details from "./Details"
import Login from "./Login"
import Signup from "./Signup"

function App() {
  
  return(
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Details />} />
      <Route path="/Bot" element={<Chatbot />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Signup" element={<Signup />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App