import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./signup";
import Login from "./login";

function App() {
  return (
    <BrowserRouter>
      <div>
        <header></header>
        <main>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
        <footer></footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
