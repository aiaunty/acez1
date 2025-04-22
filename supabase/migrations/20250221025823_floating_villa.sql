/*
  # Create storage buckets for assets and products

  1. New Buckets
    - `assets` bucket for storing logos and other static assets
    - `products` bucket for storing product images
  
  2. Security
    - Enable public access to both buckets
    - Add policies for authenticated users to manage files
*/

-- Drop existing policies if they exist
DO $$ 
BEGIN
  EXECUTE (
    SELECT string_agg('DROP POLICY IF EXISTS "' || policyname || '" ON storage.objects;', E'\n')
    FROM pg_policies 
    WHERE schemaname = 'storage' 
    AND tablename = 'objects'
    AND (policyname LIKE 'Public Access%' OR policyname LIKE 'Authenticated users can%')
  );
END $$;

-- Drop existing buckets if they exist
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM storage.buckets WHERE id = 'assets') THEN
    DELETE FROM storage.buckets WHERE id = 'assets';
  END IF;
  
  IF EXISTS (SELECT 1 FROM storage.buckets WHERE id = 'products') THEN
    DELETE FROM storage.buckets WHERE id = 'products';
  END IF;
END $$;

-- Create buckets
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('assets', 'assets', true),
  ('products', 'products', true);

-- Create policies for assets bucket
CREATE POLICY "Public Access Assets"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'assets');

CREATE POLICY "Authenticated users can upload assets"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'assets');

CREATE POLICY "Authenticated users can update assets"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'assets');

CREATE POLICY "Authenticated users can delete assets"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'assets');

-- Create policies for products bucket
CREATE POLICY "Public Access Products"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'products');

CREATE POLICY "Authenticated users can upload products"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'products');

CREATE POLICY "Authenticated users can update products"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'products');

CREATE POLICY "Authenticated users can delete products"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'products');