import { Button } from "@/components/ui/button";

export const HeroBanner = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Python Pro Banner */}
        <div className="relative overflow-hidden rounded-2xl gradient-blue p-8 text-white min-h-[280px] flex flex-col justify-between animate-enter">
          <div className="absolute top-4 left-8">
            <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
              NOLDAN PROFESSIONALGA
            </span>
          </div>
          
          <div className="mt-12">
            <h1 className="text-4xl font-bold mb-4">PYTHON PRO</h1>
            <div className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium inline-block">
              300 000 so'm
            </div>
          </div>
          
          {/* Code Window */}
          <div className="absolute right-6 top-6 w-[420px] max-w-[55%] hidden md:block glass-panel shadow-lg animate-enter">
            <div className="flex items-center gap-2 p-3 border-b border-border/20">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
            </div>
            <pre className="p-4 text-xs md:text-sm leading-6 font-mono text-foreground/90">
{`coder = {
  "name": "Avaz",
  "skills": ["Python", "React", "Node"],
  "hard_worker": True,
  "problem_solver": True,
}


def hireable(c: dict) -> bool:
  return (
    c["hard_worker"]
    and c["problem_solver"]
    and len(c["skills"]) >= 5
  )
`}
            </pre>
          </div>
        </div>

        {/* Aiogram Banner */}
        <div className="relative overflow-hidden rounded-2xl gradient-purple p-8 text-white min-h-[280px] flex flex-col justify-between animate-enter">
          <div className="absolute top-4 left-8">
            <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
              TO'LIQ KURS
            </span>
          </div>
          
          <div className="mt-12">
            <h2 className="text-3xl font-bold mb-2">AIOGRAM</h2>
            <div className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium inline-block">
              BOT YARATISH
            </div>
          </div>
          
          {/* 3D Elements */}
          <div className="absolute right-0 top-0 w-1/2 h-full opacity-80">
            <div className="absolute top-12 right-8 w-14 h-14 bg-pink-400 rounded-lg transform rotate-12"></div>
            <div className="absolute top-24 right-16 w-10 h-10 bg-cyan-300 rounded-lg transform -rotate-12"></div>
            <div className="absolute bottom-20 right-10 w-16 h-16 bg-orange-400 rounded-lg transform rotate-45"></div>
          </div>
        </div>
      </div>
    </div>
  );
};