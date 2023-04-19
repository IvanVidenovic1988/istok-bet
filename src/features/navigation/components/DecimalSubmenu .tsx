import React, { FC, useRef } from 'react'
import { useOnClickOutside } from '../../../shared/hooks/useOnClickOutside'

type Props = {
  setModalOpen: (isModalOpen: boolean) => void
}

const DecimalSubmenu: FC<Props> = ({ setModalOpen }) => {
  const ref = useRef<HTMLUListElement>(null)
  useOnClickOutside(ref, () => setModalOpen(false))

  return (
    <ul className="decimalni-submenu" ref={ref}>
      <li className="decimalni-submenu-li group">
        <p className="text-[#bbbbbb] group-hover:text-[#ebebeb] pr-4">Decimalni</p>
      </li>
      <li className="decimalni-submenu-li group">
        <p className="text-[#bbbbbb] group-hover:text-[#ebebeb] pr-4">Frakcioni</p>
      </li>
      <li className="decimalni-submenu-li group">
        <p className="text-[#bbbbbb] group-hover:text-[#ebebeb] pr-4">Americki</p>
      </li>
    </ul>
  )
}

export default DecimalSubmenu
