import "./App.css";
import { BookProvider } from "./context/BookContext.jsx";
import { FavoriteProvider } from "./context/FavoriteContext.jsx";
import { NewRelProvider } from "./context/NewRelContext.jsx";
import { PopularProvider } from "./context/PopularContex.jsx";
import { BookListProvider } from "./context/BookListContext.jsx";
import Router from "./routes/Router.jsx";

function App() {
  return (
    <BookProvider>
      <PopularProvider>
        <NewRelProvider>
          <FavoriteProvider>
            <BookListProvider>
              <Router />
            </BookListProvider>
          </FavoriteProvider>
        </NewRelProvider>
      </PopularProvider>
    </BookProvider>
  );
}

export default App;
