import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GetPost } from "./pages/getPost";
import { ListPosts } from "./pages/listPosts";
import { NavBar } from "./components/navBar";

export const App = () => {
  return (
    <>
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ListPosts />} />
          <Route path="/post/:id" element={<GetPost />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
