const express = require("express")
const router = express.Router()
const mysql = require("../mysql").pool
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

router.get("/users", (req, res) => {
    mysql.getConnection((error, conn) => {
        if (error) return res.status(500).send({ error })

        const query = "SELECT id, email FROM tbl_usuarios"

        conn.query(query, (error, result, fields) => {
            if (error) return res.status(500).send({ error })

            const response = {
                quantify: result.length,
                users: result.map(user => {
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
        })
    })
})

router.get("/users/:id", (req, res) => {
    const { id } = req.params

    mysql.getConnection((error, conn) => {
        if (error) return res.status(500).send({ error })

        const query = "SELECT id, email FROM tbl_usuarios WHERE id = ?"

        conn.query(query, [id], (error, result, fields) => {
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
        })
    })
})

router.post("/users/signup", (req, res, next) => {
    const { email, password } = req.body

    mysql.getConnection((error, conn) => {
        if (error) return res.status(500).send({ error })

        const query = `SELECT id, email FROM tbl_usuarios WHERE email = ?`

        conn.query(query, [email], (error, result) => {
            if (error) return res.status(500).send({ error })

            if (result.length > 0) return res.status(409).send({ message: "Usuário já cadastrado" })

            bcrypt.hash(password, 10, (error, hash) => {
                if (error) return res.status(500).send({ error })

                const query = `INSERT INTO tbl_usuarios (email, senha) VALUES (?, ?)`

                conn.query(query, [email, hash], (error, result) => {
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
                })
            })
        })
    })
})

router.patch("/users/signup/:id", (req, res) => {
    const { id } = req.params
    const { email, password } = req.body

    mysql.getConnection((error, conn) => {
        if (error) return res.status(500).send({ error })

        bcrypt.hash(password, 10, (error, hash) => {
            if (error) return res.status(500).send({ error })

            const query = `UPDATE tbl_usuarios SET email = ?, senha = ? WHERE id = ?`

            conn.query(query, [email, hash, id], (error, result) => {
                conn.release()

                if (error) return res.status(500).send({ error })

                const response = {
                    message: "Usuário atualizado com sucesso",
                    user: {
                        id: result.id,
                        email,
                        url: `http://${process.env.MYSQL_HOST}:3000/products`
                    },
                    request: {
                        description: "Atualiza dados de um usuário"
                    }
                }

                return res.status(202).send({ response })
            })
        })
    })
})

router.delete("/users/:id", (req, res) => {
    const { id } = req.params

    mysql.getConnection((error, conn) => {
        if (error) return res.status(500).send({ error })

        const query = "DELETE FROM tbl_usuarios WHERE id = ?"

        conn.query(query, [id], (error, result, fields) => {
            conn.release()

            if (error) return res.status(500).send({ error })

            if (result.affectedRows === 0) {
                return res.status(404).send({
                    message: "Usuário inexistente"
                })
            }

            const response = {
                message: "Usuário removido com sucesso",
                request: {
                    description: "Remove um usuário",
                    url: `http://${process.env.MYSQL_HOST}:3000/products`
                }
            }

            return res.status(202).send({ response })
        })
    })
})

router.post("/users/login", (req, res, next) => {
    const { email, password } = req.body

    function checkLogin() {
        res.status(401).send({
            message: "Falha de autenticação"
        })
    }

    mysql.getConnection((error, conn) => {
        if (error) return res.status(500).send({ error })

        const query = "SELECT * FROM tbl_usuarios WHERE email = ?"
        conn.query(query, [email], (error, result) => {
            conn.release()

            if (error) return res.status(500).send({ error })

            if (result.length < 1) return checkLogin()

            bcrypt.compare(password, result[0].senha, (error, resultHash) => {
                if (error) return checkLogin()

                if (resultHash) {
                    const token = jwt.sign({
                        id: result[0].id,
                        email: result[0].email
                    },
                        process.env.JWT_KEY,
                        {
                            expiresIn: "1h"
                        }
                    )

                    return res.status(200).send({
                        message: "Usuário autenticado com sucesso",
                        token
                    })
                }

                return checkLogin()
            })
        })
    })
})

module.exports = router