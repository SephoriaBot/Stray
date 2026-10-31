import { NavLink } from 'react-router-dom'
import { AlertIcon, BookIcon, HomeIcon, PinIcon } from './Icons'

const items = [
  { to: '/', label: 'Home', icon: <HomeIcon />, end: true, urgent: false },
  { to: '/guides', label: 'Guides', icon: <BookIcon />, end: false, urgent: false },
  { to: '/shelters', label: 'Shelters', icon: <PinIcon />, end: false, urgent: false },
  { to: '/emergency', label: 'Emergency', icon: <AlertIcon />, end: false, urgent: true },
]

export default function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="Main">
      <div className="bottom-nav-inner">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              [isActive ? 'active' : '', item.urgent ? 'urgent' : ''].join(' ').trim()
            }
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
