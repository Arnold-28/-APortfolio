import { useState, useEffect } from 'react';

const Navbar = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onResize = () => open && setOpen(false);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [open]);

  return (
    <header className="navbar">
      <div className="nav-inner">
        <h2 className="brand">Arnold</h2>

        <button
          className={`nav-toggle ${open ? 'open' : ''}`}
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`nav-links ${open ? 'open' : ''}`} aria-label="Main navigation">
          <a href="#" onClick={() => setOpen(false)}>Home</a>
          <a href="#about" onClick={() => setOpen(false)}>About</a>
          <a href="#projects" onClick={() => setOpen(false)}>Projects</a>
          <a href="#contact" onClick={() => setOpen(false)}>Contact</a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
