import Link from "next/link"
import Styles from "./delete-buttons.module.css"
export function DeleteButtons(props){
    return(
        <ul className={Styles.botoes}>
            <li>
                <button type="submit">
                    <span>Procurar</span>
                </button>
            </li>
            <li>
                <button onClick={props.onDelete}>
                    <span>Deletar</span>
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