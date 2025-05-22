// supabaseClient.js
import { createClient } from '@supabase/supabase-js'

// Substitua pelos dados do seu projeto
const SUPABASE_URL = 'https://dxmudclfgeshabbalbnx.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR4bXVkY2xmZ2VzaGFiYmFsYm54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4MDA2NzgsImV4cCI6MjA2MzM3NjY3OH0.vxJow36UnLAcGN_JskTOpQ0kIu4yjNkpc0AAl1mbr-E'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
