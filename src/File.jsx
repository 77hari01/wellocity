import React, { useState, useEffect } from 'react';
import { Search, Calendar, Stethoscope, Pill, MapPin, Phone, Mail, ChevronRight, Menu, X, User, Clock, CheckCircle, XCircle, AlertCircle, Star, Award, Briefcase, ArrowLeft } from 'lucide-react';

export default function MedicareBookingSystem() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [currentView, setCurrentView] = useState('home');
  const [specialties, setSpecialties] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [userAppointments, setUserAppointments] = useState([]);
  
  const [patientData, setPatientData] = useState({
    name: '',
    email: '',
    phone: '',
    reason: ''
  });

  // ✅ CRITICAL: Update these settings
  const API_BASE_URL = 'https://appointment-zwn3.onrender.com/api';
  const API_KEY = 'API_KEY=HealyBot';

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    fetchSpecialties();
  }, []);

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;
  const isDesktop = windowWidth >= 1024;

  const blogs = [
    {
      title: 'Metabolic Stress — Not Body Weight — May Explain Dementia Risk In Patients With Diabetes',
      time: '14 hrs ago',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=250&fit=crop'
    },
    {
      title: 'Mental Health Awareness In India',
      time: '1 day ago',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=250&fit=crop'
    },
    {
      title: 'Women\'s Health Issues Every Indian Woman Should Know',
      time: '1 day ago',
      image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400&h=250&fit=crop'
    }
  ];

  // ✅ FIXED: Enhanced error handling
  const fetchSpecialties = async () => {
    try {
      console.log('🔍 Fetching specialties from:', `${API_BASE_URL}/specialties`);
      
      const response = await fetch(`${API_BASE_URL}/specialties`);
      
      console.log('📡 Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('✅ Specialties received:', data);
      
      if (data.specialties && Array.isArray(data.specialties)) {
        setSpecialties(data.specialties);
      } else {
        console.warn('⚠️ No specialties in response, using fallback');
        setSpecialties(['Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'Dermatology', 'Gynecology', 'Ophthalmology', 'ENT', 'Dentistry', 'Psychiatry', 'Urology', 'Gastroenterology']);
      }
    } catch (err) {
      console.error('❌ Error fetching specialties:', err);
      // Fallback specialties
      setSpecialties(['Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'Dermatology', 'Gynecology', 'Ophthalmology', 'ENT', 'Dentistry', 'Psychiatry', 'Urology', 'Gastroenterology']);
    }
  };

  // ✅ FIXED: Better error handling and logging
  const searchDoctorsBySpecialty = async (specialty) => {
    setLoading(true);
    setError('');
    setDoctors([]);
    
    try {
      console.log('🔍 Searching doctors for specialty:', specialty);
      
      const url = `${API_BASE_URL}/doctors/specialty/${encodeURIComponent(specialty)}`;
      console.log('📡 Fetching from:', url);
      
      const response = await fetch(url);
      console.log('📡 Response status:', response.status);
      
      const data = await response.json();
      console.log('📦 Response data:', data);
      
      if (response.ok && data.doctors && data.doctors.length > 0) {
        console.log('✅ Doctors found:', data.doctors.length);
        setDoctors(data.doctors);
        setSelectedSpecialty(specialty);
        setCurrentView('search');
      } else {
        const errorMsg = data.error || 'No doctors found for this specialty';
        console.warn('⚠️', errorMsg);
        setError(errorMsg);
        setDoctors([]);
        // Still show search view even with no results
        setSelectedSpecialty(specialty);
        setCurrentView('search');
      }
    } catch (err) {
      console.error('❌ Error searching doctors:', err);
      setError(`Failed to fetch doctors: ${err.message}`);
      setDoctors([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ FIXED: Enhanced availability checking
  const checkDoctorAvailability = async (doctorId, date) => {
    setLoading(true);
    setError('');
    setAvailableSlots([]);
    
    try {
      console.log('🔍 Checking availability for:', { doctorId, date });
      
      const response = await fetch(`${API_BASE_URL}/doctors/${doctorId}/availability`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ date })
      });
      
      console.log('📡 Availability response status:', response.status);
      
      const data = await response.json();
      console.log('📦 Availability data:', data);
      
      if (response.ok) {
        if (data.availableSlots && data.availableSlots.length > 0) {
          console.log('✅ Available slots:', data.availableSlots.length);
          setAvailableSlots(data.availableSlots);
        } else {
          console.warn('⚠️ No available slots for this date');
          setError('No available slots for this date. Please try another date.');
          setAvailableSlots([]);
        }
      } else {
        const errorMsg = data.error || 'Failed to check availability';
        console.error('❌ Availability error:', errorMsg);
        setError(errorMsg);
        setAvailableSlots([]);
      }
    } catch (err) {
      console.error('❌ Error checking availability:', err);
      setError(`Failed to check availability: ${err.message}`);
      setAvailableSlots([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ FIXED: Complete booking with proper validation
  const bookAppointment = async () => {
    // Validation
    if (!patientData.name || !patientData.email || !patientData.phone) {
      setError('Please fill in all required fields (Name, Email, Phone)');
      return;
    }

    if (!selectedSlot) {
      setError('Please select a time slot');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      console.log('📤 Booking appointment with data:', {
        doctorId: selectedDoctor.doctorId,
        doctorName: selectedDoctor.name,
        doctorSpecialty: selectedDoctor.specialty,
        patientName: patientData.name,
        patientEmail: patientData.email,
        patientPhone: patientData.phone,
        date: selectedDate,
        timeSlot: selectedSlot.time,
        reason: patientData.reason
      });

      const response = await fetch(`${API_BASE_URL}/appointments/book`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY
        },
        body: JSON.stringify({
          doctorId: selectedDoctor.doctorId,
          doctorName: selectedDoctor.name,
          doctorSpecialty: selectedDoctor.specialty,
          patientName: patientData.name,
          patientEmail: patientData.email,
          patientPhone: patientData.phone,
          date: selectedDate,
          timeSlot: selectedSlot.time,
          reason: patientData.reason,
          appointmentType: 'In-Person'
        })
      });

      console.log('📡 Booking response status:', response.status);
      
      const data = await response.json();
      console.log('📦 Booking response data:', data);

      if (response.ok && data.success) {
        const appointmentId = data.appointment?.appointmentId || 'N/A';
        setSuccess(`🎉 Appointment booked successfully! Appointment ID: ${appointmentId}`);
        
        // Clear form
        setPatientData({ name: '', email: '', phone: '', reason: '' });
        setSelectedSlot(null);
        setAvailableSlots([]);
        
        // Redirect to home after 3 seconds
        setTimeout(() => {
          setCurrentView('home');
          setSuccess('');
          setSelectedDoctor(null);
        }, 3000);
      } else {
        const errorMsg = data.error || 'Failed to book appointment';
        console.error('❌ Booking failed:', errorMsg);
        setError(errorMsg);
      }
    } catch (err) {
      console.error('❌ Booking error:', err);
      setError(`Failed to book appointment: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // ✅ FIXED: Fetch user appointments
  const fetchUserAppointments = async (email) => {
    if (!email || email.trim() === '') {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      console.log('🔍 Fetching appointments for email:', email);
      
      const response = await fetch(`${API_BASE_URL}/appointments/email/${encodeURIComponent(email)}`);
      console.log('📡 Response status:', response.status);
      
      const data = await response.json();
      console.log('📦 Appointments data:', data);
      
      if (response.ok) {
        if (data.appointments && Array.isArray(data.appointments)) {
          console.log('✅ Appointments found:', data.appointments.length);
          setUserAppointments(data.appointments);
        } else {
          console.log('ℹ️ No appointments found');
          setUserAppointments([]);
        }
      } else {
        const errorMsg = data.error || 'Failed to fetch appointments';
        console.error('❌ Fetch appointments error:', errorMsg);
        setError(errorMsg);
        setUserAppointments([]);
      }
    } catch (err) {
      console.error('❌ Error fetching appointments:', err);
      setError(`Failed to fetch appointments: ${err.message}`);
      setUserAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ FIXED: Cancel appointment
  const cancelAppointment = async (appointmentId) => {
    if (!window.confirm('Are you sure you want to cancel this appointment?')) return;

    setLoading(true);
    setError('');
    
    try {
      console.log('🗑️ Cancelling appointment:', appointmentId);
      
      const response = await fetch(`${API_BASE_URL}/appointments/${appointmentId}/cancel`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY
        }
      });

      console.log('📡 Cancel response status:', response.status);
      
      const data = await response.json();
      console.log('📦 Cancel response data:', data);

      if (response.ok && data.success) {
        setSuccess('✅ Appointment cancelled successfully');
        
        // Refresh appointments list
        if (patientData.email) {
          await fetchUserAppointments(patientData.email);
        }
        
        setTimeout(() => setSuccess(''), 3000);
      } else {
        const errorMsg = data.error || 'Failed to cancel appointment';
        console.error('❌ Cancel failed:', errorMsg);
        setError(errorMsg);
      }
    } catch (err) {
      console.error('❌ Cancel error:', err);
      setError(`Failed to cancel appointment: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const selectDoctor = (doctor) => {
    console.log('👨‍⚕️ Selected doctor:', doctor);
    setSelectedDoctor(doctor);
    setCurrentView('booking');
    setSelectedDate('');
    setAvailableSlots([]);
    setSelectedSlot(null);
    setError('');
  };

  const handleDateChange = (date) => {
    console.log('📅 Date selected:', date);
    setSelectedDate(date);
    setSelectedSlot(null);
    if (selectedDoctor && date) {
      checkDoctorAvailability(selectedDoctor.doctorId, date);
    }
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const styles = {
    container: {
      minHeight: '100vh',
      width: '100%',
      backgroundColor: 'white',
      overflowX: 'hidden',
    },
    header: {
      backgroundColor: 'white',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
    },
    headerContainer: {
      maxWidth: '1700px',
      margin: '0 auto',
      padding: isMobile ? '0 20px' : '0 40px',
    },
    headerContent: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px 0',
    },
    logo: {
      fontSize: isMobile ? '24px' : '32px',
      fontWeight: 'bold',
      color: '#2563eb',
      cursor: 'pointer',
    },
    desktopNav: {
      display: isMobile ? 'none' : 'flex',
      gap: '32px',
      alignItems: 'center',
    },
    navLink: {
      color: '#374151',
      fontWeight: '500',
      fontSize: '16px',
      cursor: 'pointer',
      transition: 'color 0.3s',
      paddingBottom: '4px',
    },
    authButtons: {
      display: isMobile ? 'none' : 'flex',
      gap: '16px',
    },
    loginBtn: {
      padding: '10px 24px',
      color: '#2563eb',
      border: '2px solid #2563eb',
      borderRadius: '8px',
      backgroundColor: 'white',
      cursor: 'pointer',
      fontWeight: '500',
      fontSize: '15px',
      transition: 'all 0.3s',
    },
    signupBtn: {
      padding: '10px 24px',
      backgroundColor: '#2563eb',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '500',
      fontSize: '15px',
      transition: 'all 0.3s',
    },
    mobileMenuBtn: {
      display: isMobile ? 'block' : 'none',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
    },
    heroSection: {
      background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
      padding: isMobile ? '60px 20px' : '100px 40px',
    },
    heroContainer: {
      maxWidth: '1700px',
      margin: '0 auto',
    },
    heroGrid: {
      display: 'grid',
      gridTemplateColumns: isDesktop ? '1fr 1fr' : '1fr',
      gap: isDesktop ? '60px' : '40px',
      alignItems: 'center',
    },
    heroTitle: {
      fontSize: isMobile ? '32px' : isTablet ? '42px' : '52px',
      fontWeight: 'bold',
      color: '#111827',
      marginBottom: '20px',
      lineHeight: '1.2',
    },
    heroSubtitle: {
      fontSize: isMobile ? '18px' : '22px',
      color: '#4b5563',
      marginBottom: '30px',
      lineHeight: '1.6',
    },
    heroTagline: {
      fontSize: isMobile ? '22px' : '28px',
      fontWeight: '600',
      color: '#2563eb',
      marginBottom: '30px',
    },
    searchContainer: {
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
      padding: isMobile ? '20px' : '24px',
    },
    searchBox: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      gap: '12px',
    },
    searchInput: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      border: '2px solid #e5e7eb',
      borderRadius: '8px',
      padding: '12px 16px',
      backgroundColor: '#f9fafb',
    },
    input: {
      width: '100%',
      border: 'none',
      outline: 'none',
      fontSize: '15px',
      backgroundColor: 'transparent',
    },
    searchBtn: {
      padding: isMobile ? '12px 24px' : '12px 32px',
      backgroundColor: '#2563eb',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '16px',
      transition: 'all 0.3s',
    },
    heroImage: {
      display: isDesktop ? 'block' : 'none',
    },
    heroImg: {
      width: '100%',
      height: 'auto',
      borderRadius: '16px',
      boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
    },
    section: {
      padding: isMobile ? '60px 20px' : '80px 40px',
    },
    sectionContainer: {
      maxWidth: '1400px',
      margin: '0 auto',
    },
    sectionTitle: {
      fontSize: isMobile ? '28px' : '40px',
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#111827',
      marginBottom: '20px',
      lineHeight: '1.3',
    },
    sectionSubtitle: {
      textAlign: 'center',
      color: '#4b5563',
      fontSize: isMobile ? '16px' : '18px',
      marginBottom: '50px',
      maxWidth: '800px',
      margin: '0 auto 50px',
    },
    featuresGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
      gap: isMobile ? '40px' : '50px',
      marginTop: '60px',
    },
    featureCard: {
      textAlign: 'center',
      padding: '20px',
    },
    featureIcon: {
      backgroundColor: '#dbeafe',
      width: '100px',
      height: '100px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 24px',
      transition: 'transform 0.3s',
    },
    featureTitle: {
      fontSize: '22px',
      fontWeight: '600',
      marginBottom: '12px',
      color: '#111827',
    },
    featureText: {
      color: '#6b7280',
      fontSize: '16px',
      lineHeight: '1.6',
    },
    specialtiesGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : isTablet ? 'repeat(4, 1fr)' : 'repeat(6, 1fr)',
      gap: isMobile ? '16px' : '20px',
    },
    specialtyCard: {
      backgroundColor: 'white',
      padding: isMobile ? '20px 10px' : '24px',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      textAlign: 'center',
      cursor: 'pointer',
      transition: 'all 0.3s',
    },
    specialtyIcon: {
      backgroundColor: '#eff6ff',
      width: isMobile ? '60px' : '70px',
      height: isMobile ? '60px' : '70px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 16px',
    },
    specialtyText: {
      fontSize: isMobile ? '13px' : '15px',
      fontWeight: '500',
      color: '#374151',
    },
    doctorCard: {
      backgroundColor: 'white',
      padding: '30px',
      borderRadius: '16px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      marginBottom: '24px',
      transition: 'all 0.3s',
    },
    doctorHeader: {
      display: 'flex',
      gap: '20px',
      marginBottom: '20px',
      flexDirection: isMobile ? 'column' : 'row',
    },
    doctorAvatar: {
      width: '120px',
      height: '120px',
      borderRadius: '12px',
      backgroundColor: '#dbeafe',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      margin: isMobile ? '0 auto' : '0',
    },
    doctorInfo: {
      flex: 1,
    },
    doctorName: {
      fontSize: '26px',
      fontWeight: 'bold',
      color: '#111827',
      marginBottom: '8px',
    },
    doctorSpecialty: {
      fontSize: '18px',
      color: '#2563eb',
      fontWeight: '500',
      marginBottom: '16px',
    },
    doctorDetails: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
      gap: '12px',
      marginBottom: '20px',
    },
    detailItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '15px',
      color: '#4b5563',
    },
    button: {
      padding: '14px 32px',
      backgroundColor: '#2563eb',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '16px',
      transition: 'all 0.3s',
    },
    buttonSecondary: {
      padding: '12px 24px',
      backgroundColor: 'white',
      color: '#2563eb',
      border: '2px solid #2563eb',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '16px',
      transition: 'all 0.3s',
      display: 'inline-flex',
      alignItems: 'center',
    },
    bookingCard: {
      backgroundColor: 'white',
      borderRadius: '16px',
      boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
      padding: isMobile ? '30px 20px' : '40px',
      maxWidth: '900px',
      margin: '0 auto',
    },
    formLabel: {
      display: 'block',
      fontWeight: '600',
      color: '#374151',
      marginBottom: '8px',
      fontSize: '15px',
    },
    formInput: {
      width: '100%',
      padding: '14px 16px',
      border: '2px solid #e5e7eb',
      borderRadius: '8px',
      fontSize: '15px',
      marginBottom: '20px',
      transition: 'border-color 0.3s',
      boxSizing: 'border-box',
    },
    slotGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
      gap: '12px',
      marginTop: '20px',
    },
    slotCard: {
      padding: '16px',
      border: '2px solid #e5e7eb',
      borderRadius: '8px',
      textAlign: 'center',
      cursor: 'pointer',
      transition: 'all 0.3s',
      fontSize: '14px',
      fontWeight: '500',
      backgroundColor: 'white',
    },
    slotCardSelected: {
      backgroundColor: '#2563eb',
      color: 'white',
      borderColor: '#2563eb',
    },
    alert: {
      padding: '16px 20px',
      borderRadius: '12px',
      marginBottom: '24px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      fontSize: '15px',
    },
    alertError: {
      backgroundColor: '#fee2e2',
      color: '#991b1b',
      border: '1px solid #fecaca',
    },
    alertSuccess: {
      backgroundColor: '#d1fae5',
      color: '#065f46',
      border: '1px solid #a7f3d0',
    },
    blogsGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
      gap: '30px',
    },
    blogCard: {
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      overflow: 'hidden',
      transition: 'transform 0.3s, box-shadow 0.3s',
      cursor: 'pointer',
    },
    blogImage: {
      width: '100%',
      height: '220px',
      objectFit: 'cover',
    },
    blogContent: {
      padding: '24px',
    },
    blogTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#111827',
      marginBottom: '16px',
      lineHeight: '1.5',
      display: '-webkit-box',
      WebkitLineClamp: 3,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
    },
    footer: {
      backgroundColor: '#111827',
      color: 'white',
      padding: isMobile ? '50px 20px' : '60px 40px',
    },
    footerGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
      gap: '40px',
      maxWidth: '1400px',
      margin: '0 auto 40px',
    },
    footerTitle: {
      fontSize: '28px',
      fontWeight: 'bold',
      marginBottom: '16px',
    },
    footerText: {
      color: '#9ca3af',
      fontSize: '15px',
      lineHeight: '1.6',
    },
  };

  return (
    <div style={styles.container}>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif; }
        button:hover { opacity: 0.9; transform: translateY(-2px); }
        .specialty-card:hover { transform: translateY(-5px); box-shadow: 0 8px 20px rgba(0,0,0,0.15); }
        .doctor-card:hover { transform: translateY(-5px); box-shadow: 0 12px 30px rgba(0,0,0,0.2); }
        .blog-card:hover { transform: translateY(-5px); box-shadow: 0 12px 30px rgba(0,0,0,0.2); }
        .feature-icon:hover { transform: scale(1.1); }
        .slot-card:hover { border-color: #2563eb; }
        input:focus, textarea:focus { outline: none; border-color: #2563eb; }
        .nav-link:hover { color: #2563eb; }
      `}</style>

      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContainer}>
          <div style={styles.headerContent}>
            <h1 style={styles.logo} onClick={() => setCurrentView('home')}>Quickobook</h1>
            
            <nav style={styles.desktopNav}>
              <span className="nav-link" style={styles.navLink} onClick={() => setCurrentView('home')}>Home</span>
              <span className="nav-link" style={styles.navLink} onClick={() => setCurrentView('search')}>Find Doctors</span>
              <span className="nav-link" style={styles.navLink}>Hospitals</span>
              <span className="nav-link" style={styles.navLink}>Health Feed</span>
              <span className="nav-link" style={styles.navLink} onClick={() => setCurrentView('appointments')}>My Appointments</span>
            </nav>

            <div style={styles.authButtons}>
              <button style={styles.loginBtn}>Login</button>
              <button style={styles.signupBtn}>Sign Up</button>
            </div>

            <button style={styles.mobileMenuBtn} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* HOME VIEW */}
      {currentView === 'home' && (
        <>
          <section style={styles.heroSection}>
            <div style={styles.heroContainer}>
              <div style={styles.heroGrid}>
                <div>
                  <h2 style={styles.heroTitle}>Largest Healthcare Network Across East India</h2>
                  <p style={styles.heroSubtitle}>Find best doctors across specialities or hospitals in your city.</p>
                  <h3 style={styles.heroTagline}>Discover the Online Appointment!</h3>
                  
                  <div style={styles.searchContainer}>
                    <div style={styles.searchBox}>
                      <div style={styles.searchInput}>
                        <Search style={{color: '#9ca3af', marginRight: '12px'}} size={20} />
                        <input type="text" placeholder="Search doctors, hospitals..." style={styles.input} />
                      </div>
                      <div style={styles.searchInput}>
                        <MapPin style={{color: '#9ca3af', marginRight: '12px'}} size={20} />
                        <input type="text" placeholder="Location" style={styles.input} />
                      </div>
                      <button style={styles.searchBtn}>Search</button>
                    </div>
                  </div>
                </div>
                
                <div style={styles.heroImage}>
                  <img src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=600&h=500&fit=crop" alt="Healthcare" style={styles.heroImg} />
                </div>
              </div>
            </div>
          </section>

          <section style={{...styles.section, backgroundColor: 'white'}}>
            <div style={styles.sectionContainer}>
              <h2 style={styles.sectionTitle}>A step-by-step guide to build an on-demand appointment for patients</h2>
              
              <div style={styles.featuresGrid}>
                <div style={styles.featureCard}>
                  <div style={styles.featureIcon} className="feature-icon">
                    <Search style={{color: '#2563eb'}} size={36} />
                  </div>
                  <h3 style={styles.featureTitle}>Find a Doctor</h3>
                  <p style={styles.featureText}>With more than 1000+ doctors on mission to provide best care Health Care Service</p>
                </div>
                
                <div style={styles.featureCard}>
                  <div style={styles.featureIcon} className="feature-icon">
                    <Stethoscope style={{color: '#2563eb'}} size={36} />
                  </div>
                  <h3 style={styles.featureTitle}>View Doctor</h3>
                  <p style={styles.featureText}>Share your health concern and we shall assign you a top doctor across the North East</p>
                </div>
                
                <div style={styles.featureCard}>
                  <div style={styles.featureIcon} className="feature-icon">
                    <Calendar style={{color: '#2563eb'}} size={36} />
                  </div>
                  <h3 style={styles.featureTitle}>Book a visit</h3>
                  <p style={styles.featureText}>Book your time slot with doctor from your comfort zone</p>
                </div>
              </div>
            </div>
          </section>

          <section style={{...styles.section, backgroundColor: '#f9fafb'}}>
            <div style={styles.sectionContainer}>
              <h2 style={styles.sectionTitle}>Clinic and Specialities</h2>
              <p style={styles.sectionSubtitle}>Find experienced doctors across all specialties</p>
              
              <div style={styles.specialtiesGrid}>
                {specialties.slice(0, 12).map((specialty, index) => (
                  <div key={index} style={styles.specialtyCard} className="specialty-card" onClick={() => searchDoctorsBySpecialty(specialty)}>
                    <div style={styles.specialtyIcon}>
                      <Stethoscope style={{color: '#2563eb'}} size={28} />
                    </div>
                    <p style={styles.specialtyText}>{specialty}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section style={{...styles.section, backgroundColor: 'white'}}>
            <div style={styles.sectionContainer}>
              <h2 style={styles.sectionTitle}>Get Every Single Updates Here</h2>
              <p style={styles.sectionSubtitle}>Online Health Information Library is for general people, patients, their families and friends</p>
              
              <div style={styles.blogsGrid}>
                {blogs.map((blog, index) => (
                  <div key={index} style={styles.blogCard} className="blog-card">
                    <img src={blog.image} alt={blog.title} style={styles.blogImage} />
                    <div style={styles.blogContent}>
                      <h3 style={styles.blogTitle}>{blog.title}</h3>
                      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <span style={{fontSize: '14px', color: '#6b7280'}}>{blog.time}</span>
                        <button style={{color: '#2563eb', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '500'}}>Read more →</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <footer style={styles.footer}>
            <div style={styles.footerGrid}>
              <div>
                <h3 style={styles.footerTitle}>Quickobook</h3>
                <p style={styles.footerText}>Your trusted healthcare partner for online doctor consultations and appointments.</p>
              </div>
              <div>
                <h4 style={{fontSize: '18px', fontWeight: '600', marginBottom: '20px'}}>Quick Links</h4>
                <ul style={{listStyle: 'none', padding: 0}}>
                  <li style={{marginBottom: '12px'}}><span style={styles.footerText}>About Us</span></li>
                  <li style={{marginBottom: '12px'}}><span style={styles.footerText}>Find Doctors</span></li>
                  <li style={{marginBottom: '12px'}}><span style={styles.footerText}>Hospitals</span></li>
                </ul>
              </div>
              <div>
                <h4 style={{fontSize: '18px', fontWeight: '600', marginBottom: '20px'}}>Services</h4>
                <ul style={{listStyle: 'none', padding: 0}}>
                  <li style={{marginBottom: '12px'}}><span style={styles.footerText}>Book Appointment</span></li>
                  <li style={{marginBottom: '12px'}}><span style={styles.footerText}>Online Consultation</span></li>
                  <li style={{marginBottom: '12px'}}><span style={styles.footerText}>Order Medicines</span></li>
                </ul>
              </div>
              <div>
                <h4 style={{fontSize: '18px', fontWeight: '600', marginBottom: '20px'}}>Contact Us</h4>
                <div style={{display: 'flex', alignItems: 'center', marginBottom: '12px'}}>
                  <Phone size={16} style={{marginRight: '10px'}} />
                  <span style={styles.footerText}>+91 1800-123-4567</span>
                </div>
                <div style={{display: 'flex', alignItems: 'center'}}>
                  <Mail size={16} style={{marginRight: '10px'}} />
                  <span style={styles.footerText}>info@quickobook.com</span>
                </div>
              </div>
            </div>
            <div style={{borderTop: '1px solid #374151', paddingTop: '30px', textAlign: 'center'}}>
              <p style={{color: '#9ca3af', fontSize: '14px'}}>&copy; 2024 Quickobook. All rights reserved.</p>
            </div>
          </footer>
        </>
      )}

      {/* SEARCH RESULTS VIEW */}
      {currentView === 'search' && (
        <section style={{...styles.section, backgroundColor: '#f9fafb', minHeight: '80vh'}}>
          <div style={styles.sectionContainer}>
            <button style={styles.buttonSecondary} onClick={() => setCurrentView('home')}>
              <ArrowLeft size={18} style={{marginRight: '8px'}} /> Back to Home
            </button>

            <h2 style={{...styles.sectionTitle, marginTop: '30px', marginBottom: '10px'}}>{selectedSpecialty} Doctors</h2>
            <p style={{...styles.sectionSubtitle, marginBottom: '40px'}}>{doctors.length} doctors found</p>

            {loading && <div style={{textAlign: 'center', padding: '40px', fontSize: '18px', color: '#6b7280'}}>Loading...</div>}

            {error && (
              <div style={{...styles.alert, ...styles.alertError}}>
                <XCircle size={20} />
                {error}
              </div>
            )}

            {!loading && doctors.length === 0 && !error && (
              <div style={{textAlign: 'center', padding: '80px 20px'}}>
                <Stethoscope size={80} style={{margin: '0 auto 20px', color: '#d1d5db'}} />
                <p style={{fontSize: '20px', color: '#6b7280', fontWeight: '500'}}>No doctors found</p>
                <p style={{fontSize: '16px', color: '#9ca3af', marginTop: '10px'}}>Try selecting a different specialty</p>
                <button style={{...styles.button, marginTop: '30px'}} onClick={() => setCurrentView('home')}>Back to Home</button>
              </div>
            )}

            {doctors.map((doctor, index) => (
              <div key={index} style={styles.doctorCard} className="doctor-card">
                <div style={styles.doctorHeader}>
                  <div style={styles.doctorAvatar}>
                    <User style={{color: '#2563eb'}} size={64} />
                  </div>
                  <div style={styles.doctorInfo}>
                    <h3 style={styles.doctorName}>Dr. {doctor.name}</h3>
                    <p style={styles.doctorSpecialty}>{doctor.specialty}</p>
                    <div style={styles.doctorDetails}>
                      <div style={styles.detailItem}>
                        <Award size={16} style={{color: '#2563eb'}} />
                        <span>{doctor.qualification}</span>
                      </div>
                      <div style={styles.detailItem}>
                        <Briefcase size={16} style={{color: '#2563eb'}} />
                        <span>{doctor.experience} years experience</span>
                      </div>
                      <div style={styles.detailItem}>
                        <Star size={16} style={{color: '#fbbf24', fill: '#fbbf24'}} />
                        <span>{doctor.rating}/5 rating</span>
                      </div>
                      <div style={styles.detailItem}>
                        <span style={{fontWeight: '600', color: '#2563eb'}}>₹{doctor.consultationFee}</span>
                      </div>
                    </div>
                    <button style={styles.button} onClick={() => selectDoctor(doctor)}>Book Appointment</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* BOOKING VIEW */}
      {currentView === 'booking' && selectedDoctor && (
        <section style={{...styles.section, backgroundColor: '#f9fafb'}}>
          <div style={styles.sectionContainer}>
            <button style={styles.buttonSecondary} onClick={() => setCurrentView('search')}>
              <ArrowLeft size={18} style={{marginRight: '8px'}} /> Back to Doctors
            </button>

            <h2 style={{...styles.sectionTitle, marginTop: '30px'}}>Book Appointment with Dr. {selectedDoctor.name}</h2>

            {error && (
              <div style={{...styles.alert, ...styles.alertError}}>
                <XCircle size={20} />
                {error}
              </div>
            )}

            {success && (
              <div style={{...styles.alert, ...styles.alertSuccess}}>
                <CheckCircle size={20} />
                {success}
              </div>
            )}

            <div style={styles.bookingCard}>
              <h3 style={{fontSize: '24px', fontWeight: 'bold', marginBottom: '30px', color: '#111827'}}>Patient Information</h3>
              
              <label style={styles.formLabel}>Full Name *</label>
              <input
                type="text"
                style={styles.formInput}
                placeholder="Enter your full name"
                value={patientData.name}
                onChange={(e) => setPatientData({...patientData, name: e.target.value})}
              />

              <label style={styles.formLabel}>Email Address *</label>
              <input
                type="email"
                style={styles.formInput}
                placeholder="your.email@example.com"
                value={patientData.email}
                onChange={(e) => setPatientData({...patientData, email: e.target.value})}
              />

              <label style={styles.formLabel}>Phone Number *</label>
              <input
                type="tel"
                style={styles.formInput}
                placeholder="+91 1234567890"
                value={patientData.phone}
                onChange={(e) => setPatientData({...patientData, phone: e.target.value})}
              />

              <label style={styles.formLabel}>Reason for Visit</label>
              <textarea
                style={{...styles.formInput, minHeight: '100px', resize: 'vertical'}}
                placeholder="Describe your symptoms or reason for visit"
                value={patientData.reason}
                onChange={(e) => setPatientData({...patientData, reason: e.target.value})}
              />

              <h3 style={{fontSize: '24px', fontWeight: 'bold', marginTop: '40px', marginBottom: '20px', color: '#111827'}}>Select Date & Time</h3>
              
              <label style={styles.formLabel}>Appointment Date *</label>
              <input
                type="date"
                style={styles.formInput}
                min={getTomorrowDate()}
                value={selectedDate}
                onChange={(e) => handleDateChange(e.target.value)}
              />

              {selectedDate && (
                <>
                  <h4 style={{fontSize: '18px', fontWeight: '600', marginTop: '30px', marginBottom: '20px', color: '#374151'}}>Available Time Slots</h4>

                  {loading && <div style={{textAlign: 'center', padding: '20px', color: '#6b7280'}}>Checking availability...</div>}

                  {!loading && availableSlots.length === 0 && selectedDate && (
                    <div style={{...styles.alert, backgroundColor: '#fef3c7', color: '#92400e', border: '1px solid #fde68a'}}>
                      <AlertCircle size={20} />
                      No slots available for this date. Please try another date.
                    </div>
                  )}

                  {!loading && availableSlots.length > 0 && (
                    <div style={styles.slotGrid}>
                      {availableSlots.map((slot, index) => (
                        <div
                          key={index}
                          style={{
                            ...styles.slotCard,
                            ...(selectedSlot?.time === slot.time ? styles.slotCardSelected : {}),
                          }}
                          className="slot-card"
                          onClick={() => setSelectedSlot(slot)}
                        >
                          <Clock size={16} style={{margin: '0 auto 8px'}} />
                          {slot.time}
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}

              <button
                style={{
                  ...styles.button,
                  width: '100%',
                  padding: '18px',
                  fontSize: '18px',
                  marginTop: '40px',
                  opacity: (!selectedSlot || !patientData.name || !patientData.email || !patientData.phone) ? 0.5 : 1,
                  cursor: (!selectedSlot || !patientData.name || !patientData.email || !patientData.phone) ? 'not-allowed' : 'pointer',
                }}
                onClick={bookAppointment}
                disabled={!selectedSlot || !patientData.name || !patientData.email || !patientData.phone || loading}
              >
                {loading ? 'Booking...' : '✓ Confirm Appointment'}
              </button>
            </div>
          </div>
        </section>
      )}

      {/* MY APPOINTMENTS VIEW */}
      {currentView === 'appointments' && (
        <section style={{...styles.section, backgroundColor: '#f9fafb', minHeight: '80vh'}}>
          <div style={styles.sectionContainer}>
            <button style={styles.buttonSecondary} onClick={() => setCurrentView('home')}>
              <ArrowLeft size={18} style={{marginRight: '8px'}} /> Back to Home
            </button>

            <h2 style={{...styles.sectionTitle, marginTop: '30px', marginBottom: '40px'}}>My Appointments</h2>

            {!patientData.email && (
              <div style={{...styles.bookingCard, maxWidth: '600px'}}>
                <h3 style={{fontSize: '20px', fontWeight: '600', marginBottom: '20px', color: '#111827'}}>Enter your email to view appointments</h3>
                <div style={{display: 'flex', gap: '12px', flexDirection: isMobile ? 'column' : 'row'}}>
                  <input
                    type="email"
                    style={{...styles.formInput, marginBottom: 0, flex: 1}}
                    placeholder="your.email@example.com"
                    value={patientData.email}
                    onChange={(e) => setPatientData({...patientData, email: e.target.value})}
                  />
                  <button style={styles.button} onClick={() => fetchUserAppointments(patientData.email)}>
                    {loading ? 'Loading...' : 'View Appointments'}
                  </button>
                </div>
              </div>
            )}

            {error && (
              <div style={{...styles.alert, ...styles.alertError}}>
                <XCircle size={20} />
                {error}
              </div>
            )}

            {success && (
              <div style={{...styles.alert, ...styles.alertSuccess}}>
                <CheckCircle size={20} />
                {success}
              </div>
            )}

            {patientData.email && userAppointments.length === 0 && !loading && (
              <div style={{textAlign: 'center', padding: '80px 20px'}}>
                <Calendar size={80} style={{margin: '0 auto 20px', color: '#d1d5db'}} />
                <p style={{fontSize: '20px', color: '#6b7280', fontWeight: '500'}}>No appointments found</p>
                <p style={{fontSize: '16px', color: '#9ca3af', marginTop: '10px'}}>Book your first appointment to get started</p>
                <button style={{...styles.button, marginTop: '30px'}} onClick={() => setCurrentView('home')}>Find Doctors</button>
              </div>
            )}

            {userAppointments.length > 0 && (
              <div style={{maxWidth: '900px', margin: '0 auto'}}>
                {userAppointments.map((appointment, index) => (
                  <div key={index} style={{...styles.doctorCard, marginBottom: '20px'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', flexWrap: 'wrap', gap: '16px'}}>
                      <div>
                        <h3 style={{fontSize: '22px', fontWeight: 'bold', color: '#111827', marginBottom: '8px'}}>
                          Dr. {appointment.doctorName}
                        </h3>
                        <p style={{color: '#2563eb', fontSize: '16px', fontWeight: '500'}}>{appointment.doctorSpecialty}</p>
                      </div>
                      <span style={{
                        padding: '8px 16px',
                        borderRadius: '20px',
                        fontSize: '14px',
                        fontWeight: '600',
                        backgroundColor: appointment.status === 'confirmed' ? '#d1fae5' : '#fee2e2',
                        color: appointment.status === 'confirmed' ? '#065f46' : '#991b1b',
                      }}>
                        {appointment.status.toUpperCase()}
                      </span>
                    </div>
                    
                    <div style={{display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '16px', marginBottom: '20px'}}>
                      <div style={{display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', backgroundColor: '#f9fafb', borderRadius: '8px'}}>
                        <Calendar size={20} style={{color: '#2563eb'}} />
                        <div>
                          <p style={{fontSize: '12px', color: '#6b7280', marginBottom: '2px'}}>Date</p>
                          <p style={{fontSize: '15px', fontWeight: '600', color: '#111827'}}>{appointment.date}</p>
                        </div>
                      </div>
                      <div style={{display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', backgroundColor: '#f9fafb', borderRadius: '8px'}}>
                        <Clock size={20} style={{color: '#2563eb'}} />
                        <div>
                          <p style={{fontSize: '12px', color: '#6b7280', marginBottom: '2px'}}>Time</p>
                          <p style={{fontSize: '15px', fontWeight: '600', color: '#111827'}}>{appointment.timeSlot}</p>
                        </div>
                      </div>
                    </div>

                    <div style={{borderTop: '1px solid #e5e7eb', paddingTop: '16px', marginBottom: '16px'}}>
                      <p style={{fontSize: '13px', color: '#6b7280'}}>
                        <strong style={{color: '#374151'}}>Appointment ID:</strong> {appointment.appointmentId}
                      </p>
                    </div>

                    {appointment.status === 'confirmed' && (
                      <div style={{display: 'flex', gap: '12px', flexWrap: 'wrap'}}>
                        <button
                          style={{
                            ...styles.button,
                            backgroundColor: '#dc2626',
                            fontSize: '14px',
                            padding: '12px 24px'
                          }}
                          onClick={() => cancelAppointment(appointment.appointmentId)}
                          disabled={loading}
                        >
                          {loading ? 'Cancelling...' : '✕ Cancel Appointment'}
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}