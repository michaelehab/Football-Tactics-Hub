import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GetPost } from "./pages/getPost";
import { ListPosts } from "./pages/listPosts";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListPosts />} />
        <Route path="/post/:id" element={<GetPost />} />
      </Routes>
    </BrowserRouter>
  );
};
