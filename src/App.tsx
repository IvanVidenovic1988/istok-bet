import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ROUTES } from './shared/routes'

import Navbar from './features/navigation/components/Navbar'
import Topbar from './features/navigation/components/Topbar'
import Sve from './pages/SportskoKladjenje/Sve'
import Sidebar from './features/sidebar/components/Sidebar'
import { SUBNAV_ROUTES } from './features/navigation/routes'
import Events from './features/events/components/Events'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Topbar />
        <Navbar />
        <Sidebar />

        <Routes>
          <Route path={':sportSlug'} element={<Events />} />
          <Route path={':sportSlug/:categorySlug'} element={<Events />} />
          <Route path={':sportSlug/:categorySlug/:tournamentSlug'} element={<Events />} />

          <Route path={ROUTES.sportskoKladjenje}>
            <Route index element={<Navigate to={ROUTES.sve} />} />

            <Route path={ROUTES.sve} element={<Sve />} />

            {SUBNAV_ROUTES.map(({ label, link, Element }) => (
              <Route key={label} path={link} element={<Element />} />
            ))}
          </Route>

          <Route path={ROUTES.kladjenjeUzivo}>
            <Route index element={<Navigate to={ROUTES.pregled} />} />
            <Route path={ROUTES.pregled} element={<Sve />} />
            <Route path={ROUTES.pregledDesavanja} element={<Sve />} />
          </Route>

          <Route path={ROUTES.virtuelneIgre} element={<Sve />} />
          <Route path={ROUTES.slotIgre} element={<Sve />} />
          <Route path={ROUTES.igreUzivo} element={<Sve />} />
          <Route path={ROUTES.brojevi} element={<Sve />} />
          <Route path={ROUTES.promocije} element={<Sve />} />
          <Route path={ROUTES.blog} element={<Sve />} />
          <Route path={ROUTES.balkanKlub} element={<Sve />} />
          <Route path={ROUTES.register} element={<Sve />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
