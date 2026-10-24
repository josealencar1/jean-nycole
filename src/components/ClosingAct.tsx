'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

export default function ClosingAct() {
  const containerRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)
  const photoRef = useRef<HTMLDivElement>(null)
  const heartRefs = useRef<(HTMLSpanElement | null)[]>([])
  const finalLineRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title
      gsap.fromTo(titleRef.current,
        { y: 40, opacity: 0, filter: 'blur(8px)' },
        { y: 0, opacity: 1, filter: 'blur(0)', duration: 1.4, ease: 'expo.out', scrollTrigger: { trigger: containerRef.current, start: 'top 75%', toggleActions: 'play none none reverse' } }
      )

      // Text
      gsap.fromTo(textRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, delay: 0.2, ease: 'expo.out', scrollTrigger: { trigger: containerRef.current, start: 'top 70%', toggleActions: 'play none none reverse' } }
      )

      // Photo parallax
      gsap.to(photoRef.current, {
        yPercent: 10,
        ease: 'none',
        scrollTrigger: { trigger: containerRef.current, start: 'top bottom', end: 'bottom top', scrub: 1 }
      })

      // Hearts cascade
      const validHearts = heartRefs.current.filter(Boolean) as HTMLSpanElement[]
      gsap.fromTo(validHearts,
        { y: -100, opacity: 0, scale: 0, rotation: (i) => i * 45 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1.5,
          stagger: 0.15,
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: { trigger: containerRef.current, start: 'top 65%', toggleActions: 'play none none reverse' }
        }
      )

      // Final line
      gsap.fromTo(finalLineRef.current,
        { y: 30, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 1, delay: 0.6, ease: 'expo.out', scrollTrigger: { trigger: containerRef.current, start: 'top 60%', toggleActions: 'play none none reverse' } }
      )

      // Heart beats continuously
      validHearts.forEach((heart, i) => {
        gsap.to(heart, {
          scale: 1.2,
          duration: 0.8 + i * 0.1,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          scrollTrigger: { trigger: containerRef.current, start: 'top bottom', end: 'bottom top', toggleActions: 'play pause resume pause' }
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      className="section relative min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-20 pb-20 md:pb-28"
      aria-label="Encerramento - com amor"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-cream-50 via-rose-50/20 to-cream-50" />
        <Image
          src="/img/jean1.jpeg"
          alt=""
          fill
          className="object-cover opacity-3"
          priority={false}
          sizes="100vw"
        />
      </div>

      {/* Floating hearts background */}
      <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
        {[...Array(12)].map((_, i) => (
          <span
            key={i}
            ref={(el) => { heartRefs.current[i] = el }}
            className="absolute font-script text-rose-300/30 animate-float"
            style={{
              fontSize: `${1.5 + (i % 3) * 0.8}rem`,
              top: `${10 + i * 7}%`,
              left: `${5 + (i * 17) % 90}%`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${6 + i * 0.5}s`,
            }}
          >
            ♡
          </span>
        ))}
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto text-center">
        {/* Final Photo - jean1.jpeg (night selfie) as closing memory */}
        <div ref={photoRef} className="mb-10 md:mb-14 relative">
          <div className="photo-frame aspect-square max-w-md md:max-w-lg mx-auto" style={{ borderRadius: '50%', boxShadow: '0 30px 80px -20px rgba(0,0,0,0.2)' }}>
            <Image
              src="/img/jean1.jpeg"
              alt="Nossa selfie romântica - o começo e o sempre"
              fill
              className="object-cover"
              sizes="(max-width: 767px) 80vw, (max-width: 1023px) 50vw, 400px"
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-t from-charcoal-900/30 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Ornamental frame */}
          <div className="absolute inset-0 -z-10 flex items-center justify-center" aria-hidden="true">
            <div className="w-full h-full max-w-md md:max-w-lg rounded-full border border-rose-300/30 opacity-50" />
            <div className="absolute w-[calc(100%+2rem)] h-[calc(100%+2rem)] max-w-[calc(100%+2rem)] max-h-[calc(100%+2rem)] rounded-full border border-rose-300/20 opacity-30" />
          </div>
        </div>

        {/* Title */}
        <h2
          ref={titleRef}
          className="font-display text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-charcoal-900 mb-6 md:mb-8"
        >
          <span className="font-script text-2xl md:text-3xl lg:text-4xl block text-rose-600 mb-2">Para sempre</span>
          nós
        </h2>

        {/* Final message from declaration */}
        <p
          ref={textRef}
          className="font-body text-lg md:text-xl lg:text-xl leading-relaxed text-charcoal-600 max-w-2xl mx-auto mb-10 md:mb-14 text-balance"
        >
          Você é uma das minhas escolhas mais bonitas, e eu espero continuar escolhendo você todos os dias. Eu te amo, minha Nycole!
        </p>

        {/* Final decorative line with hearts */}
        <div className="flex items-center justify-center gap-4 md:gap-6 mb-8 md:mb-12" aria-hidden="true">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-rose-300/50 to-transparent" />
          <div className="flex items-center gap-2" role="img" aria-label="corações">
            <span className="font-script text-2xl text-rose-400">♡</span>
            <span className="font-script text-3xl text-rose-500">♡</span>
            <span className="font-script text-2xl text-rose-400">♡</span>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-rose-300/50 via-transparent to-transparent" />
        </div>

        {/* Signature / Final line */}
        <p
          ref={finalLineRef}
          className="font-script text-2xl md:text-3xl lg:text-4xl text-charcoal-900/80"
        >
          Eu te amo, minha Nycole! ♡
        </p>

        {/* Scroll to top hint */}
        <div className="mt-16 md:mt-20 opacity-0" style={{ animation: 'fadeInUp 1s ease-out 2.5s forwards' }}>
          <a
            href="#top"
            className="inline-flex items-center gap-2 px-6 py-3 bg-charcoal-900/10 hover:bg-charcoal-900/20 text-charcoal-600 font-body text-sm rounded-full transition-all duration-300"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 15l-6-6-6 6" />
            </svg>
            Voltar ao início
          </a>
        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  )
}