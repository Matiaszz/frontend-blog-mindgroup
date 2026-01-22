import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { NoAuthLinksLayout } from "./layouts/NoAuthLinksLayout";
import { Register } from "./pages/Register";
import { Articles } from "./pages/Articles";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout/>}>
          <Route path="/" element={<Home />} />
          <Route path="/artigos" element={<Articles/>} />
        </Route>
        <Route element={<NoAuthLinksLayout/>}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
