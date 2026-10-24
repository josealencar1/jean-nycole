'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

const galleryPhotos = [
  { src: '/img/jean4.jpeg', alt: 'Selfie divertida do casal - alegria espontânea', width: 720, height: 1280 },
  { src: '/img/jean5.jpeg', alt: 'Selfie noturna ao ar livre - romance cotidiano', width: 720, height: 1280 },
  { src: '/img/jean6.jpeg', alt: 'Selfie em ambiente interno - conforto e naturalidade', width: 720, height: 1280 },
  { src: '/img/jean7.jpeg', alt: 'Selfie com pelúcia - fofura e autenticidade', width: 720, height: 1280 },
  { src: '/img/jean2.jpeg', alt: 'Passeio nas pedras - aventura e companheirismo', width: 720, height: 1280 },
  { src: '/img/jean1.jpeg', alt: 'Selfie romântica noturna - intimidade e carinho', width: 720, height: 1280 },
]

export default function PhotoGallery() {
  const containerRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: containerRef.current, start: 'top 75%', toggleActions: 'play none none reverse' } }
      )
      gsap.fromTo(subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.2, ease: 'expo.out', scrollTrigger: { trigger: containerRef.current, start: 'top 75%', toggleActions: 'play none none reverse' } }
      )

      const validCards = cardRefs.current.filter(Boolean) as HTMLDivElement[]
      gsap.fromTo(validCards,
        { y: 80, opacity: 0, rotateX: 15, scale: 0.92, filter: 'blur(8px)' },
        {
          y: 0, opacity: 1, rotateX: 0, scale: 1, filter: 'blur(0)',
          duration: 1.3, stagger: 0.12, ease: 'expo.out',
          scrollTrigger: { trigger: containerRef.current, start: 'top 70%', end: 'center 40%', scrub: 0.6 }
        }
      )

      validCards.forEach((card, i) => {
        gsap.to(card, {
          yPercent: (i % 2 === 0 ? -8 : 8),
          rotateY: (i % 3 === 0 ? -2 : i % 3 === 1 ? 2 : 0),
          ease: 'none',
          scrollTrigger: { trigger: containerRef.current, start: 'top bottom', end: 'bottom top', scrub: 1 }
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      className="section relative min-h-screen px-6 md:px-12 lg:px-20 pt-20 pb-20"
      aria-label="Memórias e fotografias"
    >
      <div className="relative w-full max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-20 lg:mb-24">
          <h2
            ref={titleRef}
            className="font-display text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-charcoal-900"
          >
            Memórias
            <br />
            <span className="font-script text-2xl md:text-3xl lg:text-4xl font-normal block mt-1 text-rose-600">guardadas</span>
          </h2>
          <p
            ref={subtitleRef}
            className="mt-4 md:mt-6 font-body text-lg md:text-xl text-charcoal-500 max-w-2xl mx-auto leading-relaxed"
          >
            Seis instantâneos de uma história que não cabe em molduras — do cotidiano às aventuras.
          </p>
        </div>

        <div 
          className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          style={{ perspective: '1000px' }}
        >
          {galleryPhotos.map((photo, i) => (
            <div
              key={photo.src}
              ref={(el) => { cardRefs.current[i] = el }}
              className="relative group"
            >
              <div 
                className="photo-frame aspect-[9/16] md:aspect-[3/4] group-hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.2)] transition-all duration-700 ease-out"
                style={{ borderRadius: '0.75rem', transformStyle: 'preserve-3d' }}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" style={{ borderRadius: '0.75rem' }} />
              </div>

              {/* Caption on hover */}
              <div className="absolute bottom-4 left-4 right-4 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out px-4 pb-4">
                <p className="font-body text-sm md:text-base text-cream-50 text-center leading-snug drop-shadow-lg">
                  {photo.alt}
                </p>
              </div>

              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-16 h-px bg-rose-300/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>

      {/* Decorative floating elements */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/4 left-4 w-2 h-2 bg-rose-300/30 rounded-full animate-pulse" style={{ animationDelay: '0s' }} />
        <div className="absolute top-1/3 right-6 w-1 h-1 bg-rose-300/20 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-1/3 left-8 w-1.5 h-1.5 bg-rose-300/25 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 right-4 w-2 h-2 bg-rose-300/30 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>
    </section>
  )
}