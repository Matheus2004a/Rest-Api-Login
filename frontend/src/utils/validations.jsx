import * as yup from "yup"

export const validationSchema = yup.object({
    email: yup.string().email("Email inválido").required("Email é obrigatório"),
    password: yup.string().required("Senha é obrigatória").min(8, "Senha deve ter 8 caracteres")
})