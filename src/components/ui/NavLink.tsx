import React from "react";
import { Link } from "react-router-dom";

type NavLinkProps = {
  children: React.ReactNode;
  to: string;
  className?: string;
};

export function NavLink({ children, to: toPage, className }: NavLinkProps) {
  return <li className={`transition transform hover:underline hover:text-[var(--primary)] ${className}`}><Link to={toPage}>{children}</Link></li>
}