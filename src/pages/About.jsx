/**
 * About Page Component
 *
 * Showcases brand story, team, values, and statistics
 * with a luxurious dark-themed design.
 */

import { useState, useEffect, useRef } from 'react';
import { Shield, Sparkles, Heart, Globe, Award, Users, Package, Clock } from 'lucide-react';

/** Animated counter hook - counts up when element is visible */
const useCountUp = (end, duration = 2000) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let startTime = null;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [started, end, duration]);

  return { count, ref };
};

// Stats data
const stats = [
  { label: 'Happy Customers', value: 10000, display: '10K+', icon: Users },
  { label: 'Premium Products', value: 500, display: '500+', icon: Package },
  { label: 'Countries', value: 50, display: '50+', icon: Globe },
  { label: 'Years of Excellence', value: 15, display: '15+', icon: Clock },
];

// Team data
const team = [
  {
    name: 'Elena Vasquez',
    role: 'Founder & CEO',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face',
  },
  {
    name: 'Marcus Chen',
    role: 'Creative Director',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
  },
  {
    name: 'Sophie Laurent',
    role: 'Head of Design',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
  },
  {
    name: 'David Okafor',
    role: 'Operations Lead',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
  },
];

// Values data
const values = [
  {
    icon: Award,
    title: 'Quality',
    description: 'Every product is meticulously crafted with the finest materials and attention to detail.',
  },
  {
    icon: Sparkles,
    title: 'Innovation',
    description: 'We push the boundaries of design, blending tradition with cutting-edge craftsmanship.',
  },
  {
    icon: Heart,
    title: 'Sustainability',
    description: 'Committed to ethical sourcing and eco-conscious practices across our supply chain.',
  },
  {
    icon: Shield,
    title: 'Community',
    description: 'Building lasting relationships with artisans, partners, and customers worldwide.',
  },
];

const About = () => {
  // Animated counters for stats section
  const counter1 = useCountUp(10, 2000);
  const counter2 = useCountUp(500, 2000);
  const counter3 = useCountUp(50, 2000);
  const counter4 = useCountUp(15, 2000);
  const counters = [counter1, counter2, counter3, counter4];

  return (
    <main className="min-h-screen bg-gray-950">
      {/* ── Hero Banner ── */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1920&h=1080&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950/80 via-gray-950/60 to-gray-950" />
        <div className="relative text-center px-4 animate-fadeIn">
          <p className="text-amber-400 font-medium tracking-widest uppercase text-sm mb-4">
            Discover Our Journey
          </p>
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-amber-200 to-amber-400 bg-clip-text text-transparent">
            Our Story
          </h1>
        </div>
      </section>

      {/* ── Brand Story ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div className="animate-fadeIn">
            <p className="text-amber-400 font-medium tracking-widest uppercase text-sm mb-4">
              Since 2010
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Crafting Luxury, Defining Elegance
            </h2>
            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>
                LUXE was born from a passion for exquisite craftsmanship and timeless design.
                Founded in the heart of Milan, we set out to create a destination where luxury
                meets accessibility, offering carefully curated collections that speak to the
                modern connoisseur.
              </p>
              <p>
                Every piece in our collection tells a story — from the artisan's workshop to
                your wardrobe. We partner with master craftspeople around the world, ensuring
                each product meets our uncompromising standards of quality and design.
              </p>
              <p>
                Today, LUXE serves discerning customers across 50+ countries, united by a
                shared appreciation for the finer things in life. Our commitment to excellence
                remains at the core of everything we do.
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="relative animate-fadeIn">
            <div className="rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&h=600&fit=crop"
                alt="LUXE boutique interior"
                className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border-2 border-amber-500/30 rounded-2xl -z-10" />
          </div>
        </div>
      </section>

      {/* ── Stats Section ── */}
      <section className="py-16 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const counter = counters[index];
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  ref={counter.ref}
                  className="text-center group"
                >
                  <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-amber-500/10 flex items-center justify-center group-hover:bg-amber-500/20 transition-colors duration-300">
                    <Icon className="w-7 h-7 text-amber-400" />
                  </div>
                  <p className="text-3xl md:text-4xl font-bold text-white mb-1">
                    {counter.count}{stat.display.replace(/\d+/, '')}
                  </p>
                  <p className="text-sm text-gray-400">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Values Section ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-amber-400 font-medium tracking-widest uppercase text-sm mb-4">
            What We Believe
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Our Core Values</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div
                key={value.title}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/[0.07] hover:-translate-y-1 transition-all duration-300 group animate-fadeIn"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 flex items-center justify-center group-hover:from-amber-500/30 group-hover:to-amber-600/20 transition-all duration-300">
                  <Icon className="w-7 h-7 text-amber-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{value.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{value.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Team Section ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-amber-400 font-medium tracking-widest uppercase text-sm mb-4">
            The People Behind LUXE
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Meet Our Team</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div
              key={member.name}
              className="group text-center animate-fadeIn"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="relative mb-5 rounded-2xl overflow-hidden aspect-square">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <h3 className="text-lg font-semibold text-white">{member.name}</h3>
              <p className="text-sm text-amber-400">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default About;
