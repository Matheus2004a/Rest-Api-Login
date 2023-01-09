const express = require("express")
const router = express.Router()
const mysql = require("../mysql").pool
const bcrypt = require("bcrypt")

router.get("/users", (req, res) => {
    mysql.getConnection((error, conn) => {
        if (error) return res.status(500).send({ error })

        conn.query(
            "SELECT id, email FROM tbl_usuarios",
            (error, result, fields) => {
                if (error) return res.status(500).send({ error })

                const response = {
                    quantify: result.length,
                    products: result.map(user => {
                        return {
                            id: user.id,
                            email: user.email,
                            url: `http://${process.env.MYSQL_HOST}:3000/users/${user.id}`
                        }
                    }),
                    request: {
                        description: "Retorna todos os usuários"
                    }
                }

                return res.status(200).send({ response })
            }
        )
    })
})

router.get("/users/:id", (req, res) => {
    const { id } = req.params

    mysql.getConnection((error, conn) => {
        if (error) return res.status(500).send({ error })

        conn.query(
            "SELECT id, email FROM tbl_usuarios WHERE id = ?",
            [id],
            (error, result, fields) => {
                if (error) return res.status(500).send({ error })

                if (result.length === 0) {
                    return res.status(404).send({
                        message: "Nenhum usuário encontrado com este id"
                    })
                }

                const response = {
                    id: result[0].id,
                    email: result[0].email,
                    request: {
                        description: "Retorna informações de um usuário",
                        url: `http://${process.env.MYSQL_HOST}:3000/users`
                    }
                }

                return res.status(200).send({ response })
            }
        )
    })
})

router.post("/users/signup", (req, res, next) => {
    const { email, password } = req.body

    mysql.getConnection((error, conn) => {
        if (error) return res.status(500).send({ error })

        conn.query(
            `SELECT id, email FROM tbl_usuarios WHERE email = ?`,
            [email],
            (error, result) => {
                if (error) return res.status(500).send({ error })

                if (result.length > 0) return res.status(409).send({ message: "Usuário já cadastrado" })

                bcrypt.hash(password, 10, (error, hash) => {
                    if (error) return res.status(500).send({ error })

                    conn.query(
                        `INSERT INTO tbl_usuarios (email, senha) VALUES (?, ?)`,
                        [email, hash],
                        (error, result) => {
                            conn.release()

                            if (error) return res.status(500).send({ error })

                            const response = {
                                message: "Usuário cadastrado com sucesso",
                                user: {
                                    id: result.insertId,
                                    email
                                },
                                request: {
                                    description: "Cria um novo usuário",
                                }
                            }

                            return res.status(201).send({ response })
                        }
                    )
                })
            }
        )
    })
})

module.exports = router