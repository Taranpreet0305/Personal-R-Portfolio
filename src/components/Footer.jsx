const Footer = () => (
    <footer className="footer">
        <div className="footer-container">
            <div className="footer-column about-author">
                <div className="footer-logo">
                    <span className="initial">TS</span>
                    <h2>Taranpreet Singh</h2>
                </div>
                <br></br><p>Full Stack Developer passionate about creating web solutions and building beautiful digital experiences.</p>
                <div className="tech-tags">
                    <span>HTML</span><span>CSS</span><span>JavaScript</span><span>PHP</span>
                </div>
                <div className="footer-icons">
                    <a href="https://github.com/Taranpreet0305"><i className="bx bxl-github"></i></a>
                    <a href="https://www.linkedin.com/in/taranpreet-singh-a44b8529a"><i className="bx bxl-linkedin"></i></a>
                    <a href="mailto:taranpreet.s0305@gmail.com"><i className="bx bx-envelope"></i></a>
                    <a href="https://www.instagram.com/taranpreet_s54"><i className="bx bxl-instagram"></i></a>
                    <a href="https://wa.me/918700320793"><i className="bx bxl-whatsapp"></i></a>
                </div>
            </div>
            <div className="footer-columns-row">
                <div className="footer-column quick-links">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="#about"><span> • </span>About</a></li>
                        <li><a href="#resume"><span> • </span>Skills</a></li>
                        <li><a href="#portfolio"><span> • </span>Projects</a></li>
                        <li><a href="#contact"><span> • </span>Contact</a></li>
                    </ul>
                </div>
            </div>
            <div className="footer-column get-in-touch">
                <h3>Get in Touch</h3>
                <p>Reach out for collaborations or just to say hello!</p>
                <p><i className="bx bx-envelope"></i> taranpreet.s0305@gmail.com</p>
                <p><i className="bx bx-map"></i> New Delhi, India</p>
                <p><i className="bx bx-globe"></i> taranpreet-singh.vercel.app/</p>
            </div>
        </div>
        <div className="footer-bottom">
            <h3>© 2025 Taranpreet Singh. All rights reserved.</h3>
        </div>
    </footer>
);

export default Footer;
