"use client"

import { useEffect, useState } from "react"
import { api } from "@/app/lib/api"
import ReservaCard from "../../components/ReservaCard"

type Hotel = {
  id: number,
  nome: string,
  cidade: string,
  preco: number,
  vagas: number,
  img: string
}

export default function Home() {
  const [hoteis, setHoteis] = useState<Hotel[]>([])
  const [showReserva, setShowReserva] = useState(false)
  const [selectedHotelId, setSelectedHotelId] = useState<number | null>(null)

  useEffect(() => {
    async function fetchHoteis() {
      try {
        const response = await api.get("/api/hoteis")
        setHoteis(response.data)
      } catch (e) {
        console.log("erro de busca", e)
      }
    }

    fetchHoteis()
  }, [])

  function abrirReserva(hotelId: number) {
    setSelectedHotelId(hotelId)
    setShowReserva(true)
  }

  function fecharReserva() {
    setShowReserva(false)
    setSelectedHotelId(null)
  }

  return (
    <>
      <section className="w-full max-w-[900px] h-full bg-[#F2E0D0] flex flex-col items-center justify-start px-6 py-6 mx-auto mb-5 rounded-b-2xl">
        <h1 className="text-3xl font-bold text-[#59443F] mb-6">
          Hotéis disponíveis
        </h1>

        <ul className="flex flex-col gap-4 w-full px-4">
          {hoteis.map((hotel) => (
            <li
              key={hotel.id}
              className="flex items-center justify-between w-full bg-white rounded-xl p-10 gap-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex-1 flex flex-col justify-between text-[#59443F] w-full max-w-[350px]">
                <div>
                  <p className="text-xl font-semibold">{hotel.nome}</p>
                  <p className="text-sm opacity-80">{hotel.cidade}</p>
                  <p className="text-sm">Vagas: {hotel.vagas}</p>
                  <p className="text-lg font-medium mt-2">R$ {hotel.preco}</p>
                </div>
                <button
                  onClick={() => abrirReserva(hotel.id)}
                  className="bg-[#59443F] text-[#F2E0D0] px-5 py-2 rounded-lg font-semibold hover:bg-[#705750] transition-colors duration-200 cursor-pointer"
                >
                  Reservar
                </button>
              </div>

              <img
                src={hotel.img}
                alt={hotel.nome}
                className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-50 lg:h-50 object-cover rounded-xl border-2 border-[#59443F]/30 shadow-sm"
              />


            </li>
          ))}
        </ul>
      </section>

      {showReserva && selectedHotelId && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50"
          onClick={fecharReserva}
        >
          <div
            className="w-[400px] bg-[#F2E0D0] p-6 rounded-2xl shadow-lg flex flex-col gap-3 relative"
            onClick={(e) => e.stopPropagation()}
          >

            <ReservaCard hotelId={selectedHotelId} />
          </div>
        </div>
      )}
    </>
  )
}
