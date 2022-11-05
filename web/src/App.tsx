import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GetPost } from "./pages/getPost";
import { ListPosts } from "./pages/listPosts";
import { NavBar } from "./components/navBar";
import { SignIn } from "./pages/signIn";
import { SignUp } from "./pages/signUp";
import { NewPost } from "./pages/newPost";
import { ViewProfile } from "./pages/viewProfile";
import { Hero } from "./pages/heroPage";
import { NotFound } from "./pages/notFound";

export const App = () => {
  return (
    <BrowserRouter>
      <>
        <NavBar />
      </>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/posts" element={<ListPosts />} />
        <Route path="/post/:id" element={<GetPost />} />
        <Route path="/user/:id" element={<ViewProfile />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/new/post" element={<NewPost />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
