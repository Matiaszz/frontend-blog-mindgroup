import { LayoutDashboard, LogOut, Settings } from "lucide-react";
import { useUser } from "../../hooks/useUser";
import { NavLink } from "./NavLink";
import { logout } from "../../services/authService";
import { useTheme } from "../../hooks/useTheme";
import { useNavigate } from "react-router-dom";

type DropdownProps = {
    show: boolean;
    size: number;
}

export function NavbarDropdown({ show, size }: DropdownProps) {
  const { user, loading } = useUser();
  const navigate = useNavigate();
  const {classes} = useTheme();
  if (!show || !user || loading) return null;

  async function handleLogout(){
    await logout();
    navigate('/login');
  }

  return (
    <div
      style={{ minWidth: size }}
      className={`
        absolute
        right-0
        top-14
        z-50
        ${classes.bgClass}
        ${classes.textClass}
        shadow-lg
        border
        p-4
      `}
    >
      <div className="flex gap-3 items-center border-b pb-2 border-b-[var(--border)] max-w-[90vw] max-h-[90vh]">
        <img
          src={user.profilePictureUrl ?? "https://toppng.com/uploads/preview/instagram-default-profile-picture-11562973083brycehrmyv.png"}
          alt="Profile picture"
          className="w-10 h-10"
        />
        <div>
          <p className={`font-medium ${classes.textClass} `}>{user.name}</p>
          <p className="text-sm">{user.email}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2 border-b pb-2 border-b-[var(--border)]">
        <NavLink to="/dashboard"><LayoutDashboard /> Dashboard</NavLink>
        <NavLink to="/configuracoes"><Settings /> Configurações</NavLink>
      </div>

      <div className="mt-4">
        <button onClick={(handleLogout)} className="flex items-center gap-2 text-red-600 transition hover:text-red-800 hover:cursor-pointer">
          <LogOut /> Sair
        </button>
      </div>
    </div>
  );
}

