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
      <Route path="/details" element={<Details />} />
      <Route path="/Bot" element={<Chatbot />} />
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App