import Navbar from "./components/Navbar";
import SolarSystem from "./components/SolarSystem";
import ThreeHero from "./components/ThreeHero";
import ThreeAbout from "./components/ThreeAbout";
import ThreeProjects from "./components/ThreeProjects";
import ThreeContact from "./components/ThreeContact";
import "./index.css";

function App() {
  return (
    <>
      <SolarSystem />
      <Navbar />
      <ThreeHero />
      <ThreeAbout />
      <ThreeProjects />
      <ThreeContact />
    </>
  );
}

export default App;
