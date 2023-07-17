
const Contact = () => {
    return (
        <section className="py-10 lg:py-20">
            <div className="text-center py-10 lg:mb-14">
                <h2 className="font-semibold text-secondary">Contact</h2>
                <h1 className="text-3xl lg:text-4xl font-bold text-primary">Let us handle your <br className="hidden lg:block" />
                    project, professionally.</h1>
            </div>
            {/* ------ Form ------ */}
            <div className="lg:w-1/2 mx-auto px-5 space-y-5">
                <div className=" grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <input className="input" type="text" placeholder="First Name" />
                    <input className="input" type="text" placeholder="Last Name" />
                    <input className="input" type="email" placeholder="Email Address" />
                    <input className="input" type="text" placeholder="Phone Number" />

                </div>
                <div className="text-center">
                    <textarea className="textarea mb-5" name="" id="" rows="4" placeholder="Your Message" />
                    <button className="btn px-4">Send Message</button>
                </div>
            </div>
        </section>
    );
};

export default Contact;