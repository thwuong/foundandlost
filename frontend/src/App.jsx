import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage";
function App() {
  return (
    <BrowserRouter>
      {/* Header */}
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
      </Routes>
      {/* Footer */}
    </BrowserRouter>
  );
}

export default App;
