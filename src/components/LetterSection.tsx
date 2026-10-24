'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

const letterParts = [
  { id: 1, text: 'Sei que nem todos os dias são fáceis, que temos nossas diferenças e momentos difíceis, mas quero que você saiba que o meu desejo é continuar aprendendo, amadurecendo e me tornando alguém cada vez melhor por mim, por você e pelo nosso futuro.' },
  { id: 2, text: 'Quero que o nosso amor continue crescendo, que nunca nos falte carinho, respeito, companheirismo e vontade de escolher um ao outro, mesmo nos dias complicados.' },
  { id: 3, text: 'Quando penso no futuro, é você que quero ao meu lado. Quero viver muitas outras comemorações com você, realizar nossos sonhos, construir nossa família e olhar para trás daqui a muitos anos, lembrando de tudo o que passamos e sentindo orgulho da história que construímos juntos.' },
  { id: 4, text: 'Obrigado por esses 10 meses de amor, companheirismo e felicidade. Que esses sejam apenas os primeiros de muitos meses e anos que ainda viveremos juntos. Eu te amo pela mulher que você é, pelo bem que você me faz e por tudo o que ainda quero viver ao seu lado.' },
  { id: 5, text: 'Feliz 10 meses para nós, meu amor!' },
  { id: 6, text: 'Você é uma das minhas escolhas mais bonitas, e eu espero continuar escolhendo você todos os dias. Eu te amo, minha Nycole!' },
]

export default function LetterSection() {
  const containerRef = useRef<HTMLElement>(null)
  const paperRef = useRef<HTMLDivElement>(null)
  const lineRefs = useRef<(HTMLParagraphElement | null)[]>([])
  const signatureRef = useRef<HTMLDivElement>(null)
  const heartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Paper entrance
      gsap.fromTo(paperRef.current,
        { y: 60, opacity: 0, rotateX: -5, scale: 0.98 },
        { y: 0, opacity: 1, rotateX: 0, scale: 1, duration: 1.4, ease: 'expo.out', scrollTrigger: { trigger: containerRef.current, start: 'top 70%', toggleActions: 'play none none reverse' } }
      )

      // Lines reveal one by one
      const validLines = lineRefs.current.filter(Boolean) as HTMLParagraphElement[]
      gsap.fromTo(validLines,
        { y: 30, opacity: 0, filter: 'blur(4px)' },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0)',
          duration: 1.1,
          stagger: 0.18,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 65%',
            end: 'center 30%',
            scrub: 0.7,
          }
        }
      )

      // Signature
      gsap.fromTo(signatureRef.current,
        { y: 20, opacity: 0, rotate: -2 },
        { y: 0, opacity: 1, rotate: 0, duration: 1, delay: 0.3, ease: 'expo.out', scrollTrigger: { trigger: containerRef.current, start: 'top 60%', toggleActions: 'play none none reverse' } }
      )

      // Heart beat
      gsap.to(heartRef.current, {
        scale: 1.15,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          toggleActions: 'play pause resume pause',
        }
      })

      // Subtle paper float
      gsap.to(paperRef.current, {
        yPercent: 5,
        rotateX: 1,
        rotateY: -1,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        }
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      className="section relative min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-20"
      aria-label="A carta - nossa declaração"
    >
      {/* Background atmosphere */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-rose-50/50 via-cream-50 to-cream-50" />
        <Image
          src="/img/jean1.jpeg"
          alt=""
          fill
          className="object-cover opacity-5"
          priority={false}
          sizes="100vw"
        />
      </div>

      {/* Floating decorative hearts */}
      <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
        {[1,2,3,4,5,6].map((i) => (
          <div
            key={i}
            className="absolute text-rose-300/20 font-script text-2xl md:text-3xl animate-pulse"
            style={{
              top: `${15 + i * 12}%`,
              left: `${5 + (i * 13) % 85}%`,
              animationDelay: `${i * 0.8}s`,
              transform: `rotate(${i * 15}deg)`,
            }}
          >
            ♡
          </div>
        ))}
      </div>

      {/* The Letter Paper */}
      <div
        ref={paperRef}
        className="relative z-10 w-full max-w-2xl mx-auto bg-cream-50/90 backdrop-blur-sm rounded-xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.12)] p-8 md:p-12 lg:p-16 border border-rose-100/60"
        style={{
          backgroundImage: `
            linear-gradient(rgba(218, 115, 135, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(218, 115, 135, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      >
        <div className="space-y-6 md:space-y-8">
          {letterParts.map((part, i) => (
            <p
              key={part.id}
              ref={(el) => { lineRefs.current[i] = el }}
              className={`font-body text-lg md:text-xl leading-relaxed text-charcoal-800 text-balance ${i === 4 ? 'font-script text-2xl md:text-3xl text-rose-600 text-center my-4' : ''} ${i === 5 ? 'font-script text-xl md:text-2xl text-rose-700 text-right pt-4 border-t border-rose-200/60' : ''}`}
              style={{ 
                fontFamily: i >= 4 ? 'var(--font-script), cursive' : 'var(--font-body), system-ui, sans-serif',
              }}
            >
              {part.text.split(' ').map((word, wi) => (
                <span key={wi} className="inline-block">{word} </span>
              ))}
            </p>
          ))}

          <div
            ref={signatureRef}
            className="flex items-end justify-between gap-4 pt-4 mt-2"
          >
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-rose-300/50 to-transparent" />
            <div className="flex flex-col items-end gap-1">
              <p className="font-script text-xl md:text-2xl text-rose-600">com todo meu amor,</p>
              <p className="font-script text-2xl md:text-3xl text-charcoal-900">Jean</p>
              <div
                ref={heartRef}
                className="font-script text-2xl text-rose-500 mt-1"
                style={{ transformOrigin: 'center center' }}
              >
                ♡
              </div>
            </div>
          </div>
        </div>

        {/* Paper texture overlay */}
        <div className="absolute inset-0 rounded-xl pointer-events-none opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }} aria-hidden="true" />
      </div>
    </section>
  )
}