import "./App.css";
import { Header } from "./components/Header";
import { lazy } from "react";
const DynamicComponent = lazy(() => import("./components/Dynamic/index"));

function App() {
  return (
    <div>
      <Header />
      <DynamicComponent />
    </div>
  );
}

export default App;
