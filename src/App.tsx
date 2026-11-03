import { useCallback, useEffect, useRef, useState } from 'react'
import { content } from './content'
import { Confirmation } from './components/Confirmation'
import { Hero } from './components/Hero'
import { BeyondTheCharts, DetailStrip, FinalPush, Footer, Prizes, WhatToExpect, WhoItsFor } from './components/Sections'

type View = 'landing' | 'confirmation'

const REGISTERED_HASH = '#registered'
const NAME_KEY = 'fxtm_registered_name'

function readStoredName(): string {
  try {
    return sessionStorage.getItem(NAME_KEY) ?? ''
  } catch {
    return ''
  }
}

function storeName(name: string): void {
  try {
    sessionStorage.setItem(NAME_KEY, name)
  } catch {
    // Storage blocked. The in memory state is enough for this visit.
  }
}

function initialState(): { view: View; firstName: string } {
  const firstName = readStoredName()
  if (window.location.hash === REGISTERED_HASH) {
    if (firstName) return { view: 'confirmation', firstName }
    // Nobody registered in this session: drop the stale hash and show the landing page.
    history.replaceState(null, '', window.location.pathname + window.location.search)
  }
  return { view: 'landing', firstName }
}

export default function App() {
  const [state] = useState(initialState)
  const [view, setView] = useState<View>(state.view)
  const [firstName, setFirstName] = useState(state.firstName)
  const firstNameRef = useRef(firstName)
  firstNameRef.current = firstName

  const handleRegistered = useCallback((name: string) => {
    setFirstName(name)
    firstNameRef.current = name
    storeName(name)
    history.pushState(null, '', REGISTERED_HASH)
    setView('confirmation')
  }, [])

  // Back and forward buttons move between the two views.
  useEffect(() => {
    const onPopState = () => {
      setView(window.location.hash === REGISTERED_HASH && firstNameRef.current ? 'confirmation' : 'landing')
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  useEffect(() => {
    if (view === 'confirmation') {
      window.scrollTo(0, 0)
      document.title = content.meta.registeredTitle
    } else {
      document.title = content.meta.title
    }
  }, [view])

  if (view === 'confirmation') return <Confirmation firstName={firstName} />

  return (
    <>
      <main>
        <Hero onRegistered={handleRegistered} />
        <DetailStrip />
        <WhatToExpect />
        <BeyondTheCharts />
        <WhoItsFor />
        <Prizes />
        <FinalPush />
      </main>
      <Footer />
    </>
  )
}
