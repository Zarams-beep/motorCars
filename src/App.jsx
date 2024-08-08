import Footer from "../components/Footer"
import HomePage from "../components/HomePage"
import CheckOut from "../components/CheckOut";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  
  return (
    <>
       <Router>
      <div>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/checkout" element={<CheckOut/>}/>
      </Routes>

      <Footer/>
    </div>
  </Router>
    </>
  )
}

export default App
