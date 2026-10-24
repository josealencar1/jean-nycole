'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

export default function FutureAct() {
  const containerRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const textRefs = useRef<(HTMLParagraphElement | null)[]>([])
  const photoRef = useRef<HTMLDivElement>(null)
  const dreamRefs = useRef<(HTMLDivElement | null)[]>([])

  const dreams = [
    'Muitas comemorações juntos',
    'Realizar nossos sonhos',
    'Construir nossa família',
    'Olhar para trás com orgulho',
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: containerRef.current, start: 'top 75%', toggleActions: 'play none none reverse' } }
      )

      const validTexts = textRefs.current.filter(Boolean) as HTMLParagraphElement[]
      gsap.fromTo(validTexts,
        { y: 40, opacity: 0, filter: 'blur(6px)' },
        { y: 0, opacity: 1, filter: 'blur(0)', duration: 1.2, stagger: 0.2, ease: 'expo.out', scrollTrigger: { trigger: containerRef.current, start: 'top 70%', end: 'center 40%', scrub: 0.7 } }
      )

      // Photo parallax
      gsap.to(photoRef.current, {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: { trigger: containerRef.current, start: 'top bottom', end: 'bottom top', scrub: 1 }
      })

      // Dream cards stagger
      const validDreams = dreamRefs.current.filter(Boolean) as HTMLDivElement[]
      gsap.fromTo(validDreams,
        { y: 50, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.9, stagger: 0.15, ease: 'expo.out', scrollTrigger: { trigger: containerRef.current, start: 'top 65%', toggleActions: 'play none none reverse' } }
      )

      // Floating particles
      gsap.to('.future-particle', {
        yPercent: -30,
        xPercent: (i) => (i % 2 === 0 ? 15 : -15),
        rotation: 360,
        ease: 'none',
        scrollTrigger: { trigger: containerRef.current, start: 'top bottom', end: 'bottom top', scrub: 1 }
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      className="section relative min-h-screen flex items-center px-6 md:px-12 lg:px-20"
      aria-label="O futuro deles"
    >
      {/* Atmospheric background */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-50/40 via-cream-50 to-blue-50/30" />
        <Image
          src="/img/jean8.jpeg"
          alt=""
          fill
          className="object-cover opacity-3"
          priority={false}
          sizes="100vw"
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="future-particle absolute rounded-full bg-rose-300/20"
            style={{
              width: `${4 + (i % 3) * 2}px`,
              height: `${4 + (i % 3) * 2}px`,
              top: `${15 + i * 10}%`,
              left: `${8 + (i * 11) % 80}%`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      <div className="relative w-full max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Photo - jean8.jpeg (lake) as hero for future */}
        <div className="lg:col-span-6 lg:col-start-1 relative z-10 order-2 lg:order-1">
          <div ref={photoRef} className="photo-frame aspect-[3/4] md:aspect-[4/5] relative" style={{ borderRadius: '1rem' }}>
            <Image
              src="/img/jean8.jpeg"
              alt="Casal à beira do lago - nosso futuro"
              fill
              className="object-cover"
              sizes="(max-width: 1023px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/30 via-transparent to-transparent pointer-events-none" style={{ borderRadius: '1rem' }} />
          </div>
        </div>

        {/* Text Content */}
        <div className="lg:col-span-6 lg:col-start-7 z-10 order-1 lg:order-2 pr-4 md:pr-8">
          <h2
            ref={titleRef}
            className="font-display text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-charcoal-900"
          >
            O futuro
            <br />
            <span className="font-script text-2xl md:text-3xl lg:text-4xl font-normal block mt-1 text-rose-600">que sonhamos</span>
          </h2>

          <div className="mt-8 md:mt-12 space-y-6 md:space-y-8">
            {[
              'Quando penso no futuro, é você que quero ao meu lado.',
              'Quero viver muitas outras comemorações com você, realizar nossos sonhos, construir nossa família e olhar para trás daqui a muitos anos, lembrando de tudo o que passamos e sentindo orgulho da história que construímos juntos.',
              'Obrigado por esses 10 meses de amor, companheirismo e felicidade. Que esses sejam apenas os primeiros de muitos meses e anos que ainda viveremos juntos.',
              'Eu te amo pela mulher que você é, pelo bem que você me faz e por tudo o que ainda quero viver ao seu lado.',
            ].map((text, i) => (
              <p
                key={i}
                ref={(el) => { textRefs.current[i] = el }}
                className="font-body text-lg md:text-xl leading-relaxed text-charcoal-700 text-balance"
              >
                {text.split(' ').map((word, wi) => (
                  <span key={wi} className="inline-block">{word} </span>
                ))}
              </p>
            ))}
          </div>

          {/* Dream cards */}
          <div className="mt-10 md:mt-14 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6" role="list" aria-label="Nossos sonhos">
            {dreams.map((dream, i) => (
              <div
                key={dream}
                ref={(el) => { dreamRefs.current[i] = el }}
                className="relative p-5 md:p-6 bg-cream-100/80 backdrop-blur-sm rounded-xl border border-rose-100/60 group hover:border-rose-300/60 transition-all duration-500"
                role="listitem"
              >
                <span className="absolute top-4 right-4 font-script text-2xl text-rose-300/60" aria-hidden="true">✦</span>
                <p className="font-body text-sm md:text-base font-medium text-charcoal-800 leading-snug text-balance">{dream}</p>
                <div className="absolute bottom-0 left-0 w-0 h-px bg-rose-400 group-hover:w-full transition-all duration-700 ease-out" aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}