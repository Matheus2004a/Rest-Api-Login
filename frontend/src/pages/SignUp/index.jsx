import { useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import { api } from "../api";
import { useForm } from "react-hook-form";
import { validationSchema } from "../../utils/validations";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import Button from "../../components/Button/Button";
import { Spinner } from "../../components/Spinner/Spinner";
import { InputError } from "../../components/InputError/InputError";

import "../../App.scss";

function SignUp() {
    const [isLoading, setIsLoading] = useState(false)

    async function onSubmit(data, e) {
        e.preventDefault()

        const user = JSON.stringify(data)
        const url = `${api.defaults.baseURL}/users/signup`

        try {
            setIsLoading(true)
            const result = await axios.post(url, user, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const { message } = result.data.response
            toast.success(message)
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
        <>
            <ToastContainer
                position="top-right"
                theme="colored"
            />

            <h1>Cadastro de usuário</h1>

            <form method="post" onSubmit={handleSubmit(onSubmit)}>
                <fieldset>
                    <label htmlFor="email">Email *</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Digite seu e-mail"
                        autoComplete="on"
                        {...register("email")}
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
                    />
                    {errors?.password?.type && <InputError>{errors.password.message}</InputError>}
                </fieldset>

                {!isLoading && <Button>Cadastre - se</Button>}
                {isLoading && <Button><Spinner /></Button>}

                <p className="account">Já possui uma conta? <Link to="/">Entre aqui</Link></p>
            </form>
        </>
    )
}

export default SignUp