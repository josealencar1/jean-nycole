'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

export default function NycolePortrait() {
  const containerRef = useRef<HTMLElement>(null)
  const photoRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const quoteRef = useRef<HTMLQuoteElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)
  const decorativeRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Photo entrance with 3D depth
      gsap.fromTo(photoRef.current,
        { y: 60, opacity: 0, rotateY: 15, scale: 0.95, filter: 'blur(8px)' },
        { y: 0, opacity: 1, rotateY: 0, scale: 1, filter: 'blur(0)', duration: 1.6, ease: 'expo.out', scrollTrigger: { trigger: containerRef.current, start: 'top 70%', toggleActions: 'play none none reverse' } }
      )

      // Title
      gsap.fromTo(titleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.2, ease: 'expo.out', scrollTrigger: { trigger: containerRef.current, start: 'top 70%', toggleActions: 'play none none reverse' } }
      )

      // Quote
      gsap.fromTo(quoteRef.current,
        { y: 30, opacity: 0, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, duration: 1, delay: 0.4, ease: 'expo.out', scrollTrigger: { trigger: containerRef.current, start: 'top 65%', toggleActions: 'play none none reverse' } }
      )

      // Text
      gsap.fromTo(textRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.6, ease: 'expo.out', scrollTrigger: { trigger: containerRef.current, start: 'top 60%', toggleActions: 'play none none reverse' } }
      )

      // Decorative elements
      const validDecos = decorativeRefs.current.filter(Boolean) as HTMLDivElement[]
      gsap.fromTo(validDecos,
        { scale: 0, opacity: 0, rotation: -45 },
        { scale: 1, opacity: 1, rotation: 0, duration: 1, stagger: 0.2, delay: 0.8, ease: 'elastic.out(1, 0.5)', scrollTrigger: { trigger: containerRef.current, start: 'top 65%', toggleActions: 'play none none reverse' } }
      )

      // Subtle 3D parallax on photo
      gsap.to(photoRef.current, {
        rotateY: 3,
        rotateX: -2,
        yPercent: 5,
        ease: 'none',
        scrollTrigger: { trigger: containerRef.current, start: 'top bottom', end: 'bottom top', scrub: 1 }
      })

      // Floating particles
      gsap.to('.nycole-particle', {
        yPercent: -50,
        xPercent: (i) => (i % 2 === 0 ? 30 : -30),
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
      aria-label="Para a Nycole - retrato especial"
    >
      {/* Atmospheric background */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-50/50 via-cream-50 to-rose-50/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,var(--tw-gradient-stops))] from-rose-100/50 via-transparent to-transparent" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="nycole-particle absolute rounded-full bg-rose-300/30"
            style={{
              width: `${3 + (i % 4) * 2}px`,
              height: `${3 + (i % 4) * 2}px`,
              top: `${10 + i * 8}%`,
              left: `${5 + (i * 13) % 90}%`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative w-full max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Photo Column - jean3.jpeg (Nycole's portrait in car at night) */}
        <div className="lg:col-span-6 lg:col-start-1 relative z-10 order-2 lg:order-1">
          <div ref={photoRef} className="relative max-w-md md:max-w-lg mx-auto">
            <div className="photo-frame aspect-[9/16] relative" style={{ borderRadius: '1.5rem', boxShadow: '0 40px 100px -20px rgba(0,0,0,0.25)' }}>
              <Image
                src="/img/jean3.jpeg"
                alt="Retrato da Nycole no carro à noite"
                fill
                className="object-cover"
                sizes="(max-width: 1023px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 rounded-[1.5rem] bg-gradient-to-t from-charcoal-900/40 via-transparent to-rose-500/10 pointer-events-none" />
            </div>

            {/* Decorative corner accents */}
            <div
              ref={(el) => { decorativeRefs.current[0] = el }}
              className="absolute -top-4 -left-4 w-16 h-16 border-2 border-rose-400/50 rounded-tl-[1.5rem] border-r-0 border-b-0"
              aria-hidden="true"
            />
            <div
              ref={(el) => { decorativeRefs.current[1] = el }}
              className="absolute -bottom-4 -right-4 w-16 h-16 border-2 border-rose-400/50 rounded-br-[1.5rem] border-l-0 border-t-0"
              aria-hidden="true"
            />
            <div
              ref={(el) => { decorativeRefs.current[2] = el }}
              className="absolute -top-4 -right-4 w-16 h-16 border-2 border-rose-300/40 rounded-tr-[1.5rem] border-l-0 border-b-0 opacity-60"
              aria-hidden="true"
            />
            <div
              ref={(el) => { decorativeRefs.current[3] = el }}
              className="absolute -bottom-4 -left-4 w-16 h-16 border-2 border-rose-300/40 rounded-bl-[1.5rem] border-r-0 border-t-0 opacity-60"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Content Column */}
        <div className="lg:col-span-6 lg:col-start-7 z-10 order-1 lg:order-2 pl-4 md:pl-8">
          <h2
            ref={titleRef}
            className="font-display text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-charcoal-900"
          >
            Para a
            <br />
            <span className="font-script text-3xl md:text-4xl lg:text-5xl font-normal block mt-1 text-rose-600">Nycole</span>
          </h2>

          <blockquote
            ref={quoteRef}
            className="mt-6 md:mt-8 relative pl-6 border-l-4 border-rose-400/60"
          >
            <p className="font-script text-xl md:text-2xl lg:text-3xl text-charcoal-700 leading-relaxed text-balance">
              "Você é uma pessoa muito especial para mim, e cada dia ao seu lado me faz perceber o quanto sou feliz por ter você."
            </p>
            <footer className="mt-4 font-body text-sm text-charcoal-500 not-italic">
              — Da nossa declaração de 10 meses
            </footer>
          </blockquote>

          <p
            ref={textRef}
            className="mt-8 md:mt-10 font-body text-lg md:text-xl leading-relaxed text-charcoal-600 text-balance"
          >
            Este espaço é só seu. Um retrato que guarda a luz dos seus olhos,
            a delicadeza do seu sorriso e todo o carinho que cabe no meu peito.
            Obrigado por ser a mulher incrível que você é — minha namorada,
            minha companheira, minha paz.
          </p>

          {/* Small signature */}
          <div className="mt-10 md:mt-14 flex items-center gap-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-rose-300/50 to-transparent" />
            <div className="text-right">
              <p className="font-script text-xl text-rose-600">com amor,</p>
              <p className="font-script text-2xl text-charcoal-900">Jean</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}