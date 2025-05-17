import Todolist from "./components/Todolist";

import { PrimeReactProvider } from "primereact/api";

import "./App.css";

function App() {
  return (
    <>
      <PrimeReactProvider>
        <Todolist />

      </PrimeReactProvider>
    </>
  );
}

export default App;
