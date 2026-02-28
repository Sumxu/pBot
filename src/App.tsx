import "./App.css";
import EnvManager from "@/config/EnvManager";
import MainLayout from "@/pages/Main/index";
EnvManager.print();
function App() {
  return <MainLayout />;
}
export default App;
