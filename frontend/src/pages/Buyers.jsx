import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Building2, 
  MapPin, 
  Award, 
  TrendingUp,
  CheckCircle,
  Star,
  Recycle,
  Leaf,
  Factory,
  Sparkles,
  Shield,
  Zap
} from 'lucide-react';

const Buyers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All Buyers', count: 48 },
    { id: 'recycling', label: 'Recycling Facilities', count: 24 },
    { id: 'disposal', label: 'Proper Disposal', count: 12 },
    { id: 'upcycling', label: 'Upcycling Companies', count: 8 },
    { id: 'energy', label: 'Energy Recovery', count: 4 },
  ];

  const buyers = [
    {
      id: 1,
      name: 'EcoRecycle International',
      type: 'Recycling Facility',
      location: 'Rotterdam, Netherlands',
      specialty: 'Chemical Recycling & Fiber Recovery',
      rating: 4.9,
      verified: true,
      certification: 'ISO 14001, GRS Certified',
      capacity: '500 tons/month',
      acceptedMaterials: ['Cotton', 'Polyester', 'Mixed Blends'],
      disposalMethod: 'Chemical Recycling',
      environmentalScore: 95,
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400',
      featured: true,
      benefits: [
        'Zero landfill guarantee',
        'Carbon-negative process',
        'Transparent tracking'
      ]
    },
    {
      id: 2,
      name: 'GreenThread Disposal Solutions',
      type: 'Proper Disposal Facility',
      location: 'Hamburg, Germany',
      specialty: 'Thermal Treatment & Energy Recovery',
      rating: 4.8,
      verified: true,
      certification: 'EU Waste Framework Directive',
      capacity: '300 tons/month',
      acceptedMaterials: ['Non-recyclable textiles', 'Contaminated fabrics'],
      disposalMethod: 'Waste-to-Energy',
      environmentalScore: 88,
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400',
      benefits: [
        'Energy recovery from waste',
        'Emission-controlled burning',
        'Proper documentation'
      ]
    },
    {
      id: 3,
      name: 'CircularFiber Technologies',
      type: 'Recycling Facility',
      location: 'Copenhagen, Denmark',
      specialty: 'Mechanical & Chemical Recycling',
      rating: 5.0,
      verified: true,
      certification: 'Cradle to Cradle, Nordic Swan',
      capacity: '800 tons/month',
      acceptedMaterials: ['Cotton', 'Wool', 'Silk', 'Polyester'],
      disposalMethod: 'Closed-loop Recycling',
      environmentalScore: 98,
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400',
      featured: true,
      benefits: [
        'Circular economy model',
        'New fiber production',
        'CO2 reduction program'
      ]
    },
    {
      id: 4,
      name: 'RenewTextile Corp',
      type: 'Upcycling Company',
      location: 'Amsterdam, Netherlands',
      specialty: 'Creative Upcycling & Product Design',
      rating: 4.7,
      verified: true,
      certification: 'B-Corp Certified',
      capacity: '150 tons/month',
      acceptedMaterials: ['Denim', 'Cotton', 'Mixed fabrics'],
      disposalMethod: 'Upcycling & Repurposing',
      environmentalScore: 92,
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400',
      benefits: [
        'Create new products',
        'Zero waste approach',
        'Fair trade practices'
      ]
    },
    {
      id: 5,
      name: 'EnergyCycle Systems',
      type: 'Energy Recovery',
      location: 'Stockholm, Sweden',
      specialty: 'Advanced Thermal Treatment',
      rating: 4.6,
      verified: true,
      certification: 'EU Energy Recovery Standards',
      capacity: '400 tons/month',
      acceptedMaterials: ['Non-recyclable textiles', 'Industrial waste'],
      disposalMethod: 'Clean Energy Generation',
      environmentalScore: 85,
      image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400',
      benefits: [
        'Clean energy production',
        'Reduced emissions',
        'Legal compliance'
      ]
    },
    {
      id: 6,
      name: 'FiberTech Solutions',
      type: 'Recycling Facility',
      location: 'Oslo, Norway',
      specialty: 'Advanced Sorting & Processing',
      rating: 4.9,
      verified: true,
      certification: 'ISO 14001, GOTS',
      capacity: '600 tons/month',
      acceptedMaterials: ['All textile types'],
      disposalMethod: 'Multi-stream Recycling',
      environmentalScore: 96,
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400',
      featured: true,
      benefits: [
        'AI-powered sorting',
        'Maximum recovery rate',
        'Full traceability'
      ]
    }
  ];

  const filteredBuyers = buyers.filter(buyer => {
    const matchesSearch = buyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         buyer.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || 
                         buyer.type.toLowerCase().includes(selectedFilter.toLowerCase());
    return matchesSearch && matchesFilter;
  });

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      {/* Hero Header */}
      <section style={{
        background: 'linear-gradient(135deg, rgba(15, 118, 110, 0.05) 0%, rgba(245, 158, 11, 0.05) 100%)',
        padding: '3rem 2rem',
        borderBottom: '1px solid var(--border)'
      }}>
        <div className="container" style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{
              width: '64px',
              height: '64px',
              background: 'var(--gradient-primary)',
              borderRadius: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
              boxShadow: 'var(--shadow-lg)'
            }}>
              <Factory size={32} color="white" />
            </div>
            <h1 style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              background: 'var(--gradient-primary)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '0.75rem'
            }}>
              Verified Disposal Partners
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem', maxWidth: '700px', margin: '0 auto' }}>
              Connect with certified facilities that handle textile waste responsibly through recycling, proper disposal, or energy recovery
            </p>
          </div>

          {/* Search Bar */}
          <div style={{
            maxWidth: '700px',
            margin: '0 auto',
            position: 'relative'
          }}>
            <Search
              size={20}
              style={{
                position: 'absolute',
                left: '1.25rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-light)'
              }}
            />
            <input
              type="text"
              placeholder="Search disposal partners, specialties, or locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input"
              style={{
                paddingLeft: '3.5rem',
                fontSize: '1rem'
              }}
            />
          </div>
        </div>
      </section>

      {/* Info Banner */}
      <div style={{ 
        background: 'var(--gradient-primary)', 
        padding: '1.5rem 2rem',
        color: 'white'
      }}>
        <div className="container" style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '2rem',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Shield size={20} />
              <span style={{ fontSize: '0.875rem', fontWeight: '600' }}>All buyers are verified</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Leaf size={20} />
              <span style={{ fontSize: '0.875rem', fontWeight: '600' }}>Legal disposal methods only</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Recycle size={20} />
              <span style={{ fontSize: '0.875rem', fontWeight: '600' }}>Zero landfill commitment</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '2rem' }}>
          {/* Sidebar Filters */}
          <aside>
            <div className="card" style={{ position: 'sticky', top: '100px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '1.5rem'
              }}>
                <Filter size={20} color="var(--primary)" />
                <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Filter By Type</h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {filters.map(filter => (
                  <button
                    key={filter.id}
                    onClick={() => setSelectedFilter(filter.id)}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '0.75rem',
                      background: selectedFilter === filter.id ? 'var(--primary)' : 'transparent',
                      color: selectedFilter === filter.id ? 'white' : 'var(--text-primary)',
                      border: 'none',
                      borderRadius: '0.5rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      textAlign: 'left'
                    }}
                  >
                    <span style={{ fontWeight: '500' }}>{filter.label}</span>
                    <span className="badge" style={{
                      background: selectedFilter === filter.id ? 'rgba(255,255,255,0.2)' : 'var(--bg-secondary)',
                      color: selectedFilter === filter.id ? 'white' : 'var(--text-primary)'
                    }}>
                      {filter.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* Info Card */}
              <div style={{
                marginTop: '2rem',
                padding: '1.5rem',
                background: 'linear-gradient(135deg, rgba(15, 118, 110, 0.1) 0%, rgba(245, 158, 11, 0.1) 100%)',
                borderRadius: '0.75rem',
                border: '1px solid var(--border)'
              }}>
                <Leaf size={32} color="var(--primary)" style={{ marginBottom: '1rem' }} />
                <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Why Proper Disposal?</h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                  Illegal disposal harms the environment. Our verified partners use legal, sustainable methods.
                </p>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
              Showing <strong>{filteredBuyers.length}</strong> verified disposal partners
            </p>

            {/* Buyers Grid */}
            <div className="grid" style={{
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
              gap: '1.5rem'
            }}>
              {filteredBuyers.map(buyer => (
                <div key={buyer.id} className="card animate-fadeIn" style={{
                  padding: 0,
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                  {buyer.featured && (
                    <div style={{
                      position: 'absolute',
                      top: '1rem',
                      right: '1rem',
                      background: 'var(--gradient-accent)',
                      color: 'white',
                      padding: '0.375rem 0.75rem',
                      borderRadius: '2rem',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      zIndex: 1,
                      boxShadow: 'var(--shadow-md)'
                    }}>
                      <Sparkles size={12} />
                      Featured
                    </div>
                  )}

                  {/* Image */}
                  <div style={{
                    width: '100%',
                    height: '180px',
                    background: `url(${buyer.image}) center/cover`,
                    position: 'relative'
                  }}>
                    {buyer.verified && (
                      <div style={{
                        position: 'absolute',
                        bottom: '1rem',
                        left: '1rem',
                        background: '#10b981',
                        color: 'white',
                        padding: '0.375rem 0.75rem',
                        borderRadius: '2rem',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem'
                      }}>
                        <CheckCircle size={14} />
                        Verified
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div style={{ padding: '1.5rem' }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '1rem'
                    }}>
                      <div style={{ flex: 1 }}>
                        <h3 style={{
                          fontSize: '1.25rem',
                          marginBottom: '0.5rem',
                          color: 'var(--text-primary)'
                        }}>
                          {buyer.name}
                        </h3>
                        <span className="badge badge-primary" style={{ fontSize: '0.75rem' }}>
                          {buyer.type}
                        </span>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <Star size={16} color="var(--accent)" fill="var(--accent)" />
                          <span style={{ fontWeight: '700', fontSize: '1.125rem' }}>{buyer.rating}</span>
                        </div>
                      </div>
                    </div>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      color: 'var(--text-secondary)',
                      fontSize: '0.875rem',
                      marginBottom: '1rem'
                    }}>
                      <MapPin size={14} />
                      {buyer.location}
                    </div>

                    <div style={{
                      padding: '1rem',
                      background: 'var(--bg)',
                      borderRadius: '0.5rem',
                      marginBottom: '1rem'
                    }}>
                      <p style={{
                        fontSize: '0.875rem',
                        color: 'var(--text-secondary)',
                        marginBottom: '0.5rem'
                      }}>
                        <strong>Specialty:</strong> {buyer.specialty}
                      </p>
                      <p style={{
                        fontSize: '0.875rem',
                        color: 'var(--text-secondary)',
                        marginBottom: '0.5rem'
                      }}>
                        <strong>Method:</strong> {buyer.disposalMethod}
                      </p>
                      <p style={{
                        fontSize: '0.875rem',
                        color: 'var(--text-secondary)'
                      }}>
                        <strong>Capacity:</strong> {buyer.capacity}
                      </p>
                    </div>

                    {/* Environmental Score */}
                    <div style={{ marginBottom: '1rem' }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '0.5rem'
                      }}>
                        <span style={{ fontSize: '0.875rem', fontWeight: '600' }}>
                          Environmental Score
                        </span>
                        <span style={{
                          fontSize: '1.125rem',
                          fontWeight: '700',
                          color: buyer.environmentalScore >= 90 ? '#10b981' : '#f59e0b'
                        }}>
                          {buyer.environmentalScore}/100
                        </span>
                      </div>
                      <div style={{
                        width: '100%',
                        height: '6px',
                        background: 'var(--border)',
                        borderRadius: '3px',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          width: `${buyer.environmentalScore}%`,
                          height: '100%',
                          background: buyer.environmentalScore >= 90 
                            ? 'linear-gradient(90deg, #10b981, #34d399)' 
                            : 'linear-gradient(90deg, #f59e0b, #fbbf24)',
                          transition: 'width 0.5s ease'
                        }}></div>
                      </div>
                    </div>

                    {/* Benefits */}
                    <div style={{ marginBottom: '1rem' }}>
                      {buyer.benefits.map((benefit, idx) => (
                        <div key={idx} style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          fontSize: '0.875rem',
                          color: 'var(--text-secondary)',
                          marginBottom: '0.375rem'
                        }}>
                          <Zap size={14} color="var(--accent)" />
                          {benefit}
                        </div>
                      ))}
                    </div>

                    <button className="btn btn-primary" style={{ width: '100%' }}>
                      <Building2 size={18} />
                      Contact Partner
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Buyers;