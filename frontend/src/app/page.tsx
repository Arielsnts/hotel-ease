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
  const [loading, setLoading] = useState(true)
  const [showReserva, setShowReserva] = useState(false)
  const [selectedHotelId, setSelectedHotelId] = useState<number | null>(null)

  useEffect(() => {
    async function fetchHoteis() {
      try {
        setLoading(true)
        const response = await api.get("/api/hoteis")
        setHoteis(response.data)
      } catch (e) {
        console.log("erro de busca", e)
      } finally {
        setLoading(false)
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
      <section className="w-full max-w-[900px] bg-[#F2E0D0] flex flex-col items-center justify-start px-4 py-6 mx-auto mb-5 rounded-b-2xl shadow-md h-full">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#59443F] mb-6">
          Hotéis disponíveis
        </h1>

        {/* LOADING */}
        {loading ? (
          <div className="flex flex-col items-center justify-center w-full py-10">
            <div className="w-10 h-10 border-4 border-[#59443F] border-t-transparent rounded-full animate-spin mb-3"></div>
            <p className="text-[#59443F] font-medium">Carregando hotéis...</p>
          </div>
        ) : (
          <ul className="flex flex-col gap-4 w-full px-2 sm:px-4">
            {hoteis.map((hotel) => (
              <li
                key={hotel.id}
                className="flex flex-col-reverse sm:flex-row items-center justify-between w-full bg-white rounded-xl p-5 sm:p-6 md:p-8 gap-4 sm:gap-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex-1 flex flex-col justify-between text-[#59443F] w-full max-w-[350px] text-center sm:text-left">
                  <div>
                    <p className="text-lg sm:text-xl font-semibold">{hotel.nome}</p>
                    <p className="text-sm opacity-80">{hotel.cidade}</p>
                    <p className="text-sm">Vagas: {hotel.vagas}</p>
                    <p className="text-base sm:text-lg font-medium mt-2">
                      R$ {hotel.preco}
                    </p>
                  </div>
                  <button
                    onClick={() => abrirReserva(hotel.id)}
                    className="bg-[#59443F] text-[#F2E0D0] px-4 py-2 sm:px-5 sm:py-2 rounded-lg font-semibold hover:bg-[#705750] transition-colors duration-200 cursor-pointer mt-3 sm:mt-0"
                  >
                    Reservar
                  </button>
                </div>

                <img
                  src={hotel.img}
                  alt={hotel.nome}
                  className="w-36 h-36 sm:w-40 sm:h-40 object-cover rounded-xl border-2 border-[#59443F]/30 shadow-sm"
                />
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* MODAL DE RESERVA */}
      {showReserva && selectedHotelId && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50"
          onClick={fecharReserva}
        >
          <div
            className="w-[90%] max-w-[400px] bg-[#F2E0D0] p-5 sm:p-6 rounded-2xl shadow-lg flex flex-col gap-3 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <ReservaCard hotelId={selectedHotelId} />
          </div>
        </div>
      )}
    </>
  )
}
