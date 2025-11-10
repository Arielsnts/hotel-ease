import { FaLinkedin, FaGithub } from "react-icons/fa";

export default function Sobre() {
  return (
    <section className="w-full max-w-[900px] h-full bg-[#F2E0D0] flex flex-col items-center justify-start px-6 py-6 mx-auto mb-5 rounded-b-2xl text-center">
      <h1 className="text-3xl font-bold text-[#59443F] mb-4">Sobre</h1>

      <p className="text-[#59443F] text-lg leading-relaxed mb-4 max-w-[700px]">
        Este é um sistema web de <span className="font-semibold">reserva de hotéis</span>,
        desenvolvido para praticar e demonstrar o uso de tecnologias modernas como{" "}
        <span className="font-semibold">Next.js</span>,{" "}
        <span className="font-semibold">PostgreSQL</span> e{" "}
        <span className="font-semibold">Prisma ORM</span>.
      </p>

      <div className="text-[#59443F] mb-6">
        <p className="text-lg font-semibold">Desenvolvedor:</p>
        <p className="text-lg font-medium">Ariel Santos</p>
        <p className="text-sm opacity-80">arielsant520@gmail.com</p>
      </div>

      <div className="flex items-center gap-6 text-[#59443F]">
        <a
          href="https://www.linkedin.com/in/ariel-santos-souza-998b8b31a"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#A69581] transition-transform transform hover:scale-110"
        >
          <FaLinkedin size={35} />
        </a>
        <a
          href="https://github.com/Arielsnts"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#A69581] transition-transform transform hover:scale-110"
        >
          <FaGithub size={35} />
        </a>
      </div>
    </section>
  );
}
