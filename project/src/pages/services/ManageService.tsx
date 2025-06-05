import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import { 
  Save,
  Trash,
  Upload,
  Clock,
  Calendar,
  MapPin,
  DollarSign,
  Info
} from 'lucide-react';

interface ServiceCategory {
  id: string;
  name: string;
  slug: string;
}

interface TimeSlot {
  day: string;
  startTime: string;
  endTime: string;
}

const daysOfWeek = [
  'monday', 'tuesday', 'wednesday', 
  'thursday', 'friday', 'saturday', 'sunday'
];

const ManageService = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  
  // Form state
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('60');
  const [location, setLocation] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [availability, setAvailability] = useState<TimeSlot[]>([]);
  
  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from('service_categories')
        .select('id, name, slug');
      
      if (error) {
        console.error('Error fetching categories:', error);
        return;
      }
      
      setCategories(data);
    };
    
    const fetchService = async () => {
      if (!id) return;
      
      const { data: service, error: serviceError } = await supabase
        .from('services')
        .select(`
          *,
          service_images (url),
          service_availability (
            day_of_week,
            start_time,
            end_time
          )
        `)
        .eq('id', id)
        .single();
      
      if (serviceError) {
        console.error('Error fetching service:', serviceError);
        return;
      }
      
      if (service) {
        setName(service.name);
        setDescription(service.description || '');
        setPrice(service.price.toString());
        setDuration(service.duration.toString());
        setLocation(service.location);
        setCategoryId(service.category_id);
        setExistingImages(service.service_images.map(img => img.url));
        setAvailability(
          service.service_availability.map(slot => ({
            day: slot.day_of_week,
            startTime: slot.start_time,
            endTime: slot.end_time
          }))
        );
      }
    };
    
    Promise.all([fetchCategories(), fetchService()]).finally(() => {
      setLoading(false);
    });
  }, [id]);
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages(prev => [...prev, ...files]);
  };
  
  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };
  
  const removeExistingImage = async (url: string) => {
    if (!id) return;
    
    try {
      await supabase
        .from('service_images')
        .delete()
        .eq('service_id', id)
        .eq('url', url);
      
      setExistingImages(prev => prev.filter(img => img !== url));
    } catch (error) {
      console.error('Error removing image:', error);
    }
  };
  
  const addAvailability = () => {
    setAvailability(prev => [...prev, {
      day: daysOfWeek[0],
      startTime: '09:00',
      endTime: '17:00'
    }]);
  };
  
  const updateAvailability = (index: number, field: keyof TimeSlot, value: string) => {
    setAvailability(prev => prev.map((slot, i) => 
      i === index ? { ...slot, [field]: value } : slot
    ));
  };
  
  const removeAvailability = (index: number) => {
    setAvailability(prev => prev.filter((_, i) => i !== index));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setSaving(true);
    
    try {
      const serviceData = {
        provider_id: user.id,
        name,
        description,
        price: parseFloat(price),
        duration: parseInt(duration),
        location,
        category_id: categoryId,
        is_active: true
      };
      
      // Create or update service
      const { data: service, error: serviceError } = id
        ? await supabase
            .from('services')
            .update(serviceData)
            .eq('id', id)
            .select()
            .single()
        : await supabase
            .from('services')
            .insert(serviceData)
            .select()
            .single();
      
      if (serviceError) throw serviceError;
      
      const serviceId = service.id;
      
      // Upload new images
      for (const image of images) {
        const fileExt = image.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `services/${serviceId}/${fileName}`;
        
        const { error: uploadError } = await supabase.storage
          .from('services')
          .upload(filePath, image);
        
        if (uploadError) throw uploadError;
        
        const { data: { publicUrl } } = supabase.storage
          .from('services')
          .getPublicUrl(filePath);
        
        await supabase
          .from('service_images')
          .insert({
            service_id: serviceId,
            url: publicUrl
          });
      }
      
      // Update availability
      if (id) {
        await supabase
          .from('service_availability')
          .delete()
          .eq('service_id', id);
      }
      
      await supabase
        .from('service_availability')
        .insert(
          availability.map(slot => ({
            service_id: serviceId,
            day_of_week: slot.day,
            start_time: slot.startTime,
            end_time: slot.endTime
          }))
        );
      
      navigate(`/services/${serviceId}`);
    } catch (error) {
      console.error('Error saving service:', error);
      alert('Failed to save service. Please try again.');
    } finally {
      setSaving(false);
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-12 h-12 border-4 border-primary-500 rounded-full border-t-transparent animate-spin"></div>
      </div>
    );
  }
  
  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">
          {id ? 'Edit Service' : 'Add New Service'}
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <Info className="w-5 h-5 mr-2 text-primary-500" />
              Basic Information
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Service Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">
                  Description *
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="input min-h-32"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">
                  Category *
                </label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="select"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Price (USD) *
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500 w-4 h-4" />
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="input pl-10"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Duration (minutes) *
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500 w-4 h-4" />
                    <input
                      type="number"
                      min="15"
                      step="15"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="input pl-10"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Location *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500 w-4 h-4" />
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="input pl-10"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Images */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <Upload className="w-5 h-5 mr-2 text-primary-500" />
              Service Images
            </h2>
            
            <div className="space-y-4">
              {/* Existing Images */}
              {existingImages.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {existingImages.map((url, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={url}
                        alt={`Service image ${index + 1}`}
                        className="w-full aspect-square object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeExistingImage(url)}
                        className="absolute top-2 right-2 p-1 bg-error-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              
              {/* New Images */}
              {images.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {images.map((file, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`New image ${index + 1}`}
                        className="w-full aspect-square object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 p-1 bg-error-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium mb-1">
                  Upload Images
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="block w-full text-sm text-neutral-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-primary-50 file:text-primary-700
                    hover:file:bg-primary-100"
                />
              </div>
            </div>
          </div>
          
          {/* Availability */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-primary-500" />
                Availability
              </h2>
              
              <button
                type="button"
                onClick={addAvailability}
                className="btn-outline text-sm"
              >
                Add Time Slot
              </button>
            </div>
            
            <div className="space-y-4">
              {availability.map((slot, index) => (
                <div key={index} className="flex items-end gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1">
                      Day
                    </label>
                    <select
                      value={slot.day}
                      onChange={(e) => updateAvailability(index, 'day', e.target.value)}
                      className="select"
                    >
                      {daysOfWeek.map(day => (
                        <option key={day} value={day}>
                          {day.charAt(0).toUpperCase() + day.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1">
                      Start Time
                    </label>
                    <input
                      type="time"
                      value={slot.startTime}
                      onChange={(e) => updateAvailability(index, 'startTime', e.target.value)}
                      className="input"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1">
                      End Time
                    </label>
                    <input
                      type="time"
                      value={slot.endTime}
                      onChange={(e) => updateAvailability(index, 'endTime', e.target.value)}
                      className="input"
                    />
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => removeAvailability(index)}
                    className="btn-outline text-error-600 border-error-600 hover:bg-error-50"
                  >
                    <Trash className="w-4 h-4" />
                  </button>
                </div>
              ))}
              
              {availability.length === 0 && (
                <p className="text-neutral-500 text-center py-4">
                  No availability set. Add time slots to let customers know when you're available.
                </p>
              )}
            </div>
          </div>
          
          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="btn-outline"
            >
              Cancel
            </button>
            
            <button
              type="submit"
              disabled={saving}
              className="btn-primary min-w-32"
            >
              {saving ? (
                <div className="flex items-center">
                  <div className="w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin mr-2"></div>
                  Saving...
                </div>
              ) : (
                <div className="flex items-center">
                  <Save className="w-5 h-5 mr-2" />
                  Save Service
                </div>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManageService;