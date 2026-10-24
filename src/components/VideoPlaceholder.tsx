'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

interface VideoPlaceholderProps {
  videoSrc?: string
  posterSrc?: string
}

export default function VideoPlaceholder({ videoSrc, posterSrc = '/img/jean8.jpeg' }: VideoPlaceholderProps) {
  const containerRef = useRef<HTMLElement>(null)
  const playerRef = useRef<HTMLDivElement>(null)
  const playButtonRef = useRef<HTMLButtonElement>(null)
  const [hasVideo, setHasVideo] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (videoSrc) {
      setHasVideo(true)
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(playerRef.current,
        { y: 40, opacity: 0, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: containerRef.current, start: 'top 75%', toggleActions: 'play none none reverse' } }
      )

      // Subtle float animation
      gsap.to(playerRef.current, {
        yPercent: 3,
        ease: 'none',
        scrollTrigger: { trigger: containerRef.current, start: 'top bottom', end: 'bottom top', scrub: 1 }
      })

      // Play button pulse when video exists
      if (hasVideo && playButtonRef.current) {
        gsap.to(playButtonRef.current, {
          scale: 1.08,
          boxShadow: '0 0 40px rgba(218, 115, 135, 0.4)',
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      }
    }, containerRef)

    return () => ctx.revert()
  }, [hasVideo, videoSrc])

  const handlePlay = () => {
    if (hasVideo) {
      setIsPlaying(true)
      // In real implementation: videoElement.play()
    }
  }

  return (
    <section
      ref={containerRef}
      className="section relative min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-20"
      aria-label="Vídeo dos momentos"
    >
      {/* Background atmosphere */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal-900/20 via-rose-900/10 to-charcoal-900/20" />
        <Image
          src="/img/jean8.jpeg"
          alt=""
          fill
          className="object-cover opacity-5"
          priority={false}
          sizes="100vw"
        />
      </div>

      {/* Video Player / Placeholder */}
      <div
        ref={playerRef}
        className="relative z-10 w-full max-w-4xl mx-auto"
      >
        <div
          className="relative aspect-video rounded-2xl overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.3)] bg-charcoal-900"
          style={{ borderRadius: '1.5rem' }}
        >
          {hasVideo && videoSrc ? (
            <>
              <video
                ref={(el) => {
                  if (el && isPlaying) el.play().catch(() => {})
                }}
                className="w-full h-full object-cover"
                poster={posterSrc}
                controls
                preload="metadata"
                playsInline
                aria-label="Vídeo dos nossos momentos"
              >
                <source src={videoSrc} type="video/mp4" />
                <source src={videoSrc.replace('.mp4', '.webm')} type="video/webm" />
                Seu navegador não suporta reprodução de vídeo.
              </video>
            </>
          ) : (
            // Sophisticated Placeholder
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 md:p-16 text-center">
              {/* Poster Image with Ken Burns effect */}
              <div className="absolute inset-0 -z-10 overflow-hidden" style={{ borderRadius: '1.5rem' }}>
                <Image
                  src={posterSrc}
                  alt="Casal à beira do lago - capa do vídeo"
                  fill
                  className="object-cover animate-[kenBurns_20s_ease-out_infinite]"
                  priority
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 via-charcoal-900/30 to-transparent" />
              </div>

              {/* Play Button - only shows when video will exist */}
              <div className="relative z-10 space-y-6 md:space-y-8">
                {/* Film strip decorative element */}
                <div className="flex items-center justify-center gap-2" aria-hidden="true">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-10 h-16 bg-white/10 backdrop-blur-sm rounded border border-white/20 flex items-center justify-center font-script text-2xl text-cream-300/60"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    >
                      {['🎬', '💑', '📸', '💕', '🌅'][i]}
                    </div>
                  ))}
                </div>

                <h3 className="font-display text-2xl md:text-3xl lg:text-4xl font-light text-cream-50 tracking-tight">
                  Vídeo dos nossos momentos
                </h3>

                <p className="font-body text-lg md:text-xl text-cream-300/70 max-w-md mx-auto leading-relaxed">
                  Um compilado especial está sendo preparado com carinho.<br />
                  Em breve, nossas memórias em movimento.
                </p>

                {/* Placeholder play button - disabled state */}
                <button
                  ref={playButtonRef}
                  disabled
                  className="relative inline-flex items-center justify-center gap-3 px-8 py-4 md:px-10 md:py-5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-cream-50 font-body text-base md:text-lg cursor-not-allowed hover:bg-white/10 transition-all duration-300"
                  aria-label="Vídeo ainda não disponível"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <polygon points="5,3 19,12 5,21" />
                  </svg>
                  <span>Aguardando vídeo final</span>
                  <div className="absolute inset-0 rounded-full bg-rose-400/20 animate-ping" aria-hidden="true" />
                </button>

                {/* Technical note for developer */}
                <div className="text-xs text-cream-400/40 font-mono px-4 py-2 bg-white/5 rounded-lg border border-white/10 max-w-xs mx-auto">
                  <p>Para adicionar o vídeo:</p>
                  <code className="block mt-1 text-cream-300/60">videoSrc="/video/nossos-momentos.mp4"</code>
                  <p className="mt-1">Formatos: MP4 (H.264) + WebM (VP9)</p>
                </div>
              </div>
            </div>
          )}

          {/* "Coming Soon" badge when no video */}
          {!hasVideo && (
            <div className="absolute top-6 right-6 z-20">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-rose-500/90 backdrop-blur-sm rounded-full text-cream-50 font-body text-sm font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
                </span>
                Em preparação
              </span>
            </div>
          )}
        </div>

        {/* Caption */}
        <div className="mt-6 md:mt-8 text-center">
          <p className="font-script text-xl md:text-2xl text-rose-600/80">
            "Feliz 10 meses para nós, meu amor!"
          </p>
        </div>
      </div>

      {/* Style for Ken Burns animation */}
      <style jsx global>{`
        @keyframes kenBurns {
          0% { transform: scale(1) translate(0, 0); }
          50% { transform: scale(1.15) translate(-2%, 2%); }
          100% { transform: scale(1) translate(0, 0); }
        }
        .animate-\[kenBurns_20s_ease-out_infinite\] {
          animation: kenBurns 20s ease-out infinite;
        }
      `}</style>
    </section>
  )
}