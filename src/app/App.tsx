import { AnimatePresence, motion } from 'motion/react'
import { useEffect } from 'react'
import { HashRouter, Navigate, Route, Routes, useLocation } from 'react-router'

import { Footer } from './components/Footer'
import { Nav } from './components/Nav'
import { Preloader } from './components/Preloader'
import { About } from './pages/About'
import { Home } from './pages/Home'
import { Work } from './pages/Work'

function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      if (pathname === '/') {
        const id = hash.slice(1)
        const findTarget = () => {
          const target = document.getElementById(id)
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' })
            return true
          }
          return false
        }
        if (!findTarget()) window.setTimeout(findTarget, 450)
        return
      }
      window.scrollTo({ top: 0 })
      return
    }
    if (pathname !== '/') window.scrollTo({ top: 0 })
  }, [pathname, hash])
  return null
}

function Pages() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <Routes location={location}>
          <Route index element={<Home />} />
          <Route path="work/:slug" element={<Work />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </motion.main>
    </AnimatePresence>
  )
}

export function App() {
  return (
    <HashRouter>
      <Preloader />
      <ScrollManager />
      <Nav />
      <Pages />
      <Footer />
    </HashRouter>
  )
}
