import React, { useState } from 'react';
import {
  Package,
  Eye,
  Edit,
  Trash2,
  Clock,
  CheckCircle,
  XCircle,
  TrendingUp,
  MessageSquare,
  Plus,
  Filter,
  Calendar,
  DollarSign,
  MapPin,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';

const MyListings = () => {
  const [selectedTab, setSelectedTab] = useState('all');
  const [selectedListing, setSelectedListing] = useState(null);

  const tabs = [
    { id: 'all', label: 'All Listings', count: 24 },
    { id: 'active', label: 'Active', count: 18 },
    { id: 'pending', label: 'Pending', count: 4 },
    { id: 'sold', label: 'Sold', count: 2 },
  ];

  const listings = [
    {
      id: 1,
      title: 'Premium Cotton Fabric Scraps',
      category: 'Cotton',
      grade: 'A',
      quantity: '50 kg',
      price: '$125',
      status: 'active',
      views: 342,
      inquiries: 18,
      datePosted: '2024-01-05',
      location: 'New York, USA',
      image: 'https://images.unsplash.com/photo-1558769132-cb1aea8f5169?w=400',
      disposalType: 'Non-recyclable',
      description: 'High-quality cotton fabric scraps from manufacturing process. Suitable for proper disposal or upcycling.'
    },
    {
      id: 2,
      title: 'Industrial Polyester Waste',
      category: 'Polyester',
      grade: 'B',
      quantity: '200 kg',
      price: '$350',
      status: 'active',
      views: 287,
      inquiries: 15,
      datePosted: '2024-01-08',
      location: 'Los Angeles, USA',
      image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400',
      disposalType: 'Contaminated',
      description: 'Industrial polyester waste requiring specialized disposal. Cannot be recycled due to contamination.'
    },
    {
      id: 3,
      title: 'Mixed Textile Offcuts',
      category: 'Mixed',
      grade: 'C',
      quantity: '150 kg',
      price: '$200',
      status: 'pending',
      views: 156,
      inquiries: 8,
      datePosted: '2024-01-10',
      location: 'Chicago, USA',
      image: 'https://images.unsplash.com/photo-1585911267611-af2be7c75166?w=400',
      disposalType: 'Non-recyclable blend',
      description: 'Mixed textile materials that cannot be separated for recycling. Needs proper disposal facility.'
    },
    {
      id: 4,
      title: 'Wool Fabric Remnants',
      category: 'Wool',
      grade: 'A',
      quantity: '30 kg',
      price: '$180',
      status: 'sold',
      views: 412,
      inquiries: 24,
      datePosted: '2024-01-02',
      soldDate: '2024-01-09',
      location: 'Boston, USA',
      buyer: 'GreenThread Co.',
      image: 'https://images.unsplash.com/photo-1605408499391-6368c628ef42?w=400',
      disposalType: 'Non-reusable',
      description: 'Quality wool remnants that have reached end of life. Sold to certified disposal facility.'
    },
    {
      id: 5,
      title: 'Denim Production Waste',
      category: 'Cotton',
      grade: 'B',
      quantity: '180 kg',
      price: '$280',
      status: 'active',
      views: 298,
      inquiries: 12,
      datePosted: '2024-01-07',
      location: 'Dallas, USA',
      image: 'https://images.unsplash.com/photo-1582418702059-97ebafb35d09?w=400',
      disposalType: 'Manufacturing waste',
      description: 'Denim waste from manufacturing. Contains dyes and finishes requiring proper disposal.'
    },
    {
      id: 6,
      title: 'Synthetic Blend Scraps',
      category: 'Mixed',
      grade: 'B',
      quantity: '120 kg',
      price: '$220',
      status: 'pending',
      views: 189,
      inquiries: 7,
      datePosted: '2024-01-11',
      location: 'Seattle, USA',
      image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=400',
      disposalType: 'Complex blend',
      description: 'Complex synthetic blend that cannot be mechanically recycled. Awaiting verification.'
    }
  ];

  const filteredListings = listings.filter(listing => {
    if (selectedTab === 'all') return true;
    return listing.status === selectedTab;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return '#10b981';
      case 'pending': return '#f59e0b';
      case 'sold': return '#3b82f6';
      default: return 'var(--text-secondary)';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'active': return CheckCircle;
      case 'pending': return Clock;
      case 'sold': return Package;
      default: return XCircle;
    }
  };

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', padding: '2rem' }}>
      <div className="container" style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <h1 style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: '2.5rem',
              background: 'var(--gradient-primary)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '0.5rem'
            }}>
              My Listings
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem' }}>
              Manage your textile waste listings
            </p>
          </div>
          <Link to="/upload" className="btn btn-primary" style={{ fontSize: '1rem' }}>
            <Plus size={20} />
            Create New Listing
          </Link>
        </div>

        {/* Stats Overview */}
        <div className="grid" style={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          <div className="card" style={{ padding: '1.5rem', textAlign: 'center' }}>
            <Package size={32} color="var(--primary)" style={{ margin: '0 auto 0.75rem' }} />
            <h3 style={{ fontSize: '2rem', fontFamily: 'Playfair Display', color: 'var(--primary)' }}>
              24
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Total Listings</p>
          </div>
          <div className="card" style={{ padding: '1.5rem', textAlign: 'center' }}>
            <Eye size={32} color="var(--accent)" style={{ margin: '0 auto 0.75rem' }} />
            <h3 style={{ fontSize: '2rem', fontFamily: 'Playfair Display', color: 'var(--accent)' }}>
              1.8K
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Total Views</p>
          </div>
          <div className="card" style={{ padding: '1.5rem', textAlign: 'center' }}>
            <MessageSquare size={32} color="#3b82f6" style={{ margin: '0 auto 0.75rem' }} />
            <h3 style={{ fontSize: '2rem', fontFamily: 'Playfair Display', color: '#3b82f6' }}>
              84
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Inquiries</p>
          </div>
          <div className="card" style={{ padding: '1.5rem', textAlign: 'center' }}>
            <CheckCircle size={32} color="#10b981" style={{ margin: '0 auto 0.75rem' }} />
            <h3 style={{ fontSize: '2rem', fontFamily: 'Playfair Display', color: '#10b981' }}>
              2
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Sold</p>
          </div>
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          marginBottom: '2rem',
          borderBottom: '1px solid var(--border)',
          flexWrap: 'wrap'
        }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              style={{
                padding: '0.875rem 1.5rem',
                background: selectedTab === tab.id ? 'var(--primary)' : 'transparent',
                color: selectedTab === tab.id ? 'white' : 'var(--text-secondary)',
                border: 'none',
                borderBottom: selectedTab === tab.id ? '3px solid var(--primary)' : '3px solid transparent',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'all 0.2s',
                borderRadius: '0.5rem 0.5rem 0 0'
              }}
            >
              {tab.label}
              <span style={{
                marginLeft: '0.5rem',
                padding: '0.25rem 0.5rem',
                background: selectedTab === tab.id ? 'rgba(255,255,255,0.2)' : 'var(--bg-secondary)',
                borderRadius: '1rem',
                fontSize: '0.75rem'
              }}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Listings Grid */}
        <div className="grid" style={{
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '1.5rem'
        }}>
          {filteredListings.map(listing => {
            const StatusIcon = getStatusIcon(listing.status);
            return (
              <div key={listing.id} className="card animate-fadeIn" style={{
                padding: 0,
                overflow: 'hidden',
                position: 'relative'
              }}>
                {/* Status Badge */}
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: getStatusColor(listing.status),
                  color: 'white',
                  padding: '0.375rem 0.75rem',
                  borderRadius: '2rem',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  zIndex: 1,
                  textTransform: 'capitalize'
                }}>
                  <StatusIcon size={12} />
                  {listing.status}
                </div>

                {/* Grade Badge */}
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  left: '1rem',
                  background: 'var(--gradient-primary)',
                  color: 'white',
                  padding: '0.375rem 0.75rem',
                  borderRadius: '2rem',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  zIndex: 1
                }}>
                  Grade {listing.grade}
                </div>

                {/* Image */}
                <div style={{
                  width: '100%',
                  height: '180px',
                  background: `url(${listing.image}) center/cover`
                }}></div>

                {/* Content */}
                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{
                    fontSize: '1.25rem',
                    marginBottom: '0.5rem',
                    color: 'var(--text-primary)'
                  }}>
                    {listing.title}
                  </h3>

                  <div style={{ marginBottom: '1rem' }}>
                    <span className="badge badge-warning" style={{ fontSize: '0.75rem', marginRight: '0.5rem' }}>
                      {listing.category}
                    </span>
                    <span className="badge" style={{ fontSize: '0.75rem', background: '#fee2e2', color: '#991b1b' }}>
                      {listing.disposalType}
                    </span>
                  </div>

                  <p style={{
                    fontSize: '0.875rem',
                    color: 'var(--text-secondary)',
                    marginBottom: '1rem',
                    lineHeight: '1.5'
                  }}>
                    {listing.description}
                  </p>

                  {/* Stats Grid */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '1rem',
                    padding: '1rem',
                    background: 'var(--bg)',
                    borderRadius: '0.5rem',
                    marginBottom: '1rem'
                  }}>
                    <div>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-light)', marginBottom: '0.25rem' }}>
                        Quantity
                      </p>
                      <p style={{ fontWeight: '700', color: 'var(--text-primary)' }}>
                        {listing.quantity}
                      </p>
                    </div>
                    <div>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-light)', marginBottom: '0.25rem' }}>
                        Price
                      </p>
                      <p style={{
                        fontWeight: '700',
                        fontSize: '1.25rem',
                        background: 'var(--gradient-primary)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                      }}>
                        {listing.price}
                      </p>
                    </div>
                    <div>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-light)', marginBottom: '0.25rem' }}>
                        Views
                      </p>
                      <p style={{ fontWeight: '700', color: 'var(--text-primary)' }}>
                        {listing.views}
                      </p>
                    </div>
                    <div>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-light)', marginBottom: '0.25rem' }}>
                        Inquiries
                      </p>
                      <p style={{ fontWeight: '700', color: 'var(--text-primary)' }}>
                        {listing.inquiries}
                      </p>
                    </div>
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.875rem',
                    color: 'var(--text-secondary)',
                    marginBottom: '1rem'
                  }}>
                    <MapPin size={14} />
                    {listing.location}
                    <span>•</span>
                    <Calendar size={14} />
                    {new Date(listing.datePosted).toLocaleDateString()}
                  </div>

                  {listing.status === 'sold' && (
                    <div className="alert alert-success" style={{ marginBottom: '1rem', padding: '0.75rem' }}>
                      <CheckCircle size={16} />
                      <span style={{ fontSize: '0.875rem' }}>
                        Sold to {listing.buyer} on {new Date(listing.soldDate).toLocaleDateString()}
                      </span>
                    </div>
                  )}

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="btn btn-ghost" style={{ flex: 1, padding: '0.625rem' }}>
                      <Eye size={18} />
                      View
                    </button>
                    {listing.status !== 'sold' && (
                      <>
                        <button className="btn btn-secondary" style={{ flex: 1, padding: '0.625rem' }}>
                          <Edit size={18} />
                          Edit
                        </button>
                        <button className="btn" style={{
                          padding: '0.625rem',
                          background: '#fee2e2',
                          color: '#991b1b',
                          border: 'none'
                        }}>
                          <Trash2 size={18} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredListings.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem'
          }}>
            <Package size={64} color="var(--text-light)" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>No listings found</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              {selectedTab === 'all' 
                ? "You haven't created any listings yet" 
                : `No ${selectedTab} listings`}
            </p>
            <Link to="/upload" className="btn btn-primary">
              <Plus size={20} />
              Create Your First Listing
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyListings;