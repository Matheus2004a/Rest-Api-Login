import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";

import "../../App.scss";

function SignUp() {
    return (
        <>
            <h1>Cadastro de usuário</h1>

            <form action="" method="post">
                <fieldset>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" placeholder="Digite seu e-mail" autoComplete="on" />
                </fieldset>

                <fieldset>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" placeholder="Confirme seu e-mail" autoComplete="on" />
                </fieldset>

                <fieldset>
                    <label htmlFor="email">Senha</label>
                    <input type="password" name="password" id="password" placeholder="Digite sua senha" autoComplete="on" />
                </fieldset>

                <Button>Cadastrar - se</Button>

                <p className="account">Já possui uma conta? <Link to="/">Entre aqui</Link></p>
            </form>
        </>
    )
}

export default SignUp