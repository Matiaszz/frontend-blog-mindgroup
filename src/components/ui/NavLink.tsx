import React from "react";

type NavLinkProps = {
  children: React.ReactNode;
  to: string;
};

export function NavLink({ children, to }: NavLinkProps) {
  return <li className={`transition transform hover:underline hover:text-[var(--primary)]`}><a href={to}>{children}</a></li>
  
}