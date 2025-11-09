"use client"

import { useState } from "react"
import { api } from "@/app/lib/api"

type Hotel = {
    id: number
    nome: string
    cidade: string
}

type Reserva = {
    id: number
    nome: string
    email: string
    data: string
    hotelId: number
    hotel: Hotel
}

export default function Reservas() {
    const [email, setEmail] = useState("")
    const [reservas, setReservas] = useState<Reserva[]>([])
    const [loading, setLoading] = useState(false)

    async function fetchReservas() {
        if (!email) return alert("Digite um e-mail válido.")
        try {
            setLoading(true)
            const response = await api.get(`/api/reservas/${email}`)
            setReservas(response.data)
        } catch (e) {
            console.log("erro de busca", e)
            alert("Erro ao buscar reservas.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <section className="w-full max-w-[900px] h-full bg-[#F2E0D0] flex flex-col items-center justify-start px-6 py-6 mx-auto mb-5 rounded-b-2xl">
            <h1 className="text-3xl font-bold text-[#59443F] mb-6">Minhas Reservas</h1>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full mb-6">
                <label htmlFor="email" className="text-[#59443F] font-semibold">
                    E-mail:
                </label>
                <input
                    type="email"
                    id="email"
                    placeholder="seuemail@exemplo.com"
                    className="flex-1 px-4 py-2 rounded-lg border border-[#59443F]/30 focus:outline-none focus:ring-2 focus:ring-[#59443F]/50 text-[#59443F]"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button
                    onClick={fetchReservas}
                    className="bg-[#59443F] text-[#F2E0D0] px-5 py-2 rounded-lg font-semibold hover:bg-[#705750] transition-colors duration-200 disabled:opacity-60"
                    disabled={loading}
                >
                    {loading ? "Carregando..." : "Verificar"}
                </button>
            </div>

            {reservas.length > 0 ? (
                <ul className="w-full space-y-3">
                    {reservas.map((reserva) => (
                        <li
                            key={reserva.id}
                            className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-lg border border-[#59443F]/20 shadow-sm hover:shadow-md transition-shadow duration-200"
                        >
                            <div className="text-[#59443F]">
                                <p className="text-lg font-semibold">{reserva.hotel.nome}</p>
                                <p className="text-sm opacity-80">{reserva.hotel.cidade}</p>
                                <p className="text-sm mt-1">
                                    Data: {new Date(reserva.data).toLocaleDateString('pt-BR')}
                                </p>
                            </div>
                            <p className="text-[#59443F] font-medium mt-2 sm:mt-0">
                                Reserva em nome de: <span className="font-semibold">{reserva.nome}</span>
                            </p>
                        </li>
                    ))}
                </ul>
            ) : (
                !loading && (
                    <p className="text-[#59443F]/80 italic mt-4">
                        Nenhuma reserva encontrada.
                    </p>
                )
            )}
        </section>
    )
}
