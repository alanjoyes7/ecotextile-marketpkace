import React from 'react';
import {
  TrendingUp,
  DollarSign,
  Package,
  Eye,
  ArrowUp,
  ArrowDown,
  ShoppingBag,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  Sparkles
} from 'lucide-react';

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Listings',
      value: '24',
      change: '+12%',
      trend: 'up',
      icon: Package,
      color: 'var(--primary)',
      bgColor: 'rgba(15, 118, 110, 0.1)'
    },
    {
      title: 'Total Revenue',
      value: '$3,247',
      change: '+23%',
      trend: 'up',
      icon: DollarSign,
      color: 'var(--accent)',
      bgColor: 'rgba(245, 158, 11, 0.1)'
    },
    {
      title: 'Total Views',
      value: '1,842',
      change: '+8%',
      trend: 'up',
      icon: Eye,
      color: '#3b82f6',
      bgColor: 'rgba(59, 130, 246, 0.1)'
    },
    {
      title: 'Completed Sales',
      value: '18',
      change: '-5%',
      trend: 'down',
      icon: CheckCircle,
      color: '#10b981',
      bgColor: 'rgba(16, 185, 129, 0.1)'
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'sale',
      title: 'Cotton Fabric Scraps sold',
      buyer: 'EcoFabrics Inc.',
      amount: '$125',
      time: '2 hours ago',
      status: 'completed'
    },
    {
      id: 2,
      type: 'view',
      title: 'Polyester Textile Waste viewed',
      buyer: 'GreenThread Co.',
      time: '5 hours ago',
      status: 'pending'
    },
    {
      id: 3,
      type: 'sale',
      title: 'Wool Fabric Remnants sold',
      buyer: 'WoolCraft Ltd.',
      amount: '$180',
      time: '1 day ago',
      status: 'completed'
    },
    {
      id: 4,
      type: 'inquiry',
      title: 'Silk Offcuts Collection inquiry',
      buyer: 'LuxeTextiles',
      time: '2 days ago',
      status: 'pending'
    },
    {
      id: 5,
      type: 'sale',
      title: 'Mixed Cotton Blends sold',
      buyer: 'EcoTrade Japan',
      amount: '$150',
      time: '3 days ago',
      status: 'completed'
    }
  ];

  const topListings = [
    {
      id: 1,
      name: 'Premium Cotton Fabric',
      views: 342,
      inquiries: 18,
      status: 'active'
    },
    {
      id: 2,
      name: 'Wool Fabric Remnants',
      views: 287,
      inquiries: 15,
      status: 'active'
    },
    {
      id: 3,
      name: 'Silk Offcuts Collection',
      views: 234,
      inquiries: 12,
      status: 'sold'
    },
    {
      id: 4,
      name: 'Denim Fabric Scraps',
      views: 198,
      inquiries: 9,
      status: 'active'
    }
  ];

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', padding: '2rem' }}>
      <div className="container" style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <Sparkles size={32} color="var(--primary)" />
            <h1 style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: '2.5rem',
              background: 'var(--gradient-primary)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Dashboard
            </h1>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem' }}>
            Welcome back! Here's your trading overview
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid" style={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const TrendIcon = stat.trend === 'up' ? ArrowUp : ArrowDown;
            return (
              <div key={index} className="card animate-fadeIn" style={{
                padding: '1.75rem',
                animationDelay: `${index * 0.1}s`
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '1rem'
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    background: stat.bgColor,
                    borderRadius: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Icon size={24} color={stat.color} />
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '2rem',
                    background: stat.trend === 'up' ? '#d1fae5' : '#fee2e2',
                    color: stat.trend === 'up' ? '#065f46' : '#991b1b',
                    fontSize: '0.875rem',
                    fontWeight: '600'
                  }}>
                    <TrendIcon size={14} />
                    {stat.change}
                  </div>
                </div>
                <h3 style={{
                  fontSize: '2rem',
                  fontFamily: 'Playfair Display, serif',
                  color: stat.color,
                  marginBottom: '0.5rem'
                }}>
                  {stat.value}
                </h3>
                <p style={{
                  color: 'var(--text-secondary)',
                  fontSize: '0.875rem',
                  fontWeight: '500'
                }}>
                  {stat.title}
                </p>
              </div>
            );
          })}
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '2rem'
        }}>
          {/* Recent Activity */}
          <div className="card" style={{ padding: '2rem' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem'
            }}>
              <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Recent Activity</h2>
              <button className="btn btn-ghost" style={{ padding: '0.5rem 1rem' }}>
                View All
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {recentActivity.map(activity => (
                <div key={activity.id} style={{
                  padding: '1rem',
                  background: 'var(--bg)',
                  borderRadius: '0.75rem',
                  border: '1px solid var(--border)',
                  transition: 'all 0.2s'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '0.5rem'
                  }}>
                    <div style={{ flex: 1 }}>
                      <h4 style={{
                        fontSize: '1rem',
                        fontWeight: '600',
                        marginBottom: '0.25rem',
                        color: 'var(--text-primary)'
                      }}>
                        {activity.title}
                      </h4>
                      <p style={{
                        fontSize: '0.875rem',
                        color: 'var(--text-secondary)'
                      }}>
                        {activity.buyer}
                      </p>
                    </div>
                    {activity.amount && (
                      <span style={{
                        fontSize: '1.125rem',
                        fontWeight: '700',
                        color: 'var(--primary)'
                      }}>
                        {activity.amount}
                      </span>
                    )}
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.75rem',
                      color: 'var(--text-light)'
                    }}>
                      <Clock size={12} />
                      {activity.time}
                    </span>
                    <span className={`badge ${activity.status === 'completed' ? 'badge-success' : 'badge-warning'}`}>
                      {activity.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Listings */}
          <div className="card" style={{ padding: '2rem' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem'
            }}>
              <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Top Listings</h2>
              <button className="btn btn-ghost" style={{ padding: '0.5rem 1rem' }}>
                Manage
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {topListings.map((listing, index) => (
                <div key={listing.id} style={{
                  padding: '1.25rem',
                  background: index === 0 ? 'var(--gradient-primary)' : 'var(--bg)',
                  borderRadius: '0.75rem',
                  border: index === 0 ? 'none' : '1px solid var(--border)',
                  color: index === 0 ? 'white' : 'var(--text-primary)'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '0.75rem'
                  }}>
                    <h4 style={{
                      fontSize: '1rem',
                      fontWeight: '600',
                      margin: 0
                    }}>
                      {listing.name}
                    </h4>
                    <span className={listing.status === 'active' ? 'badge badge-success' : 'badge'} style={{
                      background: index === 0 ? 'rgba(255,255,255,0.2)' : undefined,
                      color: index === 0 ? 'white' : undefined
                    }}>
                      {listing.status}
                    </span>
                  </div>
                  <div style={{
                    display: 'flex',
                    gap: '2rem',
                    fontSize: '0.875rem',
                    opacity: index === 0 ? 0.9 : 1
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Eye size={14} />
                      <span>{listing.views} views</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Users size={14} />
                      <span>{listing.inquiries} inquiries</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
              <Package size={20} />
              Add New Listing
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{ marginTop: '2rem' }}>
          <h2 style={{
            fontSize: '1.5rem',
            marginBottom: '1.5rem',
            fontFamily: 'Playfair Display, serif'
          }}>
            Quick Actions
          </h2>
          <div className="grid" style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem'
          }}>
            <button className="card" style={{
              padding: '1.5rem',
              textAlign: 'center',
              cursor: 'pointer',
              border: '2px dashed var(--border)',
              background: 'transparent'
            }}>
              <Package size={32} color="var(--primary)" style={{ margin: '0 auto 0.75rem' }} />
              <p style={{ fontWeight: '600', color: 'var(--text-primary)' }}>Create Listing</p>
            </button>
            <button className="card" style={{
              padding: '1.5rem',
              textAlign: 'center',
              cursor: 'pointer',
              border: '2px dashed var(--border)',
              background: 'transparent'
            }}>
              <ShoppingBag size={32} color="var(--accent)" style={{ margin: '0 auto 0.75rem' }} />
              <p style={{ fontWeight: '600', color: 'var(--text-primary)' }}>Browse Market</p>
            </button>
            <button className="card" style={{
              padding: '1.5rem',
              textAlign: 'center',
              cursor: 'pointer',
              border: '2px dashed var(--border)',
              background: 'transparent'
            }}>
              <TrendingUp size={32} color="#10b981" style={{ margin: '0 auto 0.75rem' }} />
              <p style={{ fontWeight: '600', color: 'var(--text-primary)' }}>View Analytics</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;