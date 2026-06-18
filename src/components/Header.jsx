export default function Header({ activeIdx, onScrollTo, navLabels }) {
  const handleClick = (e, idx) => {
    e.preventDefault()
    if (onScrollTo) onScrollTo(idx)
  }

  return (
    <header
      id="site-header"
      style={{
        position: 'fixed',
        top: '16px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 60,
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        padding: '10px 20px',
        borderRadius: '99px',
        background: 'rgba(8, 2, 4, 0.55)',
        backdropFilter: 'blur(28px) saturate(180%)',
        WebkitBackdropFilter: 'blur(28px) saturate(180%)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.08)',
        whiteSpace: 'nowrap',
      }}
    >
      {/* Brand */}
      <button
        id="header-brand"
        onClick={(e) => handleClick(e, 0)}
        style={{
          fontFamily: 'var(--font-wide)',
          fontSize: '13px',
          fontWeight: 800,
          letterSpacing: '0.05em',
          color: 'var(--color-red)',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          paddingRight: '16px',
          borderRight: '1px solid rgba(255,255,255,0.1)',
          marginRight: '12px',
        }}
      >
        RL.
      </button>

      {/* Navigation */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
        {navLabels && navLabels.map((label, idx) => (
          <button
            key={idx}
            onClick={(e) => handleClick(e, idx)}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '9px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: activeIdx === idx ? 'var(--color-red)' : 'rgba(245,235,232,0.65)',
              fontWeight: activeIdx === idx ? 700 : 400,
              background: activeIdx === idx ? 'rgba(255,80,5,0.12)' : 'transparent',
              border: 'none',
              borderRadius: '99px',
              padding: '5px 12px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              outline: 'none',
            }}
            onMouseEnter={e => {
              if (activeIdx !== idx) e.currentTarget.style.color = 'rgba(245,235,232,0.9)'
            }}
            onMouseLeave={e => {
              if (activeIdx !== idx) e.currentTarget.style.color = 'rgba(245,235,232,0.65)'
            }}
          >
            {label}
          </button>
        ))}
      </nav>
    </header>
  )
}
