import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ROUTES } from './config/consts';

import BalkanKlub from './pages/BalkanKlub/BalkanKlub';
import Blog from './pages/Blog/Blog';
import Brojevi from './pages/Brojevi/Brojevi';
import Home from './pages/home/Home';
import IgreUzivo from './pages/IgreUzivo/IgreUzivo';
import Promocije from './pages/Pomocije/Promocije';
import SlotIgre from './pages/SlotIgre/SlotIgre';
import VirtuelneIgre from './pages/VirtuelneIgre/VirtuelneIgre';
import Register from './pages/Register/Register';
import Navbar from './components/nav/Navbar';
import Topbar from './components/nav/Topbar';
import Sve from './pages/SportskoKladjenje/Sve';
import { SUBNAV_ROUTES } from './consts/subNavRoutes';


function App() {

  return (
    <div>

      <BrowserRouter>

        <Topbar />
        <Navbar />

        <Routes>

          <Route path={ROUTES.home} element={<Home />} />

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

          <Route path={ROUTES.virtuelneIgre} element={<VirtuelneIgre />} />
          <Route path={ROUTES.slotIgre} element={<SlotIgre />} />
          <Route path={ROUTES.igreUzivo} element={<IgreUzivo />} />
          <Route path={ROUTES.brojevi} element={<Brojevi />} />
          <Route path={ROUTES.promocije} element={<Promocije />} />
          <Route path={ROUTES.blog} element={<Blog />} />
          <Route path={ROUTES.balkanKlub} element={<BalkanKlub />} />
          <Route path={ROUTES.register} element={<Register />} />

        </Routes>

      </BrowserRouter>
    </div>
  )
}

export default App;
