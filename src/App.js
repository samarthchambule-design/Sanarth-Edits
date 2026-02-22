import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import AIAgent from './components/AIAgent';
import VideoCarousel from './components/VideoCarousel';
import ContactForm from './components/ContactForm';

// Initialize EmailJS
emailjs.init('YOUR_PUBLIC_KEY_HERE');

function App() {
  const [portfolioVisible, setPortfolioVisible] = useState(false);
  const portfolioRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPortfolioVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (portfolioRef.current) {
      observer.observe(portfolioRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-navy">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-40 glass-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <span className="text-xl font-bold gradient-text">Samarth Edits</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#home" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Home</a>
                <a href="#services" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Services</a>
                <a href="#portfolio" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Portfolio</a>
                <a href="#testimonials" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Testimonials</a>
                <a href="#contact" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Contact</a>
              </div>
            </div>
            <div className="md:hidden">
              <button className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div id="home" className="relative overflow-hidden pt-16">
        <div className="absolute top-20 left-1/4 w-80 h-80 bg-accent-blue/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-accent-purple/20 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center min-h-screen px-4 lg:px-20 gap-12">
          <div className="relative group order-2 lg:order-1">
            <div className="absolute inset-0 bg-gradient-to-r from-accent-blue via-accent-purple to-accent-blue rounded-full opacity-75 blur-xl animate-pulse"></div>
            <div className="relative animate-float">
              <div className="absolute -inset-3 bg-gradient-to-r from-accent-blue to-accent-purple rounded-3xl opacity-50 blur-md"></div>
              <div className="relative w-72 h-72 lg:w-96 lg:h-96 overflow-hidden rounded-3xl">
                <img 
                  src="/hero-image.jpeg" 
                  alt="Samarth - Professional Video Editor"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent"></div>
              </div>
              <div className="absolute -bottom-4 -right-4 glass px-4 py-2 rounded-xl animate-bounce" style={{ animationDuration: '3s' }}>
                <span className="text-sm font-medium">✂️ 4+ Years Exp.</span>
              </div>
            </div>
            <div className="absolute -left-8 top-1/4 w-4 h-4 bg-accent-blue rounded-full animate-ping"></div>
            <div className="absolute -right-4 bottom-1/3 w-3 h-3 bg-accent-purple rounded-full animate-pulse"></div>
            <div className="absolute -left-16 bottom-20 animate-float" style={{ animationDelay: '0.5s' }}>
              <div className="glass p-3 rounded-2xl hover:bg-white/10 transition-colors cursor-pointer group">
                <img src="/Assets/Adobe_Premiere_Pro_CC_icon.svg.png" alt="Premiere Pro" className="w-10 h-10 object-contain"/>
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Premiere Pro</span>
              </div>
            </div>
            <div className="absolute -right-12 top-20 animate-float" style={{ animationDelay: '1s' }}>
              <div className="glass p-3 rounded-2xl hover:bg-white/10 transition-colors cursor-pointer group">
                <img src="/Assets/Adobe_After_Effects_CC_icon.svg.png" alt="After Effects" className="w-10 h-10 object-contain"/>
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">After Effects</span>
              </div>
            </div>
            <div className="absolute left-8 -bottom-8 animate-float" style={{ animationDelay: '1.5s' }}>
              <div className="glass p-2 rounded-xl hover:bg-white/10 transition-colors cursor-pointer group">
                <img src="/Assets/Adobe_Photoshop_CC_icon.svg.png" alt="Photoshop" className="w-8 h-8 object-contain"/>
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Photoshop</span>
              </div>
            </div>
          </div>
          
          <div className="text-center lg:text-left order-1 lg:order-2 max-w-2xl">
            <div className="inline-block px-4 py-1 mb-4 glass rounded-full">
              <span className="text-sm text-accent-blue font-medium">🎬 Available for Projects</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold mb-6">
              <span className="gradient-text">Professional</span>
              <br />
              Video Editor
            </h1>
            <p className="text-xl lg:text-2xl text-gray-400 mb-8">
              Crafting stunning visual stories that captivate audiences and elevate brands. 
              Let me bring your vision to life with cinematic editing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a href="#portfolio" className="px-8 py-3 bg-gradient-to-r from-accent-blue to-accent-purple rounded-full font-semibold hover:opacity-90 transition-opacity inline-block text-center">
                View Portfolio
              </a>
              <a href="#contact" className="px-8 py-3 glass rounded-full font-semibold hover:bg-white/10 transition-colors inline-block text-center">
                Contact Me
              </a>
            </div>
            <div className="flex gap-8 mt-12 justify-center lg:justify-start">
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">500+</div>
                <div className="text-sm text-gray-500">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">50+</div>
                <div className="text-sm text-gray-500">Brands</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">100%</div>
                <div className="text-sm text-gray-500">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 lg:px-20 bg-navy-light/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 mb-4 glass rounded-full text-sm text-accent-purple font-medium">
              What I Do
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              <span className="gradient-text">Services</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Professional video editing services tailored to elevate your content and grow your audience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group relative overflow-hidden rounded-2xl glass p-8 hover:bg-white/10 transition-all duration-500 cursor-pointer">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent-blue/10 rounded-full blur-2xl group-hover:bg-accent-blue/20 transition-all duration-500"></div>
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4">Short-Form Video Editing</h3>
                <ul className="space-y-3 text-gray-400 mb-6">
                  <li className="flex items-center gap-2"><span className="text-accent-blue">▹</span> Instagram Reels</li>
                  <li className="flex items-center gap-2"><span className="text-accent-blue">▹</span> YouTube Shorts</li>
                  <li className="flex items-center gap-2"><span className="text-accent-blue">▹</span> TikTok</li>
                  <li className="flex items-center gap-2"><span className="text-accent-blue">▹</span> High-retention hooks</li>
                  <li className="flex items-center gap-2"><span className="text-accent-blue">▹</span> Trend-based editing</li>
                </ul>
                <div className="pt-4 border-t border-white/10">
                  <p className="text-sm text-accent-blue font-medium">✨ Optimized for maximum watch time & engagement.</p>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl glass p-8 hover:bg-white/10 transition-all duration-500 cursor-pointer">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent-purple/10 rounded-full blur-2xl group-hover:bg-accent-purple/20 transition-all duration-500"></div>
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-purple to-pink-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4">YouTube Long-Form Editing</h3>
                <ul className="space-y-3 text-gray-400 mb-6">
                  <li className="flex items-center gap-2"><span className="text-accent-purple">▹</span> Talking head videos</li>
                  <li className="flex items-center gap-2"><span className="text-accent-purple">▹</span> Podcast editing</li>
                  <li className="flex items-center gap-2"><span className="text-accent-purple">▹</span> Vlogs</li>
                  <li className="flex items-center gap-2"><span className="text-accent-purple">▹</span> Storytelling structure</li>
                  <li className="flex items-center gap-2"><span className="text-accent-purple">▹</span> Color grading + sound design</li>
                </ul>
                <div className="pt-4 border-t border-white/10">
                  <p className="text-sm text-accent-purple font-medium">✨ Designed to increase average view duration.</p>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl glass p-8 hover:bg-white/10 transition-all duration-500 cursor-pointer">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-2xl group-hover:bg-green-500/20 transition-all duration-500"></div>
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4">Performance Ad Editing</h3>
                <ul className="space-y-3 text-gray-400 mb-6">
                  <li className="flex items-center gap-2"><span className="text-green-400">▹</span> Facebook & Instagram Ads</li>
                  <li className="flex items-center gap-2"><span className="text-green-400">▹</span> UGC Ads</li>
                  <li className="flex items-center gap-2"><span className="text-green-400">▹</span> Dropshipping creatives</li>
                  <li className="flex items-center gap-2"><span className="text-green-400">▹</span> Product launch videos</li>
                </ul>
                <div className="pt-4 border-t border-white/10">
                  <p className="text-sm text-green-400 font-medium">✨ Built to convert, not just look good.</p>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl glass p-8 hover:bg-white/10 transition-all duration-500 cursor-pointer">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl group-hover:bg-orange-500/20 transition-all duration-500"></div>
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4">Motion Graphics & UI Animation</h3>
                <ul className="space-y-3 text-gray-400 mb-6">
                  <li className="flex items-center gap-2"><span className="text-orange-400">▹</span> Clean subtitles</li>
                  <li className="flex items-center gap-2"><span className="text-orange-400">▹</span> Animated captions</li>
                  <li className="flex items-center gap-2"><span className="text-orange-400">▹</span> Lower thirds</li>
                  <li className="flex items-center gap-2"><span className="text-orange-400">▹</span> Apple-style UI animations</li>
                  <li className="flex items-center gap-2"><span className="text-orange-400">▹</span> Transitions & effects</li>
                </ul>
                <div className="pt-4 border-t border-white/10">
                  <p className="text-sm text-orange-400 font-medium">✨ This makes you look premium.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <button className="px-8 py-3 bg-gradient-to-r from-accent-blue to-accent-purple rounded-full font-semibold hover:opacity-90 transition-opacity inline-flex items-center gap-2">
              Get a Quote
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Portfolio Section - Including Videos */}
      <section id="portfolio" ref={portfolioRef} className="py-20 px-4 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 transform ${portfolioVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="inline-block px-4 py-1 mb-4 glass rounded-full text-sm text-accent-blue font-medium">
              My Work
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              <span className="gradient-text">Portfolio</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Check out my latest video editing projects, reels, and showcases.
            </p>
          </div>

          {/* Video Carousel - Reels & Shorts */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-6 text-center">Reels & Shorts</h3>
            <VideoCarousel 
              videos={[
                { title: '', video: '/Assets/Short/1901_1.mp4' },
                { title: '', video: '/Assets/Short/02_1.mp4' },
                { title: '', video: '/Assets/Short/reel1.mp4' },
                { title: '', video: '/Assets/Short/reel2.mp4' },
                { title: '', video: '/Assets/Short/reel3.mp4' },
                { title: '', video: '/Assets/Short/32.mp4' },
                { title: '', video: '/Assets/Short/reel 26.mp4' },
                { title: '', video: '/Assets/Short/What do you do for work 2.mp4' }
              ]}
              aspectRatio="9/16"
              maxHeight="400px"
            />
          </div>

          {/* Video Carousel - Long Form */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-6 text-center">Long Form</h3>
            <VideoCarousel 
              videos={[
                { title: '', video: '/Assets/Long/Intro Raw_2.mp4' },
                { title: '', video: '/Assets/Long/Sample intro.mp4' },
                { title: '', video: '/Assets/Long/Golai Doc.mp4' }
              ]}
              aspectRatio="16/9"
              maxHeight="300px"
            />
          </div>

          <div className={`text-center mt-12 transition-all duration-1000 delay-500 transform ${portfolioVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <button className="px-8 py-3 glass rounded-full font-semibold hover:bg-white/10 transition-colors inline-flex items-center gap-2">
              View All Projects
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 lg:px-20 bg-navy-light/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 mb-4 glass rounded-full text-sm text-accent-purple font-medium">
              Testimonials
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              <span className="gradient-text">What Clients Say</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Don't just take my word for it - hear from some of my amazing clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: 'Sarah Johnson', role: 'Brand Owner', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face', text: 'Samarth transformed our raw footage into a captivating brand story. Our engagement increased by 300%!', company: 'Luxe Beauty Co.' },
              { name: 'Michael Chen', role: 'YouTuber', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face', text: 'Been working with Samarth for over a year. My watch time has doubled. Highly recommend!', company: 'Tech Reviews Pro' },
              { name: 'Emily Rodriguez', role: 'Marketing Director', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face', text: 'Our ad campaign went viral thanks to Samarth. Professional and delivered ahead of schedule!', company: 'Urban Fitness' }
            ].map((testimonial, index) => (
              <div key={index} className="group relative overflow-hidden rounded-2xl glass p-8 hover:bg-white/10 transition-all duration-500">
                <div className="absolute top-6 right-6 text-6xl text-accent-blue/10 font-serif">"</div>
                <div className="relative">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-300 mb-6 italic leading-relaxed">{testimonial.text}</p>
                  <div className="flex items-center gap-4">
                    <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover border-2 border-accent-purple"/>
                    <div>
                      <h4 className="font-semibold text-white">{testimonial.name}</h4>
                      <p className="text-sm text-gray-400">{testimonial.role} at {testimonial.company}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '100%', label: 'Satisfaction Rate' },
              { number: '50+', label: 'Happy Clients' },
              { number: '500+', label: 'Projects Completed' },
              { number: '4+', label: 'Years Experience' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold gradient-text mb-2">{stat.number}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 mb-4 glass rounded-full text-sm text-accent-blue font-medium">
              Get In Touch
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              <span className="gradient-text">Let's Work Together</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Have a project in mind? Let's discuss how I can bring your vision to life.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ContactForm />

            <div className="space-y-8">
              <div className="glass rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-accent-blue to-accent-purple flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Email</p>
                      <p className="text-white font-medium">samarthchambule@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-accent-blue to-accent-purple flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Phone</p>
                      <p className="text-white font-medium">+91 7028471911</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-accent-blue to-accent-purple flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Location</p>
                      <p className="text-white font-medium">India (Remote Worldwide)</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-6">Follow Me</h3>
                <div className="flex gap-4">
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl glass flex items-center justify-center hover:bg-white/20 transition-colors">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl glass flex items-center justify-center hover:bg-white/20 transition-colors">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl glass flex items-center justify-center hover:bg-white/20 transition-colors">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

{/* Footer */}
      <footer className="py-8 px-4 glass-dark">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold gradient-text">Samarth Edits</span>
              <span className="text-gray-500">|</span>
              <span className="text-gray-400 text-sm">Professional Video Editor</span>
            </div>
            <div className="flex items-center gap-6">
              <a href="#home" className="text-gray-400 hover:text-white text-sm transition-colors">Home</a>
              <a href="#services" className="text-gray-400 hover:text-white text-sm transition-colors">Services</a>
              <a href="#portfolio" className="text-gray-400 hover:text-white text-sm transition-colors">Portfolio</a>
              <a href="#testimonials" className="text-gray-400 hover:text-white text-sm transition-colors">Testimonials</a>
              <a href="#contact" className="text-gray-400 hover:text-white text-sm transition-colors">Contact</a>
            </div>
            <p className="text-gray-500 text-sm">© 2024 Samarth. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <AIAgent />
    </div>
  );
}

export default App;
