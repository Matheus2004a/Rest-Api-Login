const mysql = require("../../mysql").pool
const formatPrice = require("../helpers/prices")

function getProducts(req, res) {
    mysql.getConnection((error, conn) => {
        if (error) return res.status(500).send({ error })

        const query = "SELECT * FROM tbl_produtos"

        conn.query(query, (error, result, fields) => {
            if (error) return res.status(500).send({ error })

            const response = {
                quantify: result.length,
                products: result.map(product => {
                    return {
                        id: product.id,
                        name: product.nome,
                        price: formatPrice(product.preco),
                        image: `http://${process.env.MYSQL_HOST}:3000/${product.imagem}` ,
                        url: `http://${process.env.MYSQL_HOST}:3000/products/${product.id}`
                    }
                }),
                request: {
                    description: "Retorna todos os produtos"
                }
            }

            return res.status(200).send(response)
        })
    })
}

function getProduct(req, res) {
    const { id } = req.params

    mysql.getConnection((error, conn) => {
        if (error) return res.status(500).send({ error })

        const query = "SELECT * FROM tbl_produtos WHERE id = ?"

        conn.query(query, [id], (error, result, fields) => {
            if (error) return res.status(500).send({ error })

            if (result.length === 0) {
                return res.status(404).send({
                    message: "Nenhum produto encontrado com este id"
                })
            }

            const response = {
                id: result[0].id,
                name: result[0].nome,
                price: formatPrice(result[0].preco),
                image: result[0].imagem,
                request: {
                    description: "Retorna detalhes de um produto",
                    url: `http://${process.env.MYSQL_HOST}:3000/products`
                }
            }

            return res.status(200).send(response)
        })
    })
}

function createProduct(req, res) {
    const { name, price } = req.body
    const { path } = req.file

    mysql.getConnection((error, conn) => {
        if (error) return res.status(500).send({ error })

        const query = "INSERT INTO tbl_produtos (nome, preco, imagem) VALUES (?, ?, ?)"

        conn.query(query, [name, price, path], (error, result, fields) => {
            conn.release()

            if (error) return res.status(500).send({ error })

            const response = {
                message: "Produto cadastrado com sucesso",
                products: {
                    id: result.insertId,
                    name,
                    price,
                    image: path,
                    url: `http://${process.env.MYSQL_HOST}:3000/products`
                }
            }

            return res.status(201).send(response)
        })
    })
}

function updateProduct(req, res) {
    const { id } = req.params
    const { name, price } = req.body

    mysql.getConnection((error, conn) => {
        if (error) return res.status(500).send({ error })

        const query = "UPDATE tbl_produtos SET nome = ?, preco = ? WHERE id = ?"

        conn.query(query, [name, price, id], (error, result, fields) => {
            if (error) return res.status(500).send({ error })

            const response = {
                message: "Produto atualizado com sucesso",
                product: {
                    id: result[0].id,
                    name,
                    price,
                    image: result[0].imagem,
                    url: `http://${process.env.MYSQL_HOST}:3000/products`
                },
                request: {
                    description: "Atualiza dados de um produto"
                }
            }

            return res.status(202).send(response)
        })
    })
}

function deleteProduct(req, res) {
    const { id } = req.params

    mysql.getConnection((error, conn) => {
        if (error) return res.status(500).send({ error })

        const query = "DELETE FROM tbl_produtos WHERE id = ?"

        conn.query(query, [id], (error, result, fields) => {
            if (error) return res.status(500).send({ error })

            if (result.affectedRows === 0) {
                return res.status(404).send({
                    message: "Nenhum produto para remover com este id"
                })
            }

            const response = {
                message: "Produto removido com sucesso",
                request: {
                    description: "Remove um produto",
                    url: `http://${process.env.MYSQL_HOST}:3000/products`
                }
            }

            return res.status(202).send(response)
        })
    })
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}