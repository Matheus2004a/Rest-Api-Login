import { useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import { api } from "../api";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import Button from "../../components/Button/Button";

import "../../App.scss";

function SignUp() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    async function handleSubmit(e) {
        e.preventDefault()

        const user = JSON.stringify({
            email,
            password
        })

        const url = `${api.defaults.baseURL}/users/signup`

        try {
            const result = await axios.post(url, user, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const { message } = result.data.response
            toast.success(message)
        } catch (error) {
            const { message } = error.response.data
            toast.error(message)
        }
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                theme="colored"
            />

            <h1>Cadastro de usuário</h1>

            <form method="post" onSubmit={handleSubmit}>
                <fieldset>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" placeholder="Digite seu e-mail" autoComplete="on" onBlur={e => setEmail(e.target.value)} />
                </fieldset>

                <fieldset>
                    <label htmlFor="email">Senha</label>
                    <input type="password" name="password" id="password" placeholder="Digite sua senha" autoComplete="on" onBlur={e => setPassword(e.target.value)} />
                </fieldset>

                <Button>Cadastrar - se</Button>

                <p className="account">Já possui uma conta? <Link to="/">Entre aqui</Link></p>
            </form>
        </>
    )
}

export default SignUp