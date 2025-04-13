import { Route, Routes } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/Homepage";
import Navbar from "./components/common/Navbar";

function App() {
  return (

    <div>

        <Navbar/>
        <Routes>
            <Route path="/" element={<Homepage/>}/>
            <Route path="*" element={<div> Not Found</div>}/>
      </Routes>
    </div>

    
  );
}

export default App;
