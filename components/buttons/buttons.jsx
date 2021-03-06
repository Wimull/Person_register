import Link from "next/link"
import Styles from "./buttons.module.css"
export function Buttons(props) {
    return(
        <ul className={Styles.botoes}>
            <li>
                <button type="submit">
                    <span>{props.label}</span>
                </button>
            </li>
            <li>
                <Link className={Styles.voltar} href={props.href}>
                    <a>Voltar</a>
                </Link>
            </li>
        </ul>
    )
}