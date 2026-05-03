import { RouterProvider } from "react-router-dom";
import { router } from "./App.route.jsx";
import { AuthProvider } from "./Features/Auth/auth.context.jsx";
import { InterviewProvider } from "./Features/Interview/Interview.context.jsx";

function App() {
  return (
    <AuthProvider>
      <InterviewProvider>
        <RouterProvider router={router} />
      </InterviewProvider>
    </AuthProvider>
  );
}

export default App;