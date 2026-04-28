import { RouterProvider } from "react-router-dom";
import { router } from "./App.route.jsx";
import { AuthProvider } from "./Features/Auth/auth.context.jsx";


function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;