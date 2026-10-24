'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

export default function OpeningAct() {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const dateRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })

      tl.fromTo(bgRef.current, 
        { scale: 1.15, filter: 'blur(4px)' },
        { scale: 1, filter: 'blur(0)', duration: 2.2, ease: 'expo.out' }
      )
      .fromTo(titleRef.current,
        { y: 60, opacity: 0, filter: 'blur(8px)' },
        { y: 0, opacity: 1, filter: 'blur(0)', duration: 1.4 }, '-=1.6'
      )
      .fromTo(subtitleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2 }, '-=1.0'
      )
      .fromTo(dateRef.current,
        { y: 30, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 1 }, '-=0.8'
      )
      .fromTo(scrollIndicatorRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, repeat: -1, yoyo: true, ease: 'sine.inOut' }, '-=0.4'
      )

      // Parallax on scroll
      gsap.to(bgRef.current, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        }
      })

      // Fade out content as we leave
      gsap.to([titleRef.current, subtitleRef.current, dateRef.current, scrollIndicatorRef.current], {
        opacity: 0,
        y: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'center top',
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
      className="section relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      aria-label="Abertura - 10 meses de nós"
    >
      {/* Background Photo - jean8.jpeg (lake) as HERO */}
      <div ref={bgRef} className="absolute inset-0 -z-10">
        <Image
          src="/img/jean8.jpeg"
          alt="Casal à beira do lago - nossa história"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900/50 via-charcoal-900/20 to-charcoal-900/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <h1
          ref={titleRef}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-cream-50 leading-[1.05] text-balance"
          style={{ textShadow: '0 4px 40px rgba(0,0,0,0.5)' }}
        >
          10 meses
          <br />
          <span className="font-script text-4xl md:text-5xl lg:text-6xl font-normal block mt-2" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.4)' }}>
            de nós
          </span>
        </h1>

        <p
          ref={subtitleRef}
          className="mt-8 md:mt-10 text-lg md:text-xl lg:text-2xl font-light text-cream-100 max-w-2xl mx-auto leading-relaxed text-balance"
          style={{ textShadow: '0 2px 20px rgba(0,0,0,0.4)' }}
        >
          Uma história escrita a dois,<br />
          com amor, paciência e escolhas diárias.
        </p>

        <div
          ref={dateRef}
          className="mt-10 md:mt-14 flex items-center justify-center gap-4 text-cream-200/90"
        >
          <div className="h-px w-24 md:w-32 bg-gradient-to-r from-transparent via-cream-300/60 to-transparent" />
          <time className="font-body text-sm md:text-base tracking-widest uppercase" dateTime="2024-10">
            Outubro 2024
          </time>
          <div className="h-px w-24 md:w-32 bg-gradient-to-r from-cream-300/60 via-transparent to-transparent" />
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-10 md:bottom-14 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-cream-300/70 animate-bounce"
        aria-hidden="true"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
        <span className="font-body text-xs tracking-widest uppercase opacity-60">Role para começar</span>
      </div>
    </section>
  )
}