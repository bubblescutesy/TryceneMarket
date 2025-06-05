/*
  # Services Management Schema

  1. New Tables
    - `services`
      - Core service information
      - Managed by service providers
    - `service_availability`
      - Tracks provider availability and scheduling
    - `service_categories`
      - Predefined service categories
    - `service_images`
      - Images associated with services
    
  2. Security
    - Enable RLS on all tables
    - Policies for service providers to manage their services
    - Policies for customers to view services
*/

-- Create service categories table
CREATE TABLE IF NOT EXISTS service_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  slug text NOT NULL UNIQUE,
  description text,
  icon text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE service_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view service categories"
  ON service_categories
  FOR SELECT
  TO authenticated
  USING (true);

-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  category_id uuid REFERENCES service_categories(id) ON DELETE SET NULL,
  name text NOT NULL,
  description text,
  price decimal(10,2) NOT NULL,
  duration integer NOT NULL, -- in minutes
  location text NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- Policies for services table
CREATE POLICY "Service providers can manage their own services"
  ON services
  FOR ALL
  TO authenticated
  USING (auth.uid() = provider_id)
  WITH CHECK (auth.uid() = provider_id);

CREATE POLICY "Anyone can view active services"
  ON services
  FOR SELECT
  TO authenticated
  USING (is_active = true);

-- Create service images table
CREATE TABLE IF NOT EXISTS service_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id uuid REFERENCES services(id) ON DELETE CASCADE,
  url text NOT NULL,
  is_primary boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE service_images ENABLE ROW LEVEL SECURITY;

-- Policies for service images
CREATE POLICY "Service providers can manage their service images"
  ON service_images
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM services 
      WHERE id = service_images.service_id 
      AND provider_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM services 
      WHERE id = service_images.service_id 
      AND provider_id = auth.uid()
    )
  );

CREATE POLICY "Anyone can view service images"
  ON service_images
  FOR SELECT
  TO authenticated
  USING (true);

-- Create service availability table
CREATE TABLE IF NOT EXISTS service_availability (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id uuid REFERENCES services(id) ON DELETE CASCADE,
  day_of_week text NOT NULL CHECK (
    day_of_week IN (
      'monday', 'tuesday', 'wednesday', 
      'thursday', 'friday', 'saturday', 'sunday'
    )
  ),
  start_time time NOT NULL,
  end_time time NOT NULL,
  is_available boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(service_id, day_of_week)
);

ALTER TABLE service_availability ENABLE ROW LEVEL SECURITY;

-- Policies for service availability
CREATE POLICY "Service providers can manage their availability"
  ON service_availability
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM services 
      WHERE id = service_availability.service_id 
      AND provider_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM services 
      WHERE id = service_availability.service_id 
      AND provider_id = auth.uid()
    )
  );

CREATE POLICY "Anyone can view service availability"
  ON service_availability
  FOR SELECT
  TO authenticated
  USING (true);

-- Insert default service categories
INSERT INTO service_categories (name, slug, description, icon) 
VALUES 
  ('Beauty & Personal Care', 'beauty', 'Beauty treatments and personal care services', 'Scissors'),
  ('Professional Services', 'professional', 'Professional and consulting services', 'Briefcase'),
  ('Home Services', 'home', 'Home maintenance and improvement services', 'Home'),
  ('Education & Tutoring', 'education', 'Educational and tutoring services', 'GraduationCap'),
  ('Health & Wellness', 'health', 'Health and wellness services', 'Heart'),
  ('Automotive', 'automotive', 'Automotive repair and maintenance services', 'Car'),
  ('Events & Entertainment', 'events', 'Event planning and entertainment services', 'Music'),
  ('Tech Support', 'tech', 'Technical support and IT services', 'Laptop')
ON CONFLICT (name) DO NOTHING;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_services_updated_at
  BEFORE UPDATE ON services
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_service_availability_updated_at
  BEFORE UPDATE ON service_availability
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();