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

                const response = {
                    quantify: result.length,
                    products: result.map(product => {
                        return {
                            id: product.id,
                            name: product.nome,
                            price: product.preco,
                            url: `http://${process.env.MYSQL_HOST}:3000/products/${product.id}`
                        }
                    }),
                    request: {
                        description: "Retorna todos os produtos"
                    }
                }

                // Retorna um json dos produtos cadastrados
                return res.status(200).send({ response })
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

                if (result.length === 0) {
                    return res.status(404).send({
                        message: "Nenhum produto encontrado com este id"
                    })
                }

                const response = {
                    id: result[0].id,
                    name: result[0].nome,
                    price: result[0].preco,
                    request: {
                        description: "Retorna detalhes de um produto",
                        url: `http://${process.env.MYSQL_HOST}:3000/products`
                    }
                }

                return res.status(200).send({ response })
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

                const response = {
                    message: "Produto cadastrado com sucesso",
                    products: {
                        id: result.insertId,
                        name,
                        price,
                        url: `http://${process.env.MYSQL_HOST}:3000/products`
                    }
                }

                return res.status(201).send({ response })
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

                const response = {
                    message: "Produto atualizado com sucesso",
                    product: {
                        id,
                        name,
                        price,
                        url: `http://${process.env.MYSQL_HOST}:3000/products`
                    },
                    request: {
                        description: "Atualiza dados de um produto"
                    }
                }

                return res.status(202).send({ response })
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

                if (result.length === 0) {
                    return res.status(404).send({
                        message: "Nenhum produto para remover"
                    })
                }

                const response = {
                    message: "Produto removido com sucesso",
                    request: {
                        description: "Remove um produto",
                        url: `http://${process.env.MYSQL_HOST}:3000/products`
                    }
                }

                return res.status(202).send({ response })
            }
        )
    })
})

module.exports = router