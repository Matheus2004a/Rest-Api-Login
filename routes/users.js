const express = require("express")
const router = express.Router()
const mysql = require("../mysql").pool
const bcrypt = require("bcrypt")

router.post("/users/signup", (req, res, next) => {
    const { email, password } = req.body

    mysql.getConnection((error, conn) => {
        if (error) return res.status(500).send({ error })

        conn.query(
            `SELECT * FROM tbl_usuarios WHERE email = ?`,
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