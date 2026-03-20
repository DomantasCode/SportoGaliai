import React, { useState } from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

// --- Types ---

interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  message: string;
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

// --- Hooks ---

const useContactForm = () => {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const submitForm = async (data: ContactFormData) => {
    setStatus('submitting');
    setErrorMessage(null);

    try {
      const response = await fetch('/send-mail.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        setStatus('success');
      } else {
        throw new Error(result.message || 'Nepavyko išsiųsti žinutės.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Įvyko nenumatyta klaida.');
    }
  };

  const resetStatus = () => setStatus('idle');

  return { status, errorMessage, submitForm, resetStatus };
};

// --- Sub-components ---

const ContactInfo: React.FC = () => (
  <div className="lg:col-span-5 bg-white dark:bg-dark p-10 md:p-12 text-gray-900 dark:text-white relative overflow-hidden order-2 lg:order-1 flex flex-col justify-between border-r border-gray-200 dark:border-white/10">
    {/* Decor */}
    <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/30 rounded-full blur-[60px]" aria-hidden="true" />
    <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[80px] translate-y-1/3 translate-x-1/3" aria-hidden="true" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px]" aria-hidden="true" />

    <div className="relative z-10">
      <div className="flex items-center gap-3 mb-4">
        <span className="h-px w-12 bg-secondary" />
        <span className="text-primary font-bold tracking-widest uppercase text-xs">Kontaktai</span>
      </div>
      <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900 dark:text-white">Turite klausimų?</h2>
      <p className="text-gray-600 dark:text-gray-400 text-lg mb-10">
        Užpildykite formą ir mes su jumis susisieksime artimiausiu metu.
      </p>

      <div className="space-y-6">
        <ContactMethod
          icon={Phone}
          label="Telefonai"
        >
          <div className="flex flex-col gap-1">
            <a href="tel:+37061837395" className="text-xl font-medium text-gray-900 dark:text-white group-hover:text-primary transition-colors">+37061837395</a>
            <a href="tel:+37065787837" className="text-xl font-medium text-gray-900 dark:text-white group-hover:text-primary transition-colors">+37065787837</a>
          </div>
        </ContactMethod>

        <ContactMethod
          icon={Mail}
          label="Bendri klausimai"
          href="mailto:info@sportogalia.lt"
          content="info@sportogalia.lt"
        />

        <ContactMethod
          icon={Mail}
          label="Rinkodara ir partnerystės"
          href="mailto:mantas@sportogalia.lt"
          content="mantas@sportogalia.lt"
        />

        <ContactMethod
          icon={MapPin}
          label="Adresas"
          content="Vilnius, Lietuva"
        />
      </div>
    </div>

    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-white/10 relative z-10">
      <p className="text-gray-500 text-xs uppercase tracking-wider mb-3">Sekite mus</p>
      <div className="flex gap-4">
        <SocialLink href="https://www.facebook.com/p/Sporto-galia-100086300871342" icon={Facebook} />
        <SocialLink href="https://www.instagram.com/sportogalia/" icon={Instagram} />
        <SocialLink href="https://www.linkedin.com/company/sporto-galia" icon={Linkedin} />
      </div>
    </div>
  </div>
);

const ContactMethod: React.FC<{ icon: React.ElementType, label: string, href?: string, content?: string, children?: React.ReactNode }> = ({ icon: Icon, label, href, content, children }) => {
  const Wrapper = href ? 'a' : 'div';
  return (
    <Wrapper href={href} className={`flex items-center gap-5 group ${href ? 'cursor-pointer' : ''}`}>
      <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all flex-shrink-0">
        <Icon size={20} className="text-primary group-hover:text-white" />
      </div>
      <div>
        <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">{label}</p>
        {content && <p className="text-lg font-medium break-all text-gray-900 dark:text-white group-hover:text-primary transition-colors">{content}</p>}
        {children}
      </div>
    </Wrapper>
  );
};

const SocialLink: React.FC<{ href: string, icon: React.ElementType }> = ({ href, icon: Icon }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center hover:bg-primary hover:border-primary text-primary hover:text-white transition-all"
  >
    <Icon size={20} />
  </a>
);

const ContactForm: React.FC = () => {
  const { status, errorMessage, submitForm, resetStatus } = useContactForm();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    submitForm({
      name: formData.get('name') as string,
      phone: formData.get('phone') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
    });
  };

  if (status === 'success') {
    return (
      <div className="lg:col-span-7 p-10 md:p-12 order-1 lg:order-2 bg-white dark:bg-gray-100 h-full flex flex-col items-center justify-center text-center animate-fade-in">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-600">
          <CheckCircle size={40} />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-dark mb-2">Žinutė išsiųsta!</h3>
        <p className="text-gray-600 dark:text-gray-500 mb-8">Ačiū, kad kreipėtės. Susisieksime kaip įmanoma greičiau.</p>
        <button
          onClick={resetStatus}
          className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl font-medium transition-colors"
        >
          Siųsti kitą žinutę
        </button>
      </div>
    );
  }

  return (
    <div className="lg:col-span-7 p-10 md:p-12 order-1 lg:order-2 bg-white dark:bg-gray-100">
      <div className="flex items-center gap-3 mb-4">
        <span className="h-px w-12 bg-secondary" />
        <span className="text-primary font-bold tracking-widest uppercase text-xs">Parašykite mums</span>
      </div>

      <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-dark mb-2">Turite klausimų?</h3>
      <p className="text-gray-600 mb-8">Užpildykite formą ir mes susisieksime su jumis artimiausiu metu.</p>

      {status === 'error' && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700">
          <AlertCircle size={20} />
          <p>{errorMessage}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField id="name" label="Vardas" required placeholder="Jūsų vardas" />
          <FormField id="phone" label="Telefonas" type="text" required placeholder="+370 XXX XXXXX" />
        </div>

        <FormField id="email" label="El. paštas" type="email" required placeholder="jusu@email.lt" />

        <div>
          <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">
            Žinutė *
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
            placeholder="Jūsų žinutė..."
          />
        </div>

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary/90 hover:text-white transition-all shadow-lg shadow-primary/30 hover:shadow-primary/40 hover:shadow-xl active:scale-[0.99] flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {status === 'submitting' ? (
            <>Siučiama <Loader2 className="animate-spin" size={20} /></>
          ) : (
            <>Siųsti žinutę <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></>
          )}
        </button>
      </form>
    </div>
  );
};

const FormField: React.FC<{ id: string, label: string, type?: string, required?: boolean, placeholder?: string }> = ({ id, label, type = 'text', required, placeholder }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">
      {label} {required && '*'}
    </label>
    <input
      type={type}
      id={id}
      name={id}
      required={required}
      className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
      placeholder={placeholder}
    />
  </div>
);

// --- Main Component ---

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-12 md:pt-24 md:pb-12 bg-white dark:bg-dark relative transition-colors duration-300 overflow-hidden">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[150px] translate-x-1/3 -translate-y-1/2 opacity-30" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] -translate-x-1/3 translate-y-1/3 opacity-30" />
      </div>

      <div className="container mx-auto px-4 md:px-6 2xl:px-12 3xl:px-6">
        {/* Registration Section */}
        <div id="registration" className="bg-gray-50 dark:bg-neutralDark rounded-[3rem] shadow-xl overflow-hidden border border-gray-200 dark:border-white/10 mb-12">
          <div className="p-4 md:p-8 lg:p-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px bg-gray-300 dark:bg-white/20 flex-1" />
              <span className="text-gray-600 dark:text-gray-400 text-sm font-medium uppercase tracking-widest">Registracija</span>
              <div className="h-px bg-gray-300 dark:bg-white/20 flex-1" />
            </div>

            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">Registruokitės internetu</h3>

            <div className="w-full">
              <iframe
                src="https://embed.exoclass.com/lt/embed/provider/cc909582-9556-49fb-ae29-4ded9b2fee2e/group-management?color=3d1172"
                width="100%"
                height="1000"
                style={{ border: 'none' }}
                title="Registracijos forma"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="bg-gray-50 dark:bg-neutralDark rounded-[3rem] shadow-xl overflow-hidden border border-gray-200 dark:border-white/10 mb-12">
          <div className="p-8 md:p-12 lg:p-16 text-center relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-[80px]" aria-hidden="true" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-secondary/10 rounded-full blur-[80px]" aria-hidden="true" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <div className="flex items-center gap-3 mb-4 justify-center">
                <span className="h-px w-12 bg-secondary" />
                <span className="text-primary font-bold tracking-widest uppercase text-xs">Naujienlaiškis</span>
                <span className="h-px w-12 bg-secondary" />
              </div>

              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                Būkite pirmieji sužinoti „Sporto Galia" naujienas
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8 text-base md:text-lg leading-relaxed">
                Prenumeruokite naujienlaiškį ir gaukite informaciją apie treniruotes, renginius, bendruomenės naujienas bei kartais – specialias partnerių nuolaidas.
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const input = (e.currentTarget.elements.namedItem('newsletter_email') as HTMLInputElement);
                  const email = input.value;
                  if (email && window.omnisend) {
                    window.omnisend.push(['track', '$contactIdentified', { email: email }]);
                    input.value = '';
                    const btn = e.currentTarget.querySelector('button');
                    if (btn) {
                      btn.textContent = 'Prenumeruota!';
                      btn.classList.add('bg-green-600');
                      setTimeout(() => {
                        btn.textContent = 'Prenumeruoti';
                        btn.classList.remove('bg-green-600');
                      }, 3000);
                    }
                  }
                }}
                className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
              >
                <input
                  type="email"
                  name="newsletter_email"
                  required
                  placeholder="Jūsų el. paštas"
                  className="flex-1 px-5 py-4 rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-white/5 text-gray-900 dark:text-white placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
                <button
                  type="submit"
                  className="px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/30 hover:shadow-xl active:scale-[0.98] whitespace-nowrap"
                >
                  Prenumeruoti
                </button>
              </form>

              <p className="mt-4 text-xs text-gray-400">
                Jokio spam'o – tik naudinga informacija. Galėsite atsisakyti bet kada.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form & Info */}
        <div id="contact-form" className="bg-gray-50 dark:bg-neutralDark rounded-[3rem] shadow-xl overflow-hidden border border-gray-200 dark:border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <ContactInfo />
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;