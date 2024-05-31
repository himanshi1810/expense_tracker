import React from 'react'
import ContactDetails from "../Components/ContactPage/ContactDetails"
import ContactForm from "../Components/ContactPage/ContactForm"

function ContactUs() {
  return (
    <div>
      <div className="mx-auto mt-20 flex w-11/12 mb-8 max-w-maxContent flex-col justify-between gap-10 text-white lg:flex-row">
        {/* Contact Details */}
        <div className="lg:w-[40%]">
          <ContactDetails />
        </div>

        {/* Contact Form */}
        <div className="lg:w-[60%]">
          <ContactForm />
        </div>
      </div>
    </div>
  )
}

export default ContactUs