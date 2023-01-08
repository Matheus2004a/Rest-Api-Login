const express = require("express")
const router = express.Router()
const mysql = require("../mysql").pool

router.get("/pedidos", (req, res) => {
    mysql.getConnection((error, conn) => {
        if (error) return res.status(500).send({ error })

        conn.query(
            "SELECT * FROM tbl_pedidos",
            (error, result, fields) => {
                if (error) return res.send(500).send({ error })

                if (result.length === 0) {
                    return res.status(404).send({
                        message: "Nenhum pedido encontrado"
                    })
                }

                const response = {
                    requests: result.map(request => {
                        return {
                            id: request.id,
                            quantify: request.quantidade,
                            productId: request.produtos_id,
                            url: `http://${process.env.MYSQL_HOST}:3000/pedidos/${request.produtos_id}`
                        }
                    }),
                    request: {
                        description: "Retorna todos os pedidos",
                    }
                }

                return res.status(202).send({ response })
            }
        )
    })
})

router.get("/pedidos/:id", (req, res) => {
    const { id } = req.params

    mysql.getConnection((error, conn) => {
        if (error) return res.status(500).send({ error })

        conn.query(
            "SELECT * FROM tbl_pedidos WHERE id = ?",
            [id],
            (error, result, fields) => {
                if (error) return res.send(500).send({ error })

                if (result.length === 0) {
                    return res.status(404).send({
                        message: "Nenhum pedido encontrado com este id"
                    })
                }

                const response = {
                    id: result[0].id,
                    quantify: result[0].quantidade,
                    productId: result[0].produtos_id,
                    request: {
                        description: "Retorna detalhes de um pedido",
                        url: `http://${process.env.MYSQL_HOST}:3000/pedidos`
                    }
                }

                return res.status(200).send({ response })
            }
        )
    })
})

router.post("/pedidos", (req, res) => {
    const { productId, quantify } = req.body

    mysql.getConnection((error, conn) => {
        if (error) return res.status(500).send({ error })

        conn.query(
            "INSERT INTO tbl_pedidos (quantidade, produtos_id) VALUES (?, ?)",
            [quantify, productId],
            (error, result, fields) => {
                conn.release()

                if (error) return res.send(500).send({ error })

                const response = {
                    message: "Pedido cadastrado com sucesso",
                    products: {
                        id_request: result.insertId,
                        productId,
                        quantify,
                        request: {
                            description: "Cadastra um pedido",
                            url: `http://${process.env.MYSQL_HOST}:3000/pedidos`
                        }
                    }
                }

                return res.status(201).send({ response })
            }
        )
    })
})

router.patch("/pedidos/:id", (req, res) => {
    const { id } = req.params
    const { quantify } = req.body

    mysql.getConnection((error, conn) => {
        if (error) return res.status(500).send({ error })

        conn.query(
            "UPDATE tbl_pedidos SET quantidade = ? WHERE id = ?",
            [quantify, id],
            (error, result, fields) => {
                if (error) return res.send(500).send({ error })

                const response = {
                    message: "Pedido atualizado com sucesso",
                    requests: {
                        id,
                        quantify,
                        url: `http://${process.env.MYSQL_HOST}:3000/pedidos`
                    },
                    request: {
                        description: "Atualiza dados de um pedido"
                    }
                }

                return res.status(202).send({ response })
            }
        )
    })
})

router.delete("/pedidos/:id", (req, res) => {
    const { id } = req.params

    mysql.getConnection((error, conn) => {
        if (error) return res.status(500).send({ error })

        conn.query(
            "DELETE FROM tbl_pedidos WHERE id = ?", [id],
            (error, result, fields) => {
                if (error) return res.send(500).send({ error })

                if (result.length === 0) {
                    return res.status(404).send({
                        message: "Nenhum pedido para remover"
                    })
                }

                const response = {
                    message: "Pedido removido com sucesso",
                    request: {
                        description: "Remove um pedido",
                        url: `http://${process.env.MYSQL_HOST}:3000/pedidos`
                    }
                }

                return res.status(202).send({ response })
            }
        )
    })
})

module.exports = router