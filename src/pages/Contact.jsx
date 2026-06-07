/**
 * Contact Page Component
 *
 * Features a contact form with validation, contact info cards,
 * a styled map placeholder, and an FAQ accordion.
 */

import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, ChevronDown, Send, CheckCircle } from 'lucide-react';

// Contact info data
const contactInfo = [
  {
    icon: Phone,
    title: 'Phone',
    detail: '+1 (555) 123-4567',
    subDetail: 'Mon - Fri, 9am - 6pm EST',
  },
  {
    icon: Mail,
    title: 'Email',
    detail: 'hello@luxeshop.com',
    subDetail: 'We reply within 24 hours',
  },
  {
    icon: MapPin,
    title: 'Address',
    detail: '123 Fashion Avenue',
    subDetail: 'New York, NY 10001',
  },
  {
    icon: Clock,
    title: 'Hours',
    detail: 'Mon - Sat: 10am - 9pm',
    subDetail: 'Sunday: 11am - 7pm',
  },
];

// FAQ data
const faqs = [
  {
    question: 'What is your return policy?',
    answer:
      'We offer a 30-day hassle-free return policy on all items. Products must be in their original condition with tags attached. Contact our support team to initiate a return.',
  },
  {
    question: 'How long does shipping take?',
    answer:
      'Standard shipping takes 5-7 business days. Express shipping (2-3 days) is available for an additional fee. Free shipping is offered on orders over $100.',
  },
  {
    question: 'Are your products authentic?',
    answer:
      'Absolutely. Every product is sourced directly from verified artisans and manufacturers. Each item comes with a certificate of authenticity and quality guarantee.',
  },
  {
    question: 'Do you offer international shipping?',
    answer:
      'Yes! We ship to 50+ countries worldwide. International shipping typically takes 7-14 business days. Duties and taxes may apply depending on your location.',
  },
  {
    question: 'How can I track my order?',
    answer:
      'Once your order ships, you will receive an email with a tracking number and link. You can also track your order from your account dashboard on our website.',
  },
];

const Contact = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Validate form
  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    // Simulate submission
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  // Input field classes helper
  const inputClasses = (field) =>
    `w-full bg-white/5 border ${
      errors[field] ? 'border-red-500/50' : 'border-white/10 focus:border-amber-500/50'
    } rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none transition-colors duration-300`;

  return (
    <main className="min-h-screen bg-gray-950 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="text-center mb-16 animate-fadeIn">
          <p className="text-amber-400 font-medium tracking-widest uppercase text-sm mb-4">
            Get In Touch
          </p>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-amber-200 to-amber-400 bg-clip-text text-transparent">
            Contact Us
          </h1>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Have a question, feedback, or need assistance? We'd love to hear from you.
            Our team is here to help.
          </p>
        </div>

        {/* ── Contact Info Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <div
                key={info.title}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/[0.07] hover:-translate-y-1 transition-all duration-300 group animate-fadeIn"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-amber-500/10 flex items-center justify-center group-hover:bg-amber-500/20 transition-colors">
                  <Icon className="w-6 h-6 text-amber-400" />
                </div>
                <h3 className="text-white font-semibold mb-1">{info.title}</h3>
                <p className="text-gray-300 text-sm">{info.detail}</p>
                <p className="text-gray-500 text-xs mt-1">{info.subDetail}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* ── Contact Form ── */}
          <div className="animate-fadeIn">
            <h2 className="text-2xl font-bold text-white mb-6">Send Us a Message</h2>

            {submitted ? (
              <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-10 text-center animate-scaleIn">
                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-gray-400">
                  Thank you for reaching out. We'll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {/* Name */}
                <div>
                  <label htmlFor="contact-name" className="block text-sm text-gray-400 mb-2">
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className={inputClasses('name')}
                  />
                  {errors.name && (
                    <p className="text-red-400 text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="contact-email" className="block text-sm text-gray-400 mb-2">
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className={inputClasses('email')}
                  />
                  {errors.email && (
                    <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="contact-subject" className="block text-sm text-gray-400 mb-2">
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    className={inputClasses('subject')}
                  />
                  {errors.subject && (
                    <p className="text-red-400 text-xs mt-1">{errors.subject}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact-message" className="block text-sm text-gray-400 mb-2">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more..."
                    rows={5}
                    className={`${inputClasses('message')} resize-none`}
                  />
                  {errors.message && (
                    <p className="text-red-400 text-xs mt-1">{errors.message}</p>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold py-3.5 rounded-xl hover:from-amber-400 hover:to-amber-500 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/25 flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* ── Map Placeholder ── */}
          <div className="animate-fadeIn">
            <h2 className="text-2xl font-bold text-white mb-6">Find Us</h2>
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden h-[300px] lg:h-[400px] relative">
              {/* Styled map placeholder */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-amber-400 mx-auto mb-3 animate-bounce" />
                  <p className="text-white font-semibold">123 Fashion Avenue</p>
                  <p className="text-gray-400 text-sm">New York, NY 10001</p>
                </div>
              </div>
              {/* Grid pattern overlay */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(245, 158, 11, 0.3) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(245, 158, 11, 0.3) 1px, transparent 1px)
                  `,
                  backgroundSize: '40px 40px',
                }}
              />
            </div>
          </div>
        </div>

        {/* ── FAQ Section ── */}
        <section className="max-w-3xl mx-auto animate-fadeIn">
          <div className="text-center mb-10">
            <p className="text-amber-400 font-medium tracking-widest uppercase text-sm mb-4">
              Common Questions
            </p>
            <h2 className="text-3xl font-bold text-white">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-xl overflow-hidden transition-all duration-300 hover:bg-white/[0.07]"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between gap-4"
                  aria-expanded={openFaq === index}
                >
                  <span className="font-medium text-white">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-amber-400 shrink-0 transition-transform duration-300 ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaq === index ? 'max-h-48 pb-4' : 'max-h-0'
                  }`}
                >
                  <p className="px-6 text-gray-400 text-sm leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Contact;
