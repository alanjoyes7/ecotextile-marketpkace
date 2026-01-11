import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Recycle, 
  ShoppingBag, 
  TrendingUp, 
  Users, 
  Leaf,
  Award,
  Globe,
  Heart,
  ArrowRight,
  CheckCircle,
  Sparkles
} from 'lucide-react';

const Home = () => {
  const stats = [
    { icon: Users, value: '10K+', label: 'Active Users', color: 'var(--primary)' },
    { icon: ShoppingBag, value: '50K+', label: 'Textiles Recycled', color: 'var(--accent)' },
    { icon: TrendingUp, value: '95%', label: 'Success Rate', color: '#10b981' },
    { icon: Globe, value: '25+', label: 'Countries', color: '#3b82f6' },
  ];

  const features = [
    {
      icon: Leaf,
      title: 'Eco-Friendly',
      description: 'Reduce textile waste and contribute to a sustainable future'
    },
    {
      icon: Award,
      title: 'Quality Verified',
      description: 'AI-powered classification ensures accurate textile grading'
    },
    {
      icon: Heart,
      title: 'Community Driven',
      description: 'Connect with buyers and sellers who care about the planet'
    },
    {
      icon: ShoppingBag,
      title: 'Easy Trading',
      description: 'Simple upload, quick matching, seamless transactions'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Upload Textiles',
      description: 'Take photos and upload your textile waste items'
    },
    {
      number: '02',
      title: 'AI Classification',
      description: 'Our AI analyzes and grades your textiles automatically'
    },
    {
      number: '03',
      title: 'Get Matched',
      description: 'Connect with verified buyers interested in your items'
    },
    {
      number: '04',
      title: 'Complete Trade',
      description: 'Finalize the transaction and reduce textile waste'
    }
  ];

  return (
    <div style={{ background: 'var(--bg)' }}>
      {/* Hero Section */}
      <section style={{
        position: 'relative',
        overflow: 'hidden',
        padding: '6rem 2rem',
        background: 'linear-gradient(135deg, rgba(15, 118, 110, 0.05) 0%, rgba(245, 158, 11, 0.05) 100%)'
      }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '4rem',
            alignItems: 'center'
          }}>
            {/* Left Content */}
            <div className="animate-slideInLeft">
              <div className="badge badge-primary" style={{ marginBottom: '1.5rem' }}>
                <Sparkles size={16} />
                Stop Illegal Textile Disposal
              </div>
              <h1 style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                lineHeight: '1.1',
                marginBottom: '1.5rem',
                background: 'var(--gradient-primary)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Turn Fabric Waste into Responsible Disposal
              </h1>
              <p style={{
                fontSize: '1.25rem',
                color: 'var(--text-secondary)',
                marginBottom: '2rem',
                lineHeight: '1.6'
              }}>
                Companies with non-recyclable textile waste no longer need illegal landfilling or burning. 
                We connect you with certified facilities that dispose of textiles responsibly and legally.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link to="/marketplace" className="btn btn-primary" style={{ fontSize: '1.125rem' }}>
                  <ShoppingBag size={20} />
                  Explore Marketplace
                  <ArrowRight size={20} />
                </Link>
                <Link to="/upload" className="btn btn-secondary" style={{ fontSize: '1.125rem' }}>
                  <Recycle size={20} />
                  Start Trading
                </Link>
              </div>
            </div>

            {/* Right Image/Graphic */}
            <div className="animate-slideInRight" style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{
                width: '100%',
                maxWidth: '500px',
                aspectRatio: '1',
                background: 'var(--gradient-primary)',
                borderRadius: '2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'var(--shadow-xl)',
                position: 'relative'
              }}>
                <Recycle size={120} color="white" strokeWidth={1.5} />
                
                {/* Floating Elements */}
                <div style={{
                  position: 'absolute',
                  top: '-20px',
                  right: '-20px',
                  background: 'white',
                  padding: '1.5rem',
                  borderRadius: '1rem',
                  boxShadow: 'var(--shadow-lg)'
                }}>
                  <Leaf size={32} color="var(--primary)" />
                </div>
                <div style={{
                  position: 'absolute',
                  bottom: '-20px',
                  left: '-20px',
                  background: 'white',
                  padding: '1.5rem',
                  borderRadius: '1rem',
                  boxShadow: 'var(--shadow-lg)'
                }}>
                  <Award size={32} color="var(--accent)" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Background Decorations */}
        <div style={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          width: '400px',
          height: '400px',
          background: 'var(--gradient-accent)',
          borderRadius: '50%',
          opacity: '0.05',
          filter: 'blur(100px)',
          zIndex: -1
        }}></div>
      </section>

      {/* Stats Section */}
      <section style={{ padding: '4rem 2rem', background: 'white' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="grid" style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem'
          }}>
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="card animate-fadeIn"
                  style={{
                    textAlign: 'center',
                    padding: '2rem',
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  <div style={{
                    width: '64px',
                    height: '64px',
                    background: `${stat.color}15`,
                    borderRadius: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1rem'
                  }}>
                    <Icon size={32} color={stat.color} />
                  </div>
                  <h3 style={{
                    fontSize: '2.5rem',
                    fontFamily: 'Playfair Display, serif',
                    color: stat.color,
                    marginBottom: '0.5rem'
                  }}>
                    {stat.value}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '6rem 2rem' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="section-title">
            <h2>Why Choose EcoTextile?</h2>
            <p className="section-subtitle">
              Experience the future of sustainable textile trading with cutting-edge technology
            </p>
          </div>

          <div className="grid" style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem'
          }}>
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="card animate-fadeIn"
                  style={{
                    padding: '2.5rem',
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  <div style={{
                    width: '56px',
                    height: '56px',
                    background: 'var(--gradient-primary)',
                    borderRadius: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.5rem'
                  }}>
                    <Icon size={28} color="white" />
                  </div>
                  <h3 style={{
                    fontSize: '1.5rem',
                    marginBottom: '1rem',
                    color: 'var(--text-primary)'
                  }}>
                    {feature.title}
                  </h3>
                  <p style={{
                    color: 'var(--text-secondary)',
                    lineHeight: '1.6'
                  }}>
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section style={{ padding: '6rem 2rem', background: 'white' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="section-title">
            <h2>How It Works</h2>
            <p className="section-subtitle">
              Get started in four simple steps
            </p>
          </div>

          <div className="grid" style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '3rem'
          }}>
            {steps.map((step, index) => (
              <div key={index} className="animate-fadeIn" style={{
                position: 'relative',
                animationDelay: `${index * 0.15}s`
              }}>
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div style={{
                    position: 'absolute',
                    top: '40px',
                    left: '100%',
                    width: '100%',
                    height: '2px',
                    background: 'linear-gradient(90deg, var(--primary), var(--accent))',
                    opacity: '0.2',
                    display: window.innerWidth < 768 ? 'none' : 'block'
                  }}></div>
                )}
                
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: 'var(--gradient-primary)',
                  borderRadius: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem',
                  boxShadow: 'var(--shadow-lg)',
                  position: 'relative',
                  zIndex: 1
                }}>
                  <span style={{
                    fontSize: '2rem',
                    fontFamily: 'Playfair Display, serif',
                    fontWeight: '700',
                    color: 'white'
                  }}>
                    {step.number}
                  </span>
                </div>
                <h3 style={{
                  fontSize: '1.5rem',
                  marginBottom: '1rem',
                  color: 'var(--text-primary)'
                }}>
                  {step.title}
                </h3>
                <p style={{
                  color: 'var(--text-secondary)',
                  lineHeight: '1.6'
                }}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '6rem 2rem',
        background: 'var(--gradient-primary)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container" style={{
          maxWidth: '800px',
          margin: '0 auto',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1
        }}>
          <Sparkles size={48} color="white" style={{ marginBottom: '1.5rem' }} />
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            color: 'white',
            marginBottom: '1.5rem',
            fontFamily: 'Playfair Display, serif'
          }}>
            Ready to Make an Impact?
          </h2>
          <p style={{
            fontSize: '1.25rem',
            color: 'rgba(255, 255, 255, 0.9)',
            marginBottom: '2.5rem',
            lineHeight: '1.6'
          }}>
            Join thousands of traders making a difference. Start your sustainable textile journey today.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              to="/register"
              className="btn"
              style={{
                background: 'white',
                color: 'var(--primary)',
                fontSize: '1.125rem',
                padding: '1rem 2.5rem'
              }}
            >
              <CheckCircle size={20} />
              Get Started Free
            </Link>
            <Link
              to="/marketplace"
              className="btn"
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                border: '2px solid white',
                fontSize: '1.125rem',
                padding: '1rem 2.5rem'
              }}
            >
              <ShoppingBag size={20} />
              Browse Marketplace
            </Link>
          </div>
        </div>

        {/* Background Pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: '0.1',
          backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          zIndex: 0
        }}></div>
      </section>
    </div>
  );
};

export default Home;