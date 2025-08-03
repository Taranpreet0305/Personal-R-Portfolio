const Contact = () => (
    <section className="contact" id="contact">
        <div className="contact-wrapper">
            <div className="contact-info">
                <h2>Let's Connect</h2>
                <p>Fill out the form and I'll get back to you within 24 hours. Looking
                    forward to hearing about your project and exploring how we can
                    collaborate.</p>
                <div className="info-group"><i className="bx bx-envelope"></i> <span>taranpreet.s0305@gmail.com</span></div>
                <div className="info-group"><i className="bx bx-map"></i> <span>New Delhi, India</span></div>
                <div className="info-group"><i className="bx bx-phone"></i> <span>+91 87003 20793</span></div>
            </div>
            <form action="https://formspree.io/f/xkgrddnd" method="POST" className="contact-form-modern">
                <h2>Send Me a Message</h2>
                <input type="text" name="name" placeholder="Your Name" required />
                <input type="email" name="_replyto" placeholder="Your Email" required />
                <textarea name="message" placeholder="Your Message" rows="6" required></textarea>
                <button type="submit"><i className="bx bx-send"></i> Send Message</button>
            </form>
        </div>
    </section>
);

export default Contact;