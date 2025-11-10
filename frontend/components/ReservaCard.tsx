"use client"

import { useState } from "react"
import { api } from "@/app/lib/api"

type Props = {
    hotelId: number
}

export default function ReservaCard({ hotelId }: Props) {
    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [data, setData] = useState("")
    const [loading, setLoading] = useState(false)

    async function postReserva() {
        if (!nome || !email || !data) {
            alert("Preencha todos os campos antes de continuar.")
            return
        }

        try {
            setLoading(true)
            const response = await api.post("/api/reservas", {
                nome,
                email,
                data,
                hotelId,
            })
            alert("Reserva feita com sucesso!")
            console.log("Reserva criada:", response.data)
            setNome("")
            setEmail("")
            setData("")
        } catch (error) {
            console.error("Erro ao criar reserva:", error)
            alert("Não foi possível fazer a reserva.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-[90%] max-w-[400px] bg-[#F2E0D0] p-5 sm:p-6 rounded-2xl shadow-lg flex flex-col gap-3 mx-auto my-auto fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <h2 className="text-xl sm:text-2xl font-bold text-[#59443F] mb-2 text-center">Fazer Reserva</h2>

            <label className="text-[#59443F] font-semibold text-sm sm:text-base">Nome:</label>
            <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="px-3 sm:px-4 py-2 rounded-lg border border-[#59443F]/30 focus:outline-none focus:ring-2 focus:ring-[#59443F]/40 text-[#59443F] text-sm sm:text-base"
            />

            <label className="text-[#59443F] font-semibold text-sm sm:text-base">E-mail:</label>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-3 sm:px-4 py-2 rounded-lg border border-[#59443F]/30 focus:outline-none focus:ring-2 focus:ring-[#59443F]/40 text-[#59443F] text-sm sm:text-base"
            />

            <label className="text-[#59443F] font-semibold text-sm sm:text-base">Data:</label>
            <input
                type="date"
                value={data}
                onChange={(e) => setData(e.target.value)}
                className="px-3 sm:px-4 py-2 rounded-lg border border-[#59443F]/30 focus:outline-none focus:ring-2 focus:ring-[#59443F]/40 text-[#59443F] text-sm sm:text-base"
            />

            <button
                onClick={postReserva}
                disabled={loading}
                className="mt-3 bg-[#59443F] text-[#F2E0D0] px-5 py-2 rounded-lg font-semibold hover:bg-[#705750] transition-colors duration-200 disabled:opacity-60 text-sm sm:text-base"
            >
                {loading ? "Enviando..." : "Reservar"}
            </button>
        </div>
    )
}
