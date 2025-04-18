import "./App.css";
import { BookProvider } from "./context/BookContext.jsx";
import Router from "./routes/Router.jsx";

function App() {
  return (
    <BookProvider>
      <Router />
    </BookProvider>
  );
}

export default App;
