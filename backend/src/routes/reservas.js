import express from 'express'
import { prisma } from '../prisma.js'

const router = express.Router()

router.get("/api/reservas/:email", async (req, res) => {
    try {
        const email = req.params.email

        await prisma.reserva.deleteMany({
            where: {
                data: {
                    lt: new Date()
                }
            }
        })

        const reservas = await prisma.reserva.findMany({
            where: { email },
            include: { hotel: true },
        });

        if (reservas.length === 0) {
            return res.status(404).json({ msg: "Não há reservas para este email" })
        }

        res.status(200).json(reservas)
    } catch (e) {
        console.error(e)
        res.status(500).json({ error: "Erro ao buscar reservas", obj: e.message })
    }
});

router.post("/api/reservas", async (req, res) => {
    try {
        const { nome, email, data, hotelId } = req.body



        const hotel = await prisma.hotel.findUnique({ where: { id: hotelId } });
        if (hotel.vagas <= 0) return res.status(400).json({ msg: "Sem vagas disponíveis" });

        const dataCorrigida = new Date(data)
        dataCorrigida.setHours(dataCorrigida.getHours() + 3)

        const novaReserva = await prisma.reserva.create({
            data: {
                nome,
                email,
                data: dataCorrigida,
                hotelId,
            },
        })

        await prisma.hotel.update({
            where: { id: novaReserva.hotelId },
            data: {
                vagas: { decrement: 1 },
            },
        })

        res.status(201).json({
            msg: "Reserva adicionada com sucesso",
            reserva: novaReserva,
        })
    } catch (e) {
        console.error(e)
        res.status(500).json({ error: "Erro ao adicionar reserva", obj: e.message })
    }
})

router.delete("/api/reservas/:id", async (req, res) => {
    try {
        const id = Number(req.params.id)

        const reserva = await prisma.reserva.findUnique({
            where: { id },
        })

        if (!reserva) {
            return res.status(404).json({ msg: "Reserva não encontrada" })
        }

        await prisma.reserva.delete({
            where: { id },
        })

        await prisma.hotel.update({
            where: { id: reserva.hotelId },
            data: {
                vagas: { increment: 1 },
            },
        })

        res.status(200).json({
            msg: "Reserva cancelada com sucesso",
            reservaId: id,
        })
    } catch (e) {
        console.error(e)
        res.status(500).json({
            error: "Erro ao cancelar reserva",
            obj: e.message,
        })
    }
})

export default router