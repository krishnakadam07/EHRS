import axios from 'axios';

// Get user's current location via browser API
export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'));
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          reject(error);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    }
  });
};

// Calculate distance between two coordinates using Haversine formula
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance.toFixed(1);
};

const deg2rad = (deg) => {
  return deg * (Math.PI / 180);
};

// Query OpenStreetMap Overpass API for amenities near a location
export const fetchNearbyHealthcare = async (lat, lng, radius = 5000) => {
  // Query looks for hospitals, clinics, and doctors within radius (in meters)
  const query = `
    [out:json][timeout:25];
    (
      node["amenity"="hospital"](around:${radius},${lat},${lng});
      way["amenity"="hospital"](around:${radius},${lat},${lng});
      node["amenity"="clinic"](around:${radius},${lat},${lng});
      node["amenity"="doctors"](around:${radius},${lat},${lng});
    );
    out center;
  `;

  try {
    const response = await axios.post('https://overpass-api.de/api/interpreter', query, {
      headers: { 'Content-Type': 'text/plain' }
    });

    const results = response.data.elements.map((el, index) => {
      const elLat = el.lat || el.center?.lat;
      const elLon = el.lon || el.center?.lon;
      const distance = calculateDistance(lat, lng, elLat, elLon);
      
      return {
        id: `real-hosp-${el.id || index}`,
        name: el.tags?.name || 'Unnamed Healthcare Facility',
        distance: `${distance} km`,
        address: [el.tags?.['addr:street'], el.tags?.['addr:city']].filter(Boolean).join(', ') || 'Address not available',
        phone: el.tags?.phone || 'Phone not available',
        lat: elLat,
        lng: elLon,
        // Simulate data since OSM doesn't have ICU bed counts
        icuAvailable: Math.floor(Math.random() * 10),
        emergencyStatus: Math.random() > 0.3 ? 'Active' : 'Busy',
        isReal: true
      };
    });

    // Sort by distance
    return results.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
  } catch (error) {
    console.error('Error fetching OSM data:', error);
    throw error;
  }
};

// Query OpenStreetMap for Blood Banks
export const fetchNearbyBloodBanks = async (lat, lng, radius = 15000) => {
  // Blood banks might be scarce, so search wider (15km)
  const query = `
    [out:json][timeout:25];
    (
      node["healthcare"="blood_donation"](around:${radius},${lat},${lng});
      node["amenity"="blood_bank"](around:${radius},${lat},${lng});
      way["healthcare"="blood_donation"](around:${radius},${lat},${lng});
    );
    out center;
  `;

  try {
    const response = await axios.post('https://overpass-api.de/api/interpreter', query, {
      headers: { 'Content-Type': 'text/plain' }
    });

    const results = response.data.elements.map((el, index) => {
      const elLat = el.lat || el.center?.lat;
      const elLon = el.lon || el.center?.lon;
      const distance = calculateDistance(lat, lng, elLat, elLon);
      
      // Simulate blood stock levels for the interactive UI
      const stockLevels = ['High', 'Medium', 'Low', 'Critical', 'Out of Stock'];
      const getRandomStock = () => stockLevels[Math.floor(Math.random() * stockLevels.length)];
      
      return {
        id: `real-bb-${el.id || index}`,
        name: el.tags?.name || 'Community Blood Center',
        distance: `${distance} km`,
        address: [el.tags?.['addr:street'], el.tags?.['addr:city']].filter(Boolean).join(', ') || 'Address not available',
        phone: el.tags?.phone || 'Phone not available',
        isReal: true,
        stock: {
          "O+": getRandomStock(),
          "O-": getRandomStock(),
          "A+": getRandomStock(),
          "B+": getRandomStock(),
          "AB-": getRandomStock(),
        }
      };
    });

    return results.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
  } catch (error) {
    console.error('Error fetching OSM data:', error);
    throw error;
  }
};
