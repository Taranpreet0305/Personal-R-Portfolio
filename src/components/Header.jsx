import { useState, useEffect } from 'react';

const Header = () => {
    const [showNav, setShowNav] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPos = window.scrollY + 150;
            document.querySelectorAll('.nav-link').forEach(link => {
                const section = document.querySelector(link.getAttribute('href'));
                if (section && section.offsetTop <= scrollPos && section.offsetTop + section.offsetHeight > scrollPos) {
                    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            });
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className="header">
            <a href="#" className="logo">Taranpreet Singh</a>
            <i className="bx bx-menu" id="icon" onClick={() => setShowNav(!showNav)}></i>
            <nav className={`navbar ${showNav ? 'show-navbar' : ''}`}>
                <a href="#home" className="nav-link active">Home</a>
                <a href="#about" className="nav-link">About</a>
                <a href="#resume" className="nav-link">Resume</a>
                <a href="#portfolio" className="nav-link">Portfolio</a>
                <a href="#contact" className="nav-link">Contact</a>
            </nav>
        </header>
    );
};

export default Header;