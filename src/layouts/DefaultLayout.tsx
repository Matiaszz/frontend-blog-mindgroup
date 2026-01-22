import { Outlet, useMatch } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { useTheme } from "../hooks/useTheme";

export function DefaultLayout() {
  const {classes} = useTheme();
  return (
    <>
      <Navbar showAuthLinks />

      <main className={`w-screen min-h-screen pt-18 ${classes.borderClass} ${classes.bgClass} ${classes.textClass}`}>
        <Outlet />
      </main>
    </>
  );
}
