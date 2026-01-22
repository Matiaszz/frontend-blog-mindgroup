import React from "react";
import { Link } from "react-router-dom";

type NavLinkProps = {
  children: React.ReactNode;
  to: string;
};

export function NavLink({ children, to: toPage }: NavLinkProps) {
  return <li className={`transition transform hover:underline hover:text-[var(--primary)]`}><Link to={toPage}>{children}</Link></li>
}