import { RouterProvider } from "react-router-dom";
import { router } from "./App.route.jsx";


function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;