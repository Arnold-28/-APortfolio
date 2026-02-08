import { useState } from 'react';

export default function ThreeContact() {
  const [status, setStatus] = useState('');
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('Sending...');
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append('access_key', '0e5a479b-741b-4932-802d-4b772813f827');
    
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });
      
      const data = await response.json();
      
      if (data.success) {
        setStatus('Message sent successfully!');
        form.reset();
        setTimeout(() => setStatus(''), 3000);
      } else {
        setStatus('Failed to send. Please try again.');
        setTimeout(() => setStatus(''), 3000);
      }
    } catch (error) {
      setStatus('Failed to send. Please try again.');
      setTimeout(() => setStatus(''), 3000);
    }
  };

  return (
    <section id="contact" style={{ padding: '64px 20px', background: 'transparent', position: 'relative', minHeight: '70vh' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Get In Touch</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)' }}>
            Let's build something amazing together
          </p>
        </div>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input
            name="name"
            type="text"
            placeholder="Your Name"
            required
            style={{
              padding: '12px 16px',
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.05)',
              color: 'white',
              fontSize: '1rem'
            }}
          />
          <input
            name="email"
            type="email"
            placeholder="Your Email"
            required
            style={{
              padding: '12px 16px',
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.05)',
              color: 'white',
              fontSize: '1rem'
            }}
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows={5}
            required
            style={{
              padding: '12px 16px',
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.05)',
              color: 'white',
              fontSize: '1rem',
              resize: 'vertical'
            }}
          />
          <button
            type="submit"
            className="btn primary"
            style={{ alignSelf: 'flex-start', cursor: 'pointer', border: 'none', fontSize: '1rem' }}
          >
            Send Message
          </button>
          {status && (
            <p style={{ color: status.includes('success') ? '#34d399' : '#ff8a00', margin: 0 }}>
              {status}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
