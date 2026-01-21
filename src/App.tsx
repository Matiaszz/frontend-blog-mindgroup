import { Navbar } from "./components/Navbar";
import { useTheme } from "./hooks/useTheme";

function App() {
  const {classes} = useTheme();
  return (
    <div className={`min-h-screen ${classes.bgClass}`}>
      <Navbar/>
      <h1 className='text-red-600'>Hello World!</h1>
    </div>
  )
}

export default App;
