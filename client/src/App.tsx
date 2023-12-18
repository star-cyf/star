import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import VerifyPage from "./pages/VerifyPage";
import ProtectedRoute from "./components/ProtectedRoute";
import ProfilePage from "./pages/ProfilePage";
import UsersPage from "./pages/UsersPage";
import QuestionsPage from "./pages/QuestionsPage";
import QuestionPage from "./pages/QuestionPage";
import NotFoundPage from "./pages/NotFoundPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<HomePage />} />
      <Route path="about" element={<AboutPage />} />
      <Route path="verify" element={<VerifyPage />} />
      <Route
        path="profile"
        element={
          <ProtectedRoute allowedRoles={[2, 3, 4]}>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="users"
        element={
          <ProtectedRoute allowedRoles={[4]}>
            <UsersPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="questions"
        element={
          <ProtectedRoute allowedRoles={[2, 3, 4]}>
            <QuestionsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="questions/:id"
        element={
          <ProtectedRoute allowedRoles={[2, 3, 4]}>
            <QuestionPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}></RouterProvider>
    </QueryClientProvider>
  );
};

export default App;
