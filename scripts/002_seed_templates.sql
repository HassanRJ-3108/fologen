-- Seed portfolio templates
INSERT INTO public.templates (name, description, category, is_featured) VALUES
('Modern Minimal', 'Clean and minimal design with focus on content', 'minimal', true),
('Creative Bold', 'Bold colors and creative layouts for designers', 'creative', true),
('Professional Classic', 'Traditional professional portfolio design', 'professional', true),
('Dark Mode', 'Dark theme with neon accents', 'dark', false),
('Portfolio Grid', 'Grid-based layout showcasing projects', 'grid', false),
('Timeline', 'Chronological timeline of experience and projects', 'timeline', false)
ON CONFLICT DO NOTHING;
