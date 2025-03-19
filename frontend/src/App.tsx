import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import EventCreate from "./pages/EventCreate";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<EventCreate />} />
      </Routes>
    </>
  );
}

export default App;
