const express = require("express")
const router = express.Router()
const mysql = require("../mysql").pool

router.get("/products", (req, res) => {
    mysql.getConnection((error, conn) => {
        if (error) return res.status(500).send({ error })

        conn.query(
            "SELECT * FROM tbl_produtos",
            (error, result, fields) => {
                if (error) return res.send(500).send({ error })

                // Retorna um json dos produtos cadastrados
                return res.status(200).send({ response: result })
            }
        )
    })
})

router.get("/products/:id", (req, res) => {
    const { id } = req.params

    mysql.getConnection((error, conn) => {
        if (error) return res.status(500).send({ error })

        conn.query(
            "SELECT * FROM tbl_produtos WHERE id = ?",
            [id],
            (error, result, fields) => {
                if (error) return res.send(500).send({ error })

                return res.status(200).send({ response: result })
            }
        )
    })
})

router.post("/products", (req, res) => {
    const { name, price } = req.body

    mysql.getConnection((error, conn) => {
        if (error) return res.status(500).send({ error })

        conn.query(
            "INSERT INTO tbl_produtos (nome, preco) VALUES (?, ?)",
            [name, price],
            (error, result, fields) => {
                conn.release()

                if (error) return res.send(500).send({ error })

                return res.status(201).send({
                    message: "Produto cadastrado com sucesso",
                    id: result.insertId // id do produto inserido
                })
            }
        )
    })
})

router.patch("/products/:id", (req, res) => {
    const { id } = req.params
    const { name, price } = req.body

    mysql.getConnection((error, conn) => {
        if (error) return res.status(500).send({ error })

        conn.query(
            "UPDATE tbl_produtos SET nome = ?, preco = ? WHERE id = ?",
            [name, price, id],
            (error, result, fields) => {
                if (error) return res.send(500).send({ error })

                return res.status(200).send({
                    message: "Produtos atualizado com sucesso",
                    response: result
                })
            }
        )
    })
})

router.delete("/products/:id", (req, res) => {
    const { id } = req.params

    mysql.getConnection((error, conn) => {
        if (error) return res.status(500).send({ error })

        conn.query(
            "DELETE FROM tbl_produtos WHERE id = ?",
            [id],
            (error, result, fields) => {
                if (error) return res.send(500).send({ error })

                return res.status(200).send({
                    message: "Produto deletado com sucesso",
                    response: result
                })
            }
        )
    })
})

module.exports = router