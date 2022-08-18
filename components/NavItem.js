import Link from "next/link";
import NavItemChildren from "./NavItemChildren";

export default function NavItem (props) {
    const {label, to, children} = props.item;
    
    if (children) {
        return <NavItemChildren item={props.item} />;
    }
    
      return (
        <li>
            <Link exact href={to}>
                <a className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                    <span className="ml-3">{label}</span>
                </a>
            </Link>
        </li>
    );
}
