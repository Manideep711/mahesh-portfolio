import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import 'lenis/dist/lenis.css'

export default function useSmoothScroll(locked) {
  const instance = useRef(null)
  const isLocked = useRef(locked)
  isLocked.current = locked

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let removeScrollListener
    let tick
    function destroy() {
      if (tick) gsap.ticker.remove(tick)
      removeScrollListener?.()
      instance.current?.destroy()
      instance.current = null
    }
    function setup() {
      destroy()
      if (reducedMotion.matches) return
      const lenis = new Lenis({
        lerp: 0.12,
        smoothWheel: true,
        syncTouch: false,
        anchors: { offset: -(document.querySelector('header')?.offsetHeight || 76) },
        prevent: node => Boolean(node.closest?.('.contact-backdrop, .hand-control')),
      })
      instance.current = lenis
      removeScrollListener = lenis.on('scroll', ScrollTrigger.update)
      tick = time => lenis.raf(time * 1000)
      gsap.ticker.add(tick)
      gsap.ticker.lagSmoothing(0)
      if (isLocked.current) lenis.stop()
    }
    setup()
    reducedMotion.addEventListener('change', setup)
    return () => {
      reducedMotion.removeEventListener('change', setup)
      destroy()
    }
  }, [])

  useEffect(() => {
    if (locked) instance.current?.stop()
    else instance.current?.start()
  }, [locked])
}
