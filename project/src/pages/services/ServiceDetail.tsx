import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getService, sendMessage, createBooking } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import { 
  MapPin, 
  Star, 
  ArrowLeft, 
  MessageSquare, 
  Calendar,
  Clock,
  ChevronLeft,
  ChevronRight,
  Check
} from 'lucide-react';
import type { Service } from '../../data/mockData';

const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

const ServiceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchService = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        const data = await getService(id);
        if (data) {
          setService(data);
          
          // Set default selected date to first available day
          if (data.availableDays.length > 0) {
            const today = new Date();
            const todayDay = daysOfWeek[today.getDay()];
            
            // If today is available, select today, otherwise select the first available day
            if (data.availableDays.includes(todayDay)) {
              setSelectedDate(today);
            } else {
              // Find the next available day
              for (let i = 1; i <= 7; i++) {
                const nextDate = new Date();
                nextDate.setDate(today.getDate() + i);
                const nextDay = daysOfWeek[nextDate.getDay()];
                
                if (data.availableDays.includes(nextDay)) {
                  setSelectedDate(nextDate);
                  break;
                }
              }
            }
          }
        } else {
          setError('Service not found');
        }
      } catch (err) {
        setError('Failed to load service details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  const handleSendMessage = async () => {
    if (!user) {
      // Redirect to login page if user is not logged in
      navigate('/login', { state: { from: { pathname: `/services/${id}` } } });
      return;
    }

    if (!service || !message.trim()) return;

    try {
      await sendMessage({
        senderId: user.id,
        receiverId: service.providerId,
        content: message
      });
      
      setMessage('');
      alert('Message sent successfully!');
    } catch (err) {
      console.error('Failed to send message:', err);
    }
  };

  const handleBookService = async () => {
    if (!user) {
      // Redirect to login page if user is not logged in
      navigate('/login', { state: { from: { pathname: `/services/${id}` } } });
      return;
    }

    if (!service || !selectedDate || !selectedTimeSlot) {
      alert('Please select a date and time slot to book this service');
      return;
    }

    try {
      await createBooking({
        customerId: user.id,
        providerId: service.providerId,
        serviceId: service.id,
        date: selectedDate,
        timeSlot: selectedTimeSlot,
        status: 'pending',
        totalPrice: service.price
      });
      
      setBookingSuccess(true);
    } catch (err) {
      console.error('Failed to book service:', err);
      alert('Failed to book service. Please try again later.');
    }
  };

  const renderCalendar = () => {
    if (!service) return null;

    const calendar = [];
    const today = new Date();
    
    // Create a 7-day calendar from today
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      const dayName = daysOfWeek[date.getDay()];
      const isAvailable = service.availableDays.includes(dayName);
      const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
      
      calendar.push(
        <button
          key={i}
          onClick={() => isAvailable && setSelectedDate(date)}
          disabled={!isAvailable}
          className={`
            p-3 rounded-md text-center transition-colors
            ${isSelected 
              ? 'bg-primary-500 text-white' 
              : isAvailable 
                ? 'bg-white border border-neutral-300 hover:border-primary-500' 
                : 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
            }
          `}
        >
          <div className="text-xs font-medium">{date.toLocaleDateString('en-US', { weekday: 'short' })}</div>
          <div className="text-lg font-semibold">{date.getDate()}</div>
          <div className="text-xs">{date.toLocaleDateString('en-US', { month: 'short' })}</div>
        </button>
      );
    }

    return (
      <div className="grid grid-cols-7 gap-2">
        {calendar}
      </div>
    );
  };

  const renderTimeSlots = () => {
    if (!service || !selectedDate) return null;

    return (
      <div className="grid grid-cols-3 gap-3 mt-6">
        {service.availableTimeSlots.map((timeSlot) => {
          const isSelected = timeSlot === selectedTimeSlot;
          
          return (
            <button
              key={timeSlot}
              onClick={() => setSelectedTimeSlot(timeSlot)}
              className={`
                p-3 rounded-md text-center font-medium transition-colors
                ${isSelected 
                  ? 'bg-primary-500 text-white' 
                  : 'bg-white border border-neutral-300 hover:border-primary-500'
                }
              `}
            >
              {timeSlot}
            </button>
          );
        })}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-12 h-12 border-4 border-primary-500 rounded-full border-t-transparent animate-spin"></div>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="container py-12">
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <h3 className="text-xl font-medium mb-4">{error || 'Service not found'}</h3>
          <button
            onClick={() => navigate('/services')}
            className="btn-primary"
          >
            Back to Services
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-neutral-50 min-h-screen pb-12">
      {/* Back Button */}
      <div className="container pt-6">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-neutral-600 hover:text-primary-600 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-1" />
          <span>Back</span>
        </button>
      </div>
      
      {/* Service Details */}
      <div className="container py-6">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            {/* Service Image */}
            <div className="space-y-4">
              <div className="aspect-video md:aspect-square relative overflow-hidden rounded-lg border border-neutral-200">
                <img 
                  src={service.image} 
                  alt={service.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Service Info */}
            <div className="space-y-6">
              {/* Basic Info */}
              <div>
                <div className="flex items-center mb-2">
                  <MapPin className="w-4 h-4 text-neutral-500 mr-1" />
                  <span className="text-sm text-neutral-500">{service.location}</span>
                  <span className="mx-2 text-neutral-300">•</span>
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  <span className="text-sm text-neutral-500">{service.rating.toFixed(1)}</span>
                  <span className="mx-2 text-neutral-300">•</span>
                  <span className="text-sm text-neutral-500">{service.reviews.length} reviews</span>
                </div>
                
                <h1 className="text-3xl font-bold font-heading text-neutral-800 mb-3">
                  {service.name}
                </h1>
                
                <p className="text-neutral-600 mb-4">
                  {service.description}
                </p>
                
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <p className="text-2xl font-bold text-primary-600">
                    ${service.price.toFixed(2)}
                  </p>
                  
                  <div className="flex items-center text-neutral-600">
                    <Clock className="w-5 h-5 mr-1" />
                    <span>{service.duration} minutes</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <div className="badge-primary">
                    {service.category}
                  </div>
                  <div className="badge-secondary">
                    Available {service.availableDays.length} days/week
                  </div>
                </div>
              </div>
              
              {/* Available Days */}
              <div className="border-t border-neutral-200 pt-6">
                <h3 className="text-lg font-medium text-neutral-800 mb-4">
                  Available Days
                </h3>
                <div className="flex flex-wrap gap-2">
                  {daysOfWeek.map((day, index) => (
                    <div 
                      key={day} 
                      className={`px-3 py-1 rounded-md text-sm ${
                        service.availableDays.includes(day) 
                          ? 'bg-primary-100 text-primary-700' 
                          : 'bg-neutral-100 text-neutral-400'
                      }`}
                    >
                      {day.charAt(0).toUpperCase() + day.slice(1)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Booking Section */}
          {!bookingSuccess ? (
            <div className="border-t border-neutral-200 p-6">
              <h2 className="text-xl font-bold font-heading mb-6 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-primary-500" />
                Book This Service
              </h2>
              
              {user ? (
                <div>
                  <div className="mb-6">
                    <h3 className="font-medium mb-4">Select a Date</h3>
                    <div className="overflow-x-auto pb-3">
                      <div className="min-w-max">
                        {renderCalendar()}
                      </div>
                    </div>
                  </div>
                  
                  {selectedDate && (
                    <div className="mb-6">
                      <h3 className="font-medium mb-4">Select a Time</h3>
                      {renderTimeSlots()}
                    </div>
                  )}
                  
                  <div className="flex justify-end">
                    <button
                      onClick={handleBookService}
                      disabled={!selectedDate || !selectedTimeSlot}
                      className={`
                        btn-primary py-3 px-6
                        ${(!selectedDate || !selectedTimeSlot) 
                          ? 'opacity-50 cursor-not-allowed' 
                          : ''}
                      `}
                    >
                      Book Appointment
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-neutral-100 p-6 rounded-lg text-center">
                  <p className="text-neutral-700 mb-4">
                    Please log in to book this service.
                  </p>
                  <button
                    onClick={() => navigate('/login', { state: { from: { pathname: `/services/${id}` } } })}
                    className="btn-primary"
                  >
                    Login to Continue
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="border-t border-neutral-200 p-6">
              <div className="bg-success-50 border border-success-200 rounded-lg p-6 text-center">
                <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-success-600" />
                </div>
                <h3 className="text-xl font-medium text-success-800 mb-2">
                  Booking Successful!
                </h3>
                <p className="text-success-700 mb-6">
                  Your appointment has been booked for {selectedDate?.toLocaleDateString()} at {selectedTimeSlot}
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="btn-primary"
                  >
                    View My Bookings
                  </button>
                  <button
                    onClick={() => navigate('/services')}
                    className="btn-outline"
                  >
                    Browse More Services
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Reviews Section */}
          <div className="border-t border-neutral-200 p-6">
            <h2 className="text-xl font-bold font-heading mb-6">
              Customer Reviews ({service.reviews.length})
            </h2>
            
            {service.reviews.length > 0 ? (
              <div className="space-y-6">
                {service.reviews.map(review => (
                  <div key={review.id} className="border-b border-neutral-200 pb-6 last:border-b-0 last:pb-0">
                    <div className="flex items-center mb-2">
                      <div className="flex items-center mr-3">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-neutral-300'}`} 
                          />
                        ))}
                      </div>
                      <span className="font-medium">{review.userName}</span>
                    </div>
                    <p className="text-neutral-600 mb-2">{review.comment}</p>
                    <p className="text-sm text-neutral-500">
                      {review.createdAt.toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-neutral-600">No reviews yet. Be the first to review this service!</p>
            )}
          </div>
          
          {/* Contact Provider Section */}
          <div className="border-t border-neutral-200 p-6">
            <h2 className="text-xl font-bold font-heading mb-6">
              Contact Service Provider
            </h2>
            
            {user ? (
              <div>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-3 border border-neutral-300 rounded-md min-h-32 mb-4 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Ask the service provider a question..."
                ></textarea>
                
                <button
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  className="btn-primary flex items-center"
                >
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Send Message
                </button>
              </div>
            ) : (
              <div className="bg-neutral-100 p-6 rounded-lg text-center">
                <p className="text-neutral-700 mb-4">
                  Please log in to contact the service provider.
                </p>
                <button
                  onClick={() => navigate('/login', { state: { from: { pathname: `/services/${id}` } } })}
                  className="btn-primary"
                >
                  Login to Continue
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;