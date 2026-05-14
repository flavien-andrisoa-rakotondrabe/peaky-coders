"use client";
import { useEffect, useRef } from 'react'

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  size: number
}

function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const particleColorRef = useRef('130, 170, 255')

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    if (!context) return

    let animationFrame = 0
    const particles: Particle[] = []
    const particleCount = 75

    const syncParticleColor = () => {
    //   const color = getComputedStyle(document.documentElement).getPropertyValue('--particle-rgb').trim()
    const color = "red";
    if (color) {
        particleColorRef.current = color
      }
    }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const initParticles = () => {
      particles.length = 0
      for (let i = 0; i < particleCount; i += 1) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          size: Math.random() * 2 + 1,
        })
      }
    }

    const draw = () => {
      context.clearRect(0, 0, canvas.width, canvas.height)
      context.fillStyle = `rgba(${particleColorRef.current}, 0.5)`

      particles.forEach((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        context.beginPath()
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        context.fill()
      })

      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 120) {
            context.strokeStyle = `rgba(${particleColorRef.current}, ${(120 - distance) / 800})`
            context.lineWidth = 1
            context.beginPath()
            context.moveTo(particles[i].x, particles[i].y)
            context.lineTo(particles[j].x, particles[j].y)
            context.stroke()
          }
        }
      }

      animationFrame = requestAnimationFrame(draw)
    }

    resize()
    syncParticleColor()
    initParticles()
    draw()

    const observer = new MutationObserver(syncParticleColor)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(animationFrame)
      observer.disconnect()
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="z-0 inset-0 fixed" />
}

export default ParticleBackground
