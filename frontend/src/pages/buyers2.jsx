import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  TrendingUp, 
  Award, 
  Recycle,
  Factory,
  Leaf,
  Mail,
  Phone,
  Search,
  Filter
} from 'lucide-react';

const Buyers = () => {
  const [buyers, setBuyers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');

  // Mock data - Replace with API call
  useEffect(() => {
    const mockBuyers = [
      {
        id: 1,
        name: 'GreenCycle Industries',
        type: 'Recycling Plant',
        specialization: ['Cotton', 'Natural Fibers'],
        location: 'California, USA',
        capacity: '500 tons/month',
        rating: 4.8,
        description: 'Leading textile recycling facility specializing in natural fibers and cotton waste processing.',
        email: 'contact@greencycle.com',
        phone: '+1 555-0123',
        certifications: ['ISO 14001', 'Zero Waste'],
        acceptedTypes: ['Recyclable', 'Reusable']
      },
      {
        id: 2,
        name: 'EcoDecompose Solutions',
        type: 'Decomposition Facility',
        specialization: ['Non-Recyclable Textiles', 'Synthetic Materials'],
        location: 'Texas, USA',
        capacity: '300 tons/month',
        rating: 4.6,
        description: 'Eco-friendly decomposition facility for non-recyclable textiles using advanced biodegradation technology.',
        email: 'info@ecodecompose.com',
        phone: '+1 555-0456',
        certifications: ['EPA Certified', 'Green Business'],
        acceptedTypes: ['Non-Recyclable']
      },
      {
        id: 3,
        name: 'SecondLife Fabrics',
        type: 'Upcycling Center',
        specialization: ['Reusable Materials', 'Premium Fabrics'],
        location: 'New York, USA',
        capacity: '200 tons/month',
        rating: 4.9,
        description: 'Premium upcycling facility transforming high-quality textile waste into new products.',
        email: 'hello@secondlifefabrics.com',
        phone: '+1 555-0789',
        certifications: ['B-Corp', 'Cradle to Cradle'],
        acceptedTypes: ['Reusable']
      },
      {
        id: 4,
        name: 'FiberTech Recycling',
        type: 'Recycling Plant',
        specialization: ['Polyester', 'Synthetic Blends'],
        location: 'Illinois, USA',
        capacity: '450 tons/month',
        rating: 4.7,
        description: 'Advanced recycling technology for synthetic fibers and polyester-based textiles.',
        email: 'sales@fibertech.com',
        phone: '+1 555-0321',
        certifications: ['ISO 9001', 'LEED Certified'],
        acceptedTypes: ['Recyclable']
      },
      {
        id: 5,
        name: 'GreenWaste Solutions',
        type: 'Decomposition Facility',
        specialization: ['Mixed Textiles', 'Composite Materials'],
        location: 'Oregon, USA',
        capacity: '350 tons/month',
        rating: 4.5,
        description: 'Comprehensive waste management for complex textile composites and mixed materials.',
        email: 'contact@greenwaste.com',
        phone: '+1 555-0654',
        certifications: ['EPA Certified', 'Carbon Neutral'],
        acceptedTypes: ['Non-Recyclable', 'Recyclable']
      },
      {
        id: 6,
        name: 'Textile Renew Corp',
        type: 'Upcycling Center',
        specialization: ['Denim', 'Canvas', 'Heavy Fabrics'],
        location: 'Colorado, USA',
        capacity: '250 tons/month',
        rating: 4.8,
        description: 'Specialized in transforming heavy-duty textiles into new durable products.',
        email: 'info@textilerenew.com',
        phone: '+1 555-0987',
        certifications: ['Fair Trade', 'Sustainable Business'],
        acceptedTypes: ['Reusable', 'Recyclable']
      }
    ];
    setBuyers(mockBuyers);
  }, []);

  const getFilteredBuyers = () => {
    let filtered = buyers;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(buyer =>
        buyer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        buyer.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        buyer.specialization.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Type filter
    if (filterType !== 'all') {
      filtered = filtered.filter(buyer => buyer.type === filterType);
    }

    return filtered;
  };

  const filteredBuyers = getFilteredBuyers();

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Recycling Plant':
        return Recycle;
      case 'Decomposition Facility':
        return Leaf;
      case 'Upcycling Center':
        return Factory;
      default:
        return Factory;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Recycling Plant':
        return 'text-green-600 bg-green-100';
      case 'Decomposition Facility':
        return 'text-orange-600 bg-orange-100';
      case 'Upcycling Center':
        return 'text-blue-600 bg-blue-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const handleContact = (buyer) => {
    // In a real app, this would open a contact form or email client
    alert(`Contact ${buyer.name} at ${buyer.email}`);
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Buyer Directory</h1>
        <p className="text-gray-600">Find verified buyers for your textile waste materials</p>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label mb-2">Search Buyers</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, location, or specialization..."
                className="input pl-10 w-full"
              />
            </div>
          </div>

          <div>
            <label className="label mb-2">Filter by Type</label>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="input pl-10 w-full"
              >
                <option value="all">All Types</option>
                <option value="Recycling Plant">Recycling Plants</option>
                <option value="Decomposition Facility">Decomposition Facilities</option>
                <option value="Upcycling Center">Upcycling Centers</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4">
        <p className="text-gray-600">
          Showing <span className="font-semibold">{filteredBuyers.length}</span> buyer(s)
        </p>
      </div>

      {/* Buyers Grid */}
      {filteredBuyers.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredBuyers.map((buyer) => {
            const TypeIcon = getTypeIcon(buyer.type);
            return (
              <div key={buyer.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition card-hover">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{buyer.name}</h3>
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(buyer.type)}`}>
                      <TypeIcon className="h-4 w-4 mr-1" />
                      {buyer.type}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Award className="h-5 w-5 text-yellow-500 mr-1" />
                    <span className="font-bold text-lg">{buyer.rating}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {buyer.description}
                </p>

                {/* Details */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-sm text-gray-700">
                    <Recycle className="h-4 w-4 mr-3 text-green-600 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Specialization: </span>
                      {buyer.specialization.join(', ')}
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-700">
                    <MapPin className="h-4 w-4 mr-3 text-green-600 flex-shrink-0" />
                    <span>{buyer.location}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-700">
                    <TrendingUp className="h-4 w-4 mr-3 text-green-600 flex-shrink-0" />
                    <span>Capacity: {buyer.capacity}</span>
                  </div>
                </div>

                {/* Accepted Types */}
                <div className="mb-4">
                  <p className="text-xs font-medium text-gray-600 mb-2">Accepted Waste Types:</p>
                  <div className="flex flex-wrap gap-2">
                    {buyer.acceptedTypes.map((type, index) => (
                      <span key={index} className="badge badge-recyclable text-xs">
                        {type}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Certifications */}
                <div className="mb-4 pb-4 border-b border-gray-200">
                  <p className="text-xs font-medium text-gray-600 mb-2">Certifications:</p>
                  <div className="flex flex-wrap gap-2">
                    {buyer.certifications.map((cert, index) => (
                      <span key={index} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Contact */}
                <div className="space-y-2">
                  <button
                    onClick={() => handleContact(buyer)}
                    className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 transition font-medium"
                  >
                    Contact Buyer
                  </button>
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                    <div className="flex items-center">
                      <Mail className="h-3 w-3 mr-1" />
                      <span className="truncate">{buyer.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-3 w-3 mr-1" />
                      <span>{buyer.phone}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-lg shadow-md">
          <Factory className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No buyers found</h3>
          <p className="text-gray-600">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};

export default Buyers;