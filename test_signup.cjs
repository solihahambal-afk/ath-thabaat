const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(
  'https://sgnczgfzhdaszyeibvxw.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNnbmN6Z2Z6aGRhc3p5ZWlidnh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI0ODQ4MzAsImV4cCI6MjA5ODA2MDgzMH0.ZLkm8wwRlorApDryspKPTtH86KO4z3oiLcRPJgMGX0c'
);

async function test() {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: 'test' + Date.now() + '@example.com',
      password: 'password123',
      options: {
        data: {
          first_name: 'Test',
          last_name: 'User',
          full_name: 'Test User',
          username: 'testuser',
          phone: '1234567890'
        }
      }
    });
    console.log('Error:', error);
  } catch (err) {
    console.error('Exception:', err);
  }
}
test();
