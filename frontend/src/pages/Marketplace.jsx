import React, { useState } from 'react';
import { Search, Filter, Grid, List, MapPin, Tag, Star, TrendingUp, Sparkles } from 'lucide-react';

const Marketplace = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Items', count: 248 },
    { id: 'cotton', label: 'Cotton', count: 89 },
    { id: 'polyester', label: 'Polyester', count: 64 },
    { id: 'wool', label: 'Wool', count: 42 },
    { id: 'silk', label: 'Silk', count: 28 },
    { id: 'mixed', label: 'Mixed', count: 25 },
  ];

  const listings = [
    {
      id: 1,
      title: 'Premium Cotton Fabric Scraps',
      category: 'Cotton',
      grade: 'A',
      quantity: '50 kg',
      price: '$125',
      location: 'New York, USA',
      seller: 'EcoFabrics Inc.',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1558769132-cb1aea8f5169?w=400',
      featured: true
    },
    {
      id: 2,
      title: 'Polyester Textile Waste',
      category: 'Polyester',
      grade: 'B',
      quantity: '100 kg',
      price: '$200',
      location: 'Los Angeles, USA',
      seller: 'GreenThread Co.',
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400'
    },
    {
      id: 3,
      title: 'Wool Fabric Remnants',
      category: 'Wool',
      grade: 'A',
      quantity: '30 kg',
      price: '$180',
      location: 'London, UK',
      seller: 'WoolCraft Ltd.',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1605408499391-6368c628ef42?w=400',
      featured: true
    },
    {
      id: 4,
      title: 'Silk Offcuts Collection',
      category: 'Silk',
      grade: 'A',
      quantity: '15 kg',
      price: '$250',
      location: 'Paris, France',
      seller: 'LuxeTextiles',
      rating: 5.0,
      image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=400'
    },
    {
      id: 5,
      title: 'Mixed Cotton Blends',
      category: 'Mixed',
      grade: 'B',
      quantity: '75 kg',
      price: '$150',
      location: 'Tokyo, Japan',
      seller: 'EcoTrade Japan',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1585911267611-af2be7c75166?w=400'
    },
    {
      id: 6,
      title: 'Denim Fabric Scraps',
      category: 'Cotton',
      grade: 'A',
      quantity: '60 kg',
      price: '$140',
      location: 'Berlin, Germany',
      seller: 'DenimCycle',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1582418702059-97ebafb35d09?w=400',
      featured: true
    }
  ];

  const filteredListings = listings.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           listing.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
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
            <h1 style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              background: 'var(--gradient-primary)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '0.75rem'
            }}>
              Textile Marketplace
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem' }}>
              Discover quality textile materials from verified sellers worldwide
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
              placeholder="Search textiles, materials, or sellers..."
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
                <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Filters</h3>
              </div>

              {/* Categories */}
              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: 'var(--text-secondary)',
                  textTransform: 'uppercase',
                  marginBottom: '1rem',
                  letterSpacing: '0.5px'
                }}>
                  Categories
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '0.75rem',
                        background: selectedCategory === category.id ? 'var(--primary)' : 'transparent',
                        color: selectedCategory === category.id ? 'white' : 'var(--text-primary)',
                        border: 'none',
                        borderRadius: '0.5rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        textAlign: 'left'
                      }}
                    >
                      <span style={{ fontWeight: '500' }}>{category.label}</span>
                      <span className="badge" style={{
                        background: selectedCategory === category.id ? 'rgba(255,255,255,0.2)' : 'var(--bg-secondary)',
                        color: selectedCategory === category.id ? 'white' : 'var(--text-primary)'
                      }}>
                        {category.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Grade Filter */}
              <div>
                <h4 style={{
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: 'var(--text-secondary)',
                  textTransform: 'uppercase',
                  marginBottom: '1rem',
                  letterSpacing: '0.5px'
                }}>
                  Quality Grade
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {['A', 'B', 'C'].map(grade => (
                    <label key={grade} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                      <input type="checkbox" style={{ accentColor: 'var(--primary)' }} />
                      <span>Grade {grade}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main>
            {/* Toolbar */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '2rem',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <p style={{ color: 'var(--text-secondary)' }}>
                Showing <strong>{filteredListings.length}</strong> listings
              </p>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`btn ${viewMode === 'grid' ? 'btn-primary' : 'btn-ghost'}`}
                  style={{ padding: '0.5rem' }}
                >
                  <Grid size={20} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`btn ${viewMode === 'list' ? 'btn-primary' : 'btn-ghost'}`}
                  style={{ padding: '0.5rem' }}
                >
                  <List size={20} />
                </button>
              </div>
            </div>

            {/* Listings Grid */}
            <div className="grid" style={{
              gridTemplateColumns: viewMode === 'grid' ? 'repeat(auto-fill, minmax(300px, 1fr))' : '1fr',
              gap: '1.5rem'
            }}>
              {filteredListings.map(listing => (
                <div key={listing.id} className="card animate-fadeIn" style={{
                  padding: 0,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  position: 'relative'
                }}>
                  {listing.featured && (
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
                    height: '200px',
                    background: `url(${listing.image}) center/cover`,
                    position: 'relative'
                  }}>
                    <div className="badge badge-primary" style={{
                      position: 'absolute',
                      bottom: '1rem',
                      left: '1rem'
                    }}>
                      Grade {listing.grade}
                    </div>
                  </div>

                  {/* Content */}
                  <div style={{ padding: '1.5rem' }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginBottom: '0.5rem'
                    }}>
                      <Tag size={14} color="var(--accent)" />
                      <span style={{
                        fontSize: '0.875rem',
                        color: 'var(--accent)',
                        fontWeight: '600'
                      }}>
                        {listing.category}
                      </span>
                    </div>

                    <h3 style={{
                      fontSize: '1.25rem',
                      marginBottom: '1rem',
                      color: 'var(--text-primary)'
                    }}>
                      {listing.title}
                    </h3>

                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '1rem',
                      paddingBottom: '1rem',
                      borderBottom: '1px solid var(--border)'
                    }}>
                      <div>
                        <p style={{
                          fontSize: '0.875rem',
                          color: 'var(--text-light)',
                          marginBottom: '0.25rem'
                        }}>
                          Quantity
                        </p>
                        <p style={{ fontWeight: '600', color: 'var(--text-primary)' }}>
                          {listing.quantity}
                        </p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <p style={{
                          fontSize: '0.875rem',
                          color: 'var(--text-light)',
                          marginBottom: '0.25rem'
                        }}>
                          Price
                        </p>
                        <p style={{
                          fontSize: '1.5rem',
                          fontWeight: '700',
                          background: 'var(--gradient-primary)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text'
                        }}>
                          {listing.price}
                        </p>
                      </div>
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginBottom: '0.5rem'
                      }}>
                        <Star size={14} color="var(--accent)" fill="var(--accent)" />
                        <span style={{ fontWeight: '600' }}>{listing.rating}</span>
                        <span style={{ color: 'var(--text-light)', fontSize: '0.875rem' }}>
                          • {listing.seller}
                        </span>
                      </div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: 'var(--text-secondary)',
                        fontSize: '0.875rem'
                      }}>
                        <MapPin size={14} />
                        {listing.location}
                      </div>
                    </div>

                    <button className="btn btn-primary" style={{ width: '100%' }}>
                      View Details
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

export default Marketplace;