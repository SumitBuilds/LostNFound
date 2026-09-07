import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MousePointer2 } from 'lucide-react';
import ItemCard from '../components/ItemCard';
import { dummyItems } from '../utils/dummyData';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const dramaRef = useRef(null);
  const ctaRef = useRef(null);
  const featuresRef = useRef(null);
  const philosophyRef = useRef(null);
  
  // Shuffler State
  const [shufflerCards, setShufflerCards] = useState([
    { id: 1, title: 'Lost Item Intake', desc: 'Securely log missing items with precision metadata.' },
    { id: 2, title: 'Real-time Telemetry', desc: 'Track recovery status across the campus grid.' },
    { id: 3, title: 'Instant Notification', desc: 'Alerts triggered upon metadata matches.' }
  ]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Hero Animation
      gsap.fromTo([textRef.current, dramaRef.current, ctaRef.current], 
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out', delay: 0.2 }
      );

      // Philosophy Animation
      gsap.fromTo('.phil-text', 
        { y: 30, opacity: 0 },
        { 
          y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out',
          scrollTrigger: {
            trigger: philosophyRef.current,
            start: 'top 75%',
          }
        }
      );

      // Protocol Stacking Archive
      const cards = gsap.utils.toArray('.protocol-card');
      cards.forEach((card, i) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top top",
          pin: true,
          pinSpacing: false,
          end: "bottom top",
        });
        
        if (i > 0) {
          gsap.to(cards[i-1], {
            scale: 0.9,
            opacity: 0.5,
            filter: "blur(20px)",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "top top",
              scrub: true,
            }
          });
        }
      });
    });

    // Shuffler Logic
    const shufflerInterval = setInterval(() => {
      setShufflerCards(prev => {
        const newArr = [...prev];
        const last = newArr.pop();
        newArr.unshift(last);
        return newArr;
      });
    }, 3000);

    return () => {
      ctx.revert();
      clearInterval(shufflerInterval);
    };
  }, []);

  return (
    <div className="w-full bg-background overflow-x-hidden">
      {/* Hero Section */}
      <section ref={heroRef} className="relative w-full h-[100dvh] flex items-end justify-start pb-32 px-8 md:px-16 overflow-hidden">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/my_school.jpg" 
            alt="School Campus Background" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent"></div>
        </div>

        <div className="relative z-10 w-full max-w-4xl text-background">
          <h1 ref={textRef} className="text-4xl md:text-5xl lg:text-6xl font-bold font-sans tracking-tight mb-2">
            Recovery is the
          </h1>
          <div ref={dramaRef} className="text-7xl md:text-8xl lg:text-[10rem] font-drama leading-none mb-10 text-accent drop-shadow-lg">
            Connection.
          </div>
          <div ref={ctaRef} className="flex gap-4">
            <Link to="/items/new" className="btn-magnetic bg-accent text-background px-8 py-4 rounded-full font-bold text-lg inline-block">
              Report an Item
            </Link>
            <Link to="/items" className="btn-magnetic bg-background/10 backdrop-blur-md border border-background/20 text-background px-8 py-4 rounded-full font-bold text-lg inline-block hover:bg-background hover:text-primary transition-colors">
              Search Found Items
            </Link>
          </div>
        </div>
      </section>

      {/* Features - Interactive Functional Artifacts */}
      <section ref={featuresRef} className="py-32 px-8 md:px-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1 - Diagnostic Shuffler */}
          <div className="bg-background border border-primary/10 radius-sys p-8 shadow-lg relative h-80 overflow-hidden group">
            <h3 className="text-xl font-bold mb-2">Diagnostic Shuffler</h3>
            <p className="text-sm text-text-dark/70 mb-8">Report lost items quickly.</p>
            <div className="relative w-full h-40">
              {shufflerCards.map((card, idx) => (
                <div 
                  key={card.id}
                  className="absolute w-full bg-primary text-background radius-sys p-4 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                  style={{
                    top: `${idx * 15}px`,
                    scale: 1 - idx * 0.05,
                    opacity: 1 - idx * 0.2,
                    zIndex: 10 - idx
                  }}
                >
                  <h4 className="font-bold text-accent">{card.title}</h4>
                  <p className="text-xs mt-1 font-data">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Card 2 - Telemetry Typewriter */}
          <div className="bg-background border border-primary/10 radius-sys p-8 shadow-lg h-80 flex flex-col group">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Telemetry Typewriter</h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent animate-ping"></div>
                <span className="text-xs font-bold text-accent tracking-widest uppercase">Live Feed</span>
              </div>
            </div>
            <p className="text-sm text-text-dark/70 mb-4">Search found items easily.</p>
            <div className="bg-text-dark text-background p-4 radius-sys flex-grow font-data text-sm overflow-hidden relative">
              <div className="typing-effect">
                &gt; Analyzing campus sectors...<br/>
                &gt; Matching metadata tags...<br/>
                &gt; 3 found items matched.<br/>
                &gt; Awaiting connection<span className="animate-pulse">_</span>
              </div>
            </div>
          </div>

          {/* Card 3 - Cursor Protocol Scheduler */}
          <div className="bg-background border border-primary/10 radius-sys p-8 shadow-lg h-80 relative overflow-hidden group">
            <h3 className="text-xl font-bold mb-2">Protocol Scheduler</h3>
            <p className="text-sm text-text-dark/70 mb-8">Connect securely.</p>
            <div className="grid grid-cols-7 gap-1 text-center font-data text-xs mb-4">
              {['S','M','T','W','T','F','S'].map(d => <div key={d} className="opacity-50">{d}</div>)}
              {Array.from({length: 14}).map((_, i) => (
                <div key={i} className={`h-6 rounded flex items-center justify-center ${i === 10 ? 'bg-accent/20 text-accent font-bold cursor-target' : 'bg-primary/5'}`}>
                  {i + 1}
                </div>
              ))}
            </div>
            <div className="absolute top-1/2 left-1/4 animate-[cursor-move_4s_ease-in-out_infinite]">
              <MousePointer2 className="text-accent drop-shadow-md" size={24} fill="currentColor" />
            </div>
          </div>

        </div>
      </section>

      {/* Recent Items / Landing content (satisfying the syllabus) */}
      <section className="py-16 px-8 md:px-16 max-w-7xl mx-auto border-t border-primary/10">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold font-sans">Recent Activity</h2>
            <p className="text-text-dark/70 mt-2">The latest items reported across the network.</p>
          </div>
          <Link to="/items" className="text-accent font-bold hover:underline">View All →</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dummyItems.map(item => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* Philosophy - The Manifesto */}
      <section ref={philosophyRef} className="py-32 px-8 md:px-16 bg-primary text-background relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img src="/my_school.jpg" alt="Texture" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <p className="phil-text text-xl md:text-2xl font-sans mb-6 text-background/70">
            Most college boards focus on: <span className="line-through">disorganized noticeboards and messy chat groups.</span>
          </p>
          <p className="phil-text text-4xl md:text-6xl font-drama leading-tight">
            We focus on: <span className="text-accent">Precision</span> item tracking, <span className="text-accent">Secure</span> connections, and immediate <span className="text-accent">Recovery</span>.
          </p>
        </div>
      </section>

      {/* Protocol - Sticky Stacking Archive */}
      <section className="bg-background">
        {[
          { step: '01', title: 'Report Metadata', desc: 'Input precise parameters of the missing asset.' },
          { step: '02', title: 'Grid Scan', desc: 'The system cross-references all found entries.' },
          { step: '03', title: 'Secure Handshake', desc: 'Direct encrypted connection established for recovery.' },
        ].map((protocol, i) => (
          <div key={protocol.step} className="protocol-card h-screen w-full flex items-center justify-center bg-background border-t border-primary/10 relative p-8">
            <div className="max-w-2xl w-full flex flex-col md:flex-row items-center gap-12">
              <div className="text-8xl md:text-9xl font-data text-primary/10 font-bold">{protocol.step}</div>
              <div>
                <h2 className="text-4xl md:text-5xl font-bold font-sans mb-4">{protocol.title}</h2>
                <p className="text-xl text-text-dark/70 font-outfit">{protocol.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="bg-primary text-background py-16 px-8 md:px-16 radius-sys-lg rounded-b-none mt-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold font-sans mb-2">Lost & Found</h3>
            <p className="text-background/60 font-outfit max-w-sm">Campus item recovery for students, engineered for precision.</p>
          </div>
          <div className="flex flex-col md:items-end justify-between h-full gap-8">
            <div className="flex items-center gap-3 bg-text-dark/50 px-4 py-2 rounded-full border border-background/10">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="font-data text-xs uppercase tracking-widest text-background/80">System Operational</span>
            </div>
            <div className="flex gap-6 text-sm font-medium text-background/60">
              <Link to="/items" className="hover:text-accent transition-colors">Browse</Link>
              <Link to="/items/new" className="hover:text-accent transition-colors">Report</Link>
              <Link to="/login" className="hover:text-accent transition-colors">Log In</Link>
            </div>
          </div>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes cursor-move {
          0% { transform: translate(0, 0); }
          50% { transform: translate(120px, -60px) scale(0.9); color: var(--primary); }
          100% { transform: translate(0, 0); }
        }
      `}} />
    </div>
  );
}
