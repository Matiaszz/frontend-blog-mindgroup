import { useTheme } from "../../hooks/useTheme";

type LogoProps = {
  size: number;
  alwaysWhite: boolean;
};

export function Logo({ size, alwaysWhite: invertTextColor = false }: LogoProps) {
  const { classes } = useTheme();
  const logo = "<M/>";

  return (
    <h1
      style={{ fontSize: `${size}px` }}
      className={`font-['Irish_Grover'] ${!invertTextColor ? classes.textClass : 'text-white'} font-bold`}
    >
      {logo}
    </h1>
  );
}
