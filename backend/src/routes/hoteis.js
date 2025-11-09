import express from 'express'
import { prisma } from '../prisma.js'

const router = express.Router()

router.get("/api/hoteis", async (req, res) => {
    try {
        const hoteis = await prisma.hotel.findMany()
        res.status(200).json(hoteis)
    }
    catch (e) {
        console.log(e)
        res.status(500).json({ error: "Erro ao buscar hotéis", obj: e })
    }
})

router.get("/api/hoteis/:id", async (req, res) => {
    try {
        const id = Number(req.params.id)

        const hotel = await prisma.hotel.findUnique({ where: { id: id } })

        res.status(200).json(hotel)
    }
    catch (e) {
        console.log(e)
        res.status(500).json({ error: "Erro ao buscar hotéis", obj: e })
    }
})

router.post("/api/hoteis", async (req, res) => {
    try {
        const { nome, cidade, preco, vagas, img } = req.body

        const novoHotel = await prisma.hotel.create({
            data: {
                nome: nome,
                cidade: cidade,
                preco: parseFloat(preco),
                vagas: parseInt(vagas),
                img
            }
        })

        res.status(201).json({
            msg: "Hotel adicionado com sucesso",
            hotel: novoHotel
        })
    }
    catch (e) {
        console.lof(e)
        res.status(500).json({ error: "Erro ao adicionar hotél", obj: e })
    }
})

export default router