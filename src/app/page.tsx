'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

const declaration = [
  `Meu amor, hoje completamos 10 meses juntos, e meu coração só sabe agradecer a Deus por ter colocado você na minha vida. Sou muito grato por cada momento ao seu lado, por cada sorriso, cada abraço, cada beijo e até pelos desafios que enfrentamos, porque tudo isso faz parte da nossa história e nos ensina a crescer juntos.`,
  `Nycole, obrigado por ser minha namorada, minha companheira, minha paz e uma das partes mais bonitas da minha vida. Obrigado por compartilhar seus dias comigo, por me permitir fazer parte da sua história e por construir comigo algo que vai muito além de palavras. Você é uma pessoa muito especial para mim, e cada dia ao seu lado me faz perceber o quanto sou feliz por ter você.`,
  `Sei que nem todos os dias são fáceis, que temos nossas diferenças e momentos difíceis, mas quero que você saiba que o meu desejo é continuar aprendendo, amadurecendo e me tornando alguém cada vez melhor por mim, por você e pelo nosso futuro. Quero que o nosso amor continue crescendo, que nunca nos falte carinho, respeito, companheirismo e vontade de escolher um ao outro, mesmo nos dias complicados.`,
  `Quando penso no futuro, é você que quero ao meu lado. Quero viver muitas outras comemorações com você, realizar nossos sonhos, construir nossa família e olhar para trás daqui a muitos anos, lembrando de tudo o que passamos e sentindo orgulho da história que construímos juntos.`,
  `Obrigado por esses 10 meses de amor, companheirismo e felicidade. Que esses sejam apenas os primeiros de muitos meses e anos que ainda viveremos juntos. Eu te amo pela mulher que você é, pelo bem que você me faz e por tudo o que ainda quero viver ao seu lado.`,
  `Feliz 10 meses para nós, meu amor!`,
  `Você é uma das minhas escolhas mais bonitas, e eu espero continuar escolhendo você todos os dias. Eu te amo, minha Nycole!`,
]

const galleryPhotos = [
  { src: '/img/jean4.jpeg', alt: 'Selfie divertida' },
  { src: '/img/jean5.jpeg', alt: 'Selfie noturna ao ar livre' },
  { src: '/img/jean6.jpeg', alt: 'Selfie em ambiente interno' },
  { src: '/img/jean7.jpeg', alt: 'Selfie com pelúcia' },
  { src: '/img/jean1.jpeg', alt: 'Selfie romântica noturna' },
]

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const ctxRef = useRef<gsap.Context | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    ctxRef.current = gsap.context(() => {
      // Kill any existing triggers
      ScrollTrigger.getAll().forEach(t => t.kill())

      // ==================== ACT I — HERO PARALLAX ====================
      const heroBg = document.querySelector('.hero-bg')
      const heroContent = document.querySelector('.hero-content')

      if (heroBg && heroContent) {
        gsap.to(heroBg, {
          yPercent: 20,
          ease: 'none',
          scrollTrigger: {
            trigger: '.act-i',
            start: 'top top',
            end: 'bottom top',
            scrub: 0.6,
          }
        })

        gsap.to(heroContent, {
          opacity: 0,
          y: -40,
          ease: 'none',
          scrollTrigger: {
            trigger: '.act-i',
            start: 'center top',
            end: 'bottom top',
            scrub: 0.6,
          }
        })
      }

      // ==================== UNIVERSAL: EVERY .anim-element ====================
      // Photos, text blocks, everything with this class
      const elements = document.querySelectorAll('.anim-element')
      
      elements.forEach((el) => {
        const isPhoto = el.classList.contains('anim-photo')
        const isText = el.classList.contains('anim-text')
        const isGallery = el.classList.contains('anim-gallery')
        const isLetter = el.classList.contains('anim-letter')

        // Different animations for different types
        if (isPhoto) {
          gsap.fromTo(el,
            { y: 80, opacity: 0, scale: 0.9 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 1.2,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 90%',
                end: 'bottom 20%',
                toggleActions: 'play reverse play reverse',
                markers: false,
              }
            }
          )
        } else if (isText) {
          gsap.fromTo(el,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.9,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 88%',
                end: 'bottom 25%',
                toggleActions: 'play reverse play reverse',
              }
            }
          )
        } else if (isGallery) {
          gsap.fromTo(el,
            { y: 100, opacity: 0, scale: 0.85 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 1.3,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 95%',
                end: 'bottom 15%',
                toggleActions: 'play reverse play reverse',
              }
            }
          )
        } else if (isLetter) {
          gsap.fromTo(el,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 92%',
                end: 'bottom 30%',
                toggleActions: 'play reverse play reverse',
              }
            }
          )
        }
      })

      // ==================== PHOTO PARALLAX — on container (frame + image together) ====================
      const photoContainers = document.querySelectorAll('.anim-photo')
      photoContainers.forEach((container) => {
        gsap.to(container, {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          }
        })
      })

      ScrollTrigger.refresh()
    }, 'main')

    return () => {
      ctxRef.current?.revert()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [mounted])

  if (!mounted) {
    return (
      <main className="relative overflow-x-hidden bg-stone-950 min-h-screen">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="font-script text-3xl md:text-4xl text-rose-400/90 mb-4">10 meses de nós</p>
            <h1 className="font-display text-5xl md:text-7xl font-light text-stone-50">Nossa história</h1>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="relative overflow-x-hidden bg-stone-950">
      {/* ==================== ACT I — ABERTURA ==================== */}
      <section className="act-i relative min-h-screen flex items-center justify-center px-4 md:px-6 lg:px-10 xl:px-16">
        <div className="hero-bg absolute inset-0 -z-10">
          <Image
            src="/img/jean8.jpeg"
            alt="Casal à beira do lago"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-stone-950/50" />
        </div>

        <div className="hero-content relative z-10 w-full max-w-5xl mx-auto text-center px-4">
          <p className="font-script text-3xl md:text-4xl lg:text-5xl text-rose-400/90 mb-4" aria-hidden="true">
            10 meses de nós
          </p>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-light tracking-tight text-stone-50 leading-[1.02] text-balance mb-5 md:mb-6">
            Nossa história
          </h1>
          <p className="font-body text-base md:text-lg lg:text-xl xl:text-2xl font-light text-stone-300 max-w-2xl mx-auto leading-relaxed text-balance">
            Escrita a dois, com amor, paciência e escolhas diárias.
          </p>
          <time className="font-body text-xs md:text-sm tracking-widest uppercase text-stone-400 mt-6 md:mt-8 block" dateTime="2026-01-22">
            22/01/2026
          </time>
        </div>

        {/* First photo - framed, anchored at bottom */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-64 md:h-80 lg:h-[38vh] pointer-events-none -z-10 px-4">
          <div className="anim-element anim-photo photo-frame aspect-[16/9] md:aspect-[21/9] h-full w-full">
            <Image
              src="/img/jean8.jpeg"
              alt="Casal à beira do lago — nossa história"
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
          </div>
        </div>
      </section>

      {/* ==================== ACT II — O INÍCIO ==================== */}
      <section className="act-ii relative min-h-screen flex items-center px-4 md:px-6 lg:px-10 xl:px-16 py-12 md:py-16" aria-labelledby="inicio-heading">
        <div className="w-full max-w-7xl mx-auto">
          <div className="space-y-6 md:space-y-8 lg:space-y-10">
            <div className="anim-element anim-text">
              <h2 id="inicio-heading" className="font-display text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-stone-50">
                O início
                <br />
                <span className="font-script text-2xl md:text-3xl lg:text-4xl font-normal block mt-2 text-rose-400/90">da nossa história</span>
              </h2>
            </div>
            
            <div className="anim-element anim-photo">
              <div className="photo-frame aspect-[4/5] md:aspect-[3/4] lg:aspect-[4/5]">
                <Image
                  src="/img/jean2.jpeg"
                  alt="Passeio nas pedras"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 50vw"
                />
              </div>
            </div>

            <div className="space-y-5 md:space-y-6">
              {declaration.slice(0, 2).map((paragraph, i) => (
                <p key={i} className="anim-element anim-text font-body text-base md:text-lg leading-relaxed text-stone-300 text-balance">
                  {paragraph}
                </p>
              ))}
              <blockquote className="anim-element anim-text border-l-4 border-rose-500/50 pl-5 md:pl-6 italic font-body text-base md:text-lg leading-relaxed text-stone-300">
                "Você é uma pessoa muito especial para mim, e cada dia ao seu lado me faz perceber o quanto sou feliz por ter você."
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== ACT III — RETRATO NYCOLE ==================== */}
      <section className="act-iii relative min-h-screen flex items-center px-4 md:px-6 lg:px-10 xl:px-16 py-12 md:py-16 bg-stone-900/40" aria-labelledby="nycole-heading">
        <div className="w-full max-w-7xl mx-auto">
          <div className="space-y-6 md:space-y-8 lg:space-y-10">
            <div className="anim-element anim-photo">
              <div className="photo-frame aspect-[9/16] md:aspect-[3/4] max-w-full mx-auto" style={{ borderRadius: '12px' }}>
                <Image
                  src="/img/jean3.jpeg"
                  alt="Retrato da Nycole"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 50vw"
                />
              </div>
            </div>

            <div className="space-y-6 md:space-y-8">
              <div className="anim-element anim-text">
                <h2 id="nycole-heading" className="font-display text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-stone-50">
                  Para a
                  <br />
                  <span className="font-script text-2xl md:text-3xl lg:text-4xl font-normal block mt-2 text-rose-400/90">Nycole</span>
                </h2>
              </div>

              <blockquote className="anim-element anim-text border-l-4 border-rose-500/50 pl-5 md:pl-6">
                <p className="font-script text-xl md:text-2xl lg:text-3xl leading-relaxed text-stone-200 text-balance">
                  "Você é uma pessoa muito especial para mim, e cada dia ao seu lado me faz perceber o quanto sou feliz por ter você."
                </p>
              </blockquote>

              <p className="anim-element anim-text font-body text-base md:text-lg leading-relaxed text-stone-300 text-balance">
                Este espaço é só seu. Um retrato que guarda a luz dos seus olhos, a delicadeza do seu sorriso e todo o carinho que cabe no meu peito. Obrigado por ser a mulher incrível que você é — minha namorada, minha companheira, minha paz.
              </p>

              <div className="anim-element anim-text flex items-end justify-between gap-4 pt-6 border-t border-stone-800">
                <div className="flex-1" />
                <div className="text-right">
                  <p className="font-script text-lg md:text-xl text-rose-400/90">com amor,</p>
                  <p className="font-script text-xl md:text-2xl text-stone-50">Jean</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== ACT IV — GALERIA ==================== */}
      <section className="act-iv relative min-h-screen flex items-center px-4 md:px-6 lg:px-10 xl:px-16 py-12 md:py-16" aria-labelledby="memorias-heading">
        <div className="w-full max-w-7xl mx-auto">
          <div className="anim-element anim-text text-center mb-8 md:mb-12 lg:mb-16">
            <h2 id="memorias-heading" className="font-display text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-stone-50">
              Memórias
              <br />
              <span className="font-script text-2xl md:text-3xl lg:text-4xl font-normal block mt-2 text-rose-400/90">guardadas</span>
            </h2>
          </div>

          {/* Mobile-first: single column, large photos. Tablet: 2 cols. Desktop: 3 cols */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
            {galleryPhotos.map((photo) => (
              <div key={photo.src} className="anim-element anim-gallery">
                <div className="photo-frame aspect-[3/4]">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== ACT V — A CARTA ==================== */}
      <section className="act-v relative min-h-screen flex items-center px-4 md:px-6 lg:px-10 xl:px-16 py-12 md:py-16 bg-stone-900/40" aria-labelledby="carta-heading">
        <div className="w-full max-w-3xl mx-auto">
          <div className="anim-element anim-text text-center mb-8 md:mb-10 lg:mb-12">
            <h2 id="carta-heading" className="font-display text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-stone-50">
              A carta
            </h2>
          </div>

          <div className="anim-element anim-letter relative bg-stone-900/80 backdrop-blur-sm rounded-2xl p-5 md:p-8 lg:p-10 xl:p-12 border border-stone-800/60 space-y-5 md:space-y-6">
            {declaration.map((paragraph, i) => (
              <div key={i} className="anim-letter">
                <p className={`leading-relaxed text-balance ${i === 5 ? 'font-script text-xl md:text-2xl lg:text-3xl text-rose-400 text-center my-3' : ''} ${i === 6 ? 'font-script text-base md:text-lg lg:text-xl text-rose-400/90 text-right pt-3 border-t border-stone-800/50' : 'font-body text-sm md:text-base lg:text-lg text-stone-200'}`}>
                  {paragraph}
                </p>
              </div>
            ))}

            <div className="flex items-end justify-between gap-4 pt-3">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-stone-700 to-transparent" />
              <div className="text-right">
                <p className="font-script text-lg md:text-xl text-rose-400/90">com todo meu amor,</p>
                <p className="font-script text-xl md:text-2xl text-stone-50">Jean</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== ACT VI — O FUTURO ==================== */}
      <section className="act-vi relative min-h-screen flex items-center px-4 md:px-6 lg:px-10 xl:px-16 py-12 md:py-16" aria-labelledby="futuro-heading">
        <div className="w-full max-w-7xl mx-auto">
          <div className="space-y-6 md:space-y-8 lg:space-y-10">
            <div className="anim-element anim-photo">
              <div className="photo-frame aspect-[3/4] md:aspect-[4/5] lg:aspect-[3/4] max-w-2xl mx-auto lg:max-w-full" style={{ borderRadius: '12px' }}>
                <Image
                  src="/img/jean8.jpeg"
                  alt="Casal à beira do lago"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 50vw"
                />
              </div>
            </div>

            <div className="space-y-6 md:space-y-8">
              <div className="anim-element anim-text">
                <h2 id="futuro-heading" className="font-display text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-stone-50">
                  O futuro
                  <br />
                  <span className="font-script text-2xl md:text-3xl lg:text-4xl font-normal block mt-2 text-rose-400/90">que sonhamos</span>
                </h2>
              </div>

              <div className="space-y-5 md:space-y-6">
                {declaration.slice(2, 6).map((paragraph, i) => (
                  <p key={i} className="anim-element anim-text font-body text-base md:text-lg leading-relaxed text-stone-300 text-balance">
                    {paragraph}
                  </p>
                ))}
              </div>

              
            </div>
          </div>
        </div>
      </section>

      {/* ==================== ACT VII — VÍDEO DOS NOSSOS MOMENTOS ==================== */}
      <section className="act-vii relative min-h-screen flex items-center px-4 md:px-6 lg:px-10 xl:px-16 py-12 md:py-16 bg-stone-900/40" aria-labelledby="video-heading">
        <div className="w-full max-w-4xl mx-auto text-center">
          <div className="anim-element anim-text mb-8 md:mb-10">
            <h2 id="video-heading" className="font-display text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-stone-50 mb-4">
              Vídeo dos<br />
              <span className="font-script text-2xl md:text-3xl lg:text-4xl font-normal block mt-2 text-rose-400/90">nossos momentos</span>
            </h2>
          </div>

          <div className="anim-element anim-photo">
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-stone-900 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)]">
              <video
                className="w-full h-full object-cover"
                controls
                preload="metadata"
                playsInline
                aria-label="Vídeo dos nossos momentos"
              >
                <source src="/img/video.mp4" type="video/mp4" />
                Seu navegador não suporta reprodução de vídeo.
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          <p className="anim-element anim-text font-script text-lg md:text-xl lg:text-2xl text-rose-400/80 mt-8 md:mt-10">
            "Feliz 10 meses para nós, meu amor!"
          </p>
        </div>
      </section>

      {/* ==================== ACT VIII — ENCERRAMENTO ==================== */}
      <section className="act-viii relative min-h-screen flex items-center px-4 md:px-6 lg:px-10 xl:px-16 py-12 md:py-16" aria-labelledby="fim-heading">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-stone-950 via-rose-950/10 to-stone-950" aria-hidden="true" />

        <div className="relative z-10 w-full max-w-3xl mx-auto text-center">
          <div className="anim-element anim-photo mb-6 md:mb-8">
            <div className="photo-frame final circular aspect-square max-w-xs md:max-w-sm lg:max-w-md mx-auto">
              <Image
                src="/img/jean1.jpeg"
                alt="Nossa selfie romântica"
                fill
                className="object-cover object-center"
                sizes="(max-width: 767px) 80vw, 400px"
              />
            </div>
          </div>

          <div className="anim-element anim-text mb-5 md:mb-6">
            <h2 id="fim-heading" className="font-display text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-stone-50 mb-4">
              <span className="font-script text-2xl md:text-3xl lg:text-4xl block text-rose-400/90 mb-2">Para sempre</span>
              nós
            </h2>
          </div>

          <p className="anim-element anim-text font-body text-base md:text-lg leading-relaxed text-stone-300 max-w-2xl mx-auto mb-8 md:mb-10 text-balance">
            Você é uma das minhas escolhas mais bonitas, e eu espero continuar escolhendo você todos os dias. Eu te amo, minha Nycole!
          </p>

          <div className="anim-element anim-text flex items-center justify-center gap-3 md:gap-4 mb-8 md:mb-10" aria-hidden="true">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-rose-500/30 to-transparent" />
            <div className="flex items-center gap-1.5">
              <span className="font-script text-xl text-rose-500/60">♡</span>
              <span className="font-script text-2xl text-rose-500">♡</span>
              <span className="font-script text-xl text-rose-500/60">♡</span>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-rose-500/30 via-transparent to-transparent" />
          </div>

          <p className="anim-element anim-text font-script text-xl md:text-2xl lg:text-3xl text-stone-50/90">
            Eu te amo, minha Nycole! ♡
          </p>

          <div className="anim-element anim-text mt-10 md:mt-12">
            <a
              href="#top"
              className="inline-flex items-center gap-2 px-4 py-2 bg-stone-900/80 hover:bg-stone-900 border border-stone-800/50 text-stone-400 font-body text-sm rounded-full transition-all duration-300"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 15l-6-6-6 6" />
              </svg>
              Voltar ao início
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}