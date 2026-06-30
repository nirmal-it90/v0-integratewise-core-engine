-- BYOM - User Model Configs
CREATE TABLE IF NOT EXISTS user_model_configs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  provider VARCHAR(50) NOT NULL, -- openai, anthropic, google, groq
  api_key_encrypted TEXT NOT NULL, -- encrypted API key
  is_active BOOLEAN DEFAULT true,
  last_used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, provider)
);

-- BYOT - User Custom Templates
CREATE TABLE IF NOT EXISTS user_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  template_type VARCHAR(50) NOT NULL, -- n8n_workflow, prompt_template, report_template, email_sequence
  content TEXT NOT NULL, -- JSON or text content
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Template Downloads tracking
CREATE TABLE IF NOT EXISTS template_downloads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  template_id VARCHAR(100) NOT NULL,
  session_id VARCHAR(255), -- Stripe session ID for paid templates
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE user_model_configs ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE template_downloads ENABLE ROW LEVEL SECURITY;

-- User can only access their own model configs
CREATE POLICY user_model_configs_policy ON user_model_configs
  FOR ALL USING (auth.uid() = user_id);

-- User can only access their own templates
CREATE POLICY user_templates_policy ON user_templates
  FOR ALL USING (auth.uid() = user_id OR is_public = true);

-- User can only see their own downloads
CREATE POLICY template_downloads_policy ON template_downloads
  FOR ALL USING (auth.uid() = user_id);

-- Indexes
CREATE INDEX idx_user_model_configs_user ON user_model_configs(user_id);
CREATE INDEX idx_user_templates_user ON user_templates(user_id);
CREATE INDEX idx_template_downloads_user ON template_downloads(user_id);
