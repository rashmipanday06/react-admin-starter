// import './App.css'
import { Route, Routes } from "react-router-dom";
import Login from "./componetns/pages/login/login";
import Dashboard from "./componetns/pages/dashboard";
import NotFound from "./componetns/pages/notFound";
import Users from "./componetns/pages/users";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<Users />} />

        {/* 404 Page */}
        <Route path="/notFound" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
