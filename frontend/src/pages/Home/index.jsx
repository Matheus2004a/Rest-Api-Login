import { Link } from "react-router-dom";
import Button from "../../components/Button/Button"

import "../../App.scss";

function Home() {
    function handleSubmit(e) {
        e.preventDefault()
    }

    return (
        <>
            <h1>Sistema de login</h1>

            <form method="post" onSubmit={handleSubmit}>
                <fieldset>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" placeholder="Digite seu e-mail" autoComplete="on" />
                </fieldset>

                <fieldset>
                    <label htmlFor="email">Senha</label>
                    <input type="password" name="password" id="password" placeholder="Digite sua senha" autoComplete="on" />
                </fieldset>

                <Button>Entrar</Button>
                
                <p className="account">Não tem uma conta? <Link to="/sign-up">Registre - se</Link></p>
            </form>
        </>
    )
}

export default Home