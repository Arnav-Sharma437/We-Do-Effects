'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      if (res.ok) {
        router.push('/admin');
      } else {
        const data = await res.json();
        setError(data.error || 'Invalid password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-surface border border-border/20 rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif font-bold text-foreground mb-2">Admin Portal</h1>
          <p className="text-foreground/70">Enter your master password to continue</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-background border border-border/20 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-accent/50 transition-colors"
              placeholder="••••••••"
              required
            />
          </div>
          
          {error && (
            <div className="text-red-500 text-sm font-medium p-3 bg-red-500/10 rounded-lg border border-red-500/20">
              {error}
            </div>
          )}

          <Button 
            type="submit" 
            disabled={loading}
            className="w-full h-12 bg-accent text-background font-bold tracking-widest uppercase rounded-lg hover:bg-accent/90 transition-colors disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </Button>
        </form>
      </div>
    </div>
  );
}
