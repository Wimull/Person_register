import Link from "next/link";
import Styles from "./header.module.css"




export function Header(){
    return(
    <div>
        <nav className={Styles.nav}>
            <ul>
                <li>
                    <Link href={"/"}>
                        <a>Home</a>
                    </Link>
                </li>
                <li>
                    <Link href={"/procurar"}>
                        <a>Procurar</a>
                    </Link>
                </li>
                <li>
                    <Link href={"/inserir"}>
                        <a>Inserir</a>
                    </Link>
                </li>
                <li>
                    <Link href={"/atualizar"}>
                        <a>Atualizar</a>
                    </Link>
                </li>
                <li>
                    <Link href={"/deletar"}>
                        <a>Deletar</a>
                    </Link>
                </li>
            </ul>
        </nav>
    </div>
    )
}