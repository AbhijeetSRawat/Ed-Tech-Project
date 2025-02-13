import { Route, Routes } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/Homepage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage/>}/>
      <Route path="*" element={<div> Not Found</div>}/>
    </Routes>
  );
}

export default App;
