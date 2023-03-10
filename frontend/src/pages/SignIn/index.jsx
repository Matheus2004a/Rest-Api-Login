import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import { api } from "../api";
import { useForm } from "react-hook-form";
import { validationSchema } from "../../utils/validations";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import Button from "../../components/Button/Button"
import { Spinner } from "../../components/Spinner/Spinner";
import { InputError } from "../../components/InputError/InputError";

import "../../App.scss";

function SignIn() {
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    function redirectUserToHome(result) {
        const { message, token } = result.data
        localStorage.setItem("token", token)
        toast.success(message)
        setTimeout(() => navigate("/home"), 8000)
    }

    async function onSubmit(data, e) {
        e.preventDefault()

        const user = JSON.stringify(data)
        const url = `${api.defaults.baseURL}/users/login`

        try {
            setIsLoading(true)
            const result = await axios.post(url, user, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            redirectUserToHome(result)
        } catch (error) {
            if (error.response) {
                const { message } = error.response.data
                toast.error(message)
            } else {
                toast.error(error.message)
            }
            setIsLoading(false)
        }
        setIsLoading(false)
    }

    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(validationSchema) })

    return (
        <main>
            <ToastContainer
                position="top-right"
                theme="colored"
            />

            <h1>Sistema de login</h1>

            <form method="post" onSubmit={handleSubmit(onSubmit)}>
                <fieldset>
                    <label htmlFor="email">Email *</label>
                    <input
                        name="email"
                        id="email"
                        placeholder="Digite seu e-mail"
                        autoComplete="on"
                        {...register("email")}
                        className={`${errors?.email?.type && "error"}`}
                    />
                    {errors?.email?.type && <InputError>{errors.email.message}</InputError>}
                </fieldset>

                <fieldset>
                    <label htmlFor="email">Senha *</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Digite sua senha"
                        autoComplete="on"
                        {...register("password")}
                        className={`${errors?.password?.type && "error"}`}
                    />
                    {errors?.password?.type && <InputError>{errors.password.message}</InputError>}
                </fieldset>

                {!isLoading && <Button>Entrar</Button>}
                {isLoading && <Button><Spinner /></Button>}

                <p className="account">N??o tem uma conta? <Link to="/sign-up">Registre - se</Link></p>
            </form>
        </main>
    )
}

export default SignIn