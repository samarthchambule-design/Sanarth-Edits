import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validate form
      if (!formData.name || !formData.email || !formData.message) {
        setError('Please fill in all required fields');
        setLoading(false);
        return;
      }

      // Send email using EmailJS
      const templateParams = {
        to_email: 'samarthchambule@gmail.com',
        from_name: formData.name,
        from_email: formData.email,
        project_type: formData.projectType || 'Not specified',
        message: formData.message
      };

      // Replace with your EmailJS service ID, template ID, and public key
      await emailjs.send(
        'service_j2esqlu',
        'template_qt28lkg',
        templateParams,
        'a98ibTJhQ2tmyMcdJ'
      );

      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        projectType: '',
        message: ''
      });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (err) {
      setError('Failed to send message. Please try again or contact directly.');
      console.error('EmailJS error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass rounded-2xl p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              className="w-full px-4 py-3 bg-navy-light border border-glass-border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-accent-blue transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className="w-full px-4 py-3 bg-navy-light border border-glass-border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-accent-blue transition-colors"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Project Type</label>
          <select
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-navy-light border border-glass-border rounded-xl text-white focus:outline-none focus:border-accent-blue transition-colors"
          >
            <option value="">Select project type</option>
            <option value="short-form">Short-Form Video (Reels/Shorts)</option>
            <option value="long-form">Long-Form Video (YouTube)</option>
            <option value="ads">Performance Ads</option>
            <option value="motion">Motion Graphics</option>
            <option value="other">Other</option>
          </select>
        </div>
                <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Project Details *</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            placeholder="Tell me about your project..."
            className="w-full px-4 py-3 bg-navy-light border border-glass-border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-accent-blue transition-colors resize-none"
            required
          ></textarea>
        </div>

        {error && (
          <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-300 text-sm">
            {error}
          </div>
        )}

        {submitted && (
          <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-xl text-green-300 text-sm">
            ✓ Message sent successfully! I'll get back to you soon.
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-gradient-to-r from-accent-blue to-accent-purple rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
