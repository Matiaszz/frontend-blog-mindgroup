import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useTheme } from "../hooks/useTheme";

export function NoAuthLinksLayout() {
  const {classes} = useTheme();
  return (
    <>
        <Navbar showAuthLinks={false} />
        <main className={`w-screen min-h-screen pt-18 ${classes.borderClass} ${classes.bgClass} ${classes.textClass}`}>
            <Outlet />
        </main>
        <Footer/>
    </>
  );
}
