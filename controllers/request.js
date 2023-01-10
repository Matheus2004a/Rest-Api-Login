const mysql = require("../mysql").pool

exports.getRequests = (req, res) => {
    mysql.getConnection((error, conn) => {
        if (error) return res.status(500).send({ error })

        const query = "SELECT * FROM view_pedidos"

        conn.query(query, (error, result, fields) => {
            if (error) return res.status(500).send({ error })

            if (result.length === 0) {
                return res.status(404).send({
                    message: "Nenhum pedido encontrado"
                })
            }

            const response = {
                requests: result.map(request => {
                    return {
                        id: request.id_pedido,
                        quantify: request.quantidade,
                        products: {
                            id: request.id_produto,
                            name: request.nome,
                            price: request.preco
                        },
                        url: `http://${process.env.MYSQL_HOST}:3000/pedidos/${request.id_produto}`
                    }
                }),
                request: {
                    description: "Retorna todos os pedidos",
                }
            }

            return res.status(202).send({ response })
        })
    })
}

exports.getRequest = (req, res) => {
    const { id } = req.params

    mysql.getConnection((error, conn) => {
        if (error) return res.status(500).send({ error })

        const query = "SELECT * FROM view_pedidos WHERE id_pedido = ?"

        conn.query(query, [id], (error, result, fields) => {
            if (error) return res.status(500).send({ error })

            if (result.length === 0) {
                return res.status(404).send({
                    message: "Nenhum pedido encontrado com este id"
                })
            }

            const response = {
                id: result[0].id_pedido,
                quantify: result[0].quantidade,
                product: {
                    id: result[0].id_produto,
                    name: result[0].nome,
                    price: result[0].preco
                },
                request: {
                    description: "Retorna detalhes de um pedido",
                    url: `http://${process.env.MYSQL_HOST}:3000/pedidos`
                }
            }

            return res.status(200).send({ response })
        })
    })
}

exports.postRequest = (req, res) => {
    const { productId, quantify } = req.body

    mysql.getConnection((error, conn) => {
        if (error) return res.status(500).send({ error })

        const query = "INSERT INTO tbl_pedidos (quantidade, produtos_id) VALUES (?, ?)"

        conn.query(query, [quantify, productId], (error, result, fields) => {
            conn.release()

            if (error) return res.status(500).send({ error })

            const response = {
                message: "Pedido cadastrado com sucesso",
                request: {
                    id: result.insertId,
                    productId,
                    quantify,
                    request: {
                        description: "Cadastra um pedido",
                        url: `http://${process.env.MYSQL_HOST}:3000/pedidos`
                    }
                }
            }

            return res.status(201).send({ response })
        })
    })
}

exports.updateRequest = (req, res) => {
    const { id } = req.params
    const { quantify } = req.body

    mysql.getConnection((error, conn) => {
        if (error) return res.status(500).send({ error })

        const query = "UPDATE tbl_pedidos SET quantidade = ? WHERE id = ?"

        conn.query(query, [quantify, id], (error, result, fields) => {
            if (error) return res.status(500).send({ error })

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
        })
    })
}

exports.deleteRequest = (req, res) => {
    const { id } = req.params

    mysql.getConnection((error, conn) => {
        if (error) return res.status(500).send({ error })

        const query = "DELETE FROM tbl_pedidos WHERE id = ?"

        conn.query(query, [id], (error, result, fields) => {
            if (error) return res.status(500).send({ error })

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
        })
    })
}