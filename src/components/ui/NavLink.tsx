import React from "react";
import { Link } from "react-router-dom";

type NavLinkProps = {
  children: React.ReactNode;
  to: string;
  className?: string;
  disconsiderCSS?: boolean;
};

export function NavLink({ children, to: toPage, className, disconsiderCSS = false }: NavLinkProps) {
  return <li className={`${!disconsiderCSS ? 'transition transform hover:underline hover:text-[var(--primary)]' : ''} ${className}`}>
    <Link to={toPage}>{children}</Link>
  </li>
}