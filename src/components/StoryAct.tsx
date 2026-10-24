'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

const paragraphs = [
  `Meu amor, hoje completamos 10 meses juntos, e meu coração só sabe agradecer a Deus por ter colocado você na minha vida. Sou muito grato por cada momento ao seu lado, por cada sorriso, cada abraço, cada beijo e até pelos desafios que enfrentamos, porque tudo isso faz parte da nossa história e nos ensina a crescer juntos.`,
  `Nycole, obrigado por ser minha namorada, minha companheira, minha paz e uma das partes mais bonitas da minha vida. Obrigado por compartilhar seus dias comigo, por me permitir fazer parte da sua história e por construir comigo algo que vai muito além de palavras. Você é uma pessoa muito especial para mim, e cada dia ao seu lado me faz perceber o quanto sou feliz por ter você.`,
]

export default function StoryAct() {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRefs = useRef<(HTMLParagraphElement | null)[]>([])
  const photoRef = useRef<HTMLDivElement>(null)
  const quoteRef = useRef<HTMLQuoteElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const validRefs = textRefs.current.filter(Boolean) as HTMLParagraphElement[]
      
      gsap.fromTo(validRefs,
        { y: 50, opacity: 0, filter: 'blur(6px)' },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0)',
          duration: 1.2,
          stagger: 0.25,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            end: 'center 50%',
            scrub: 0.8,
          }
        }
      )

      // Photo parallax - jean2.jpeg (rocks/adventure)
      gsap.to(photoRef.current, {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        }
      })

      // Quote highlight
      gsap.fromTo(quoteRef.current,
        { scale: 0.95, opacity: 0, borderLeftWidth: 0 },
        {
          scale: 1,
          opacity: 1,
          borderLeftWidth: '4px',
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: quoteRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      className="section relative min-h-screen flex items-center px-6 md:px-12 lg:px-20"
      aria-label="O início da nossa história"
    >
      <div className="relative w-full max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Text Column */}
        <div className="lg:col-span-6 lg:col-start-1 z-10">
          <div className="space-y-8 md:space-y-10 pr-8 md:pr-12">
            {paragraphs.map((paragraph, i) => (
              <p
                key={i}
                ref={(el) => { textRefs.current[i] = el }}
                className="font-body text-lg md:text-xl lg:text-xl leading-relaxed text-charcoal-700 text-balance reveal-text"
              >
                {paragraph.split(' ').map((word, wi) => (
                  <span key={wi} className="inline-block">{word} </span>
                ))}
              </p>
            ))}

            <blockquote
              ref={quoteRef}
              className="mt-4 md:mt-8 border-l-4 border-rose-400/60 pl-6 italic font-body text-lg md:text-xl text-charcoal-600 leading-relaxed"
            >
              "Você é uma pessoa muito especial para mim, e cada dia ao seu lado me faz perceber o quanto sou feliz por ter você."
            </blockquote>
          </div>
        </div>

        {/* Photo Column - jean2.jpeg (rocks/adventure) */}
        <div className="lg:col-span-6 lg:col-start-7 relative z-10">
          <div ref={photoRef} className="photo-frame aspect-[3/4] md:aspect-[4/5] relative" style={{ borderRadius: '0.75rem' }}>
            <Image
              src="/img/jean2.jpeg"
              alt="Passeio nas pedras - aventura e companheirismo"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1023px) 100vw, 50vw"
            />
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -bottom-6 -right-6 md:-bottom-8 md:-right-8 w-24 h-24 md:w-32 md:h-32 border border-rose-300/50 rounded-full opacity-50" aria-hidden="true" />
          <div className="absolute -top-4 -left-4 md:-top-6 md:-left-6 w-16 h-16 md:w-20 md:h-20 border border-rose-300/40 rounded-full opacity-40" aria-hidden="true" />
        </div>
      </div>

      {/* Section divider */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-24 md:h-32 bg-gradient-to-t from-cream-50 to-transparent pointer-events-none" aria-hidden="true" />
    </section>
  )
}