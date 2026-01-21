import { useTheme } from "../../hooks/useTheme";



export function Logo(){
    const {classes} = useTheme();
    const logo = '<M/>';
    return <h1 className={`font-['Irish_Grover'] text-4xl ${classes.textClass} font-bold`}>{logo}</h1>
}