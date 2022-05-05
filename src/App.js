import { ToastContainer } from "react-toastify";
import "./App.css";
import Home from "./components/Home";
import { AddContact} from "./components/AddContact";
import { Navbar } from "./components/Navbar";
import { EditContact } from "./components/EditContact";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home/>}></Route>
        <Route exact path="/add" element={<AddContact/>}></Route>
        <Route exact path="/edit/:id" element={<EditContact/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
