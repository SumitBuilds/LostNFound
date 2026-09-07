import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = (data) => {
    return new Promise(resolve => {
      setTimeout(() => {
        // Stage 6 API integration will go here
        // For now, use the stub login
        login({ name: data.email.split('@')[0], role: 'student' });
        navigate('/');
        resolve();
      }, 1000);
    });
  };

  return (
    <div className="pt-32 pb-24 px-8 flex items-center justify-center min-h-[calc(100vh-80px)]">
      <div className="w-full max-w-md bg-background border border-primary/10 radius-sys p-10 shadow-2xl relative isolate overflow-hidden">
        {/* Decorative background shape */}
        <div className="absolute -top-16 -right-16 w-40 h-40 bg-accent/5 rounded-full blur-3xl pointer-events-none"></div>

        <h1 className="text-4xl font-bold font-sans mb-2">Welcome Back</h1>
        <p className="text-text-dark/70 font-outfit mb-8">Access the decentralized recovery network.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-bold mb-2 font-data text-primary/80 uppercase tracking-widest">Email</label>
            <input 
              type="email" 
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              placeholder="you@university.edu" 
              className={`w-full bg-transparent border-b-2 py-3 focus:outline-none text-lg font-sans transition-colors ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-primary/20 focus:border-accent'}`}
            />
            {errors.email && <span className="text-red-500 text-xs font-bold mt-2 block">{errors.email.message}</span>}
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 font-data text-primary/80 uppercase tracking-widest">Password</label>
            <input 
              type="password" 
              {...register('password', { 
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters'
                }
              })}
              placeholder="••••••••" 
              className={`w-full bg-transparent border-b-2 py-3 focus:outline-none text-lg font-sans transition-colors ${errors.password ? 'border-red-500 focus:border-red-500' : 'border-primary/20 focus:border-accent'}`}
            />
            {errors.password && <span className="text-red-500 text-xs font-bold mt-2 block">{errors.password.message}</span>}
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full mt-8 btn-magnetic bg-text-dark text-background py-4 rounded-full font-bold text-lg disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center mt-8 text-sm text-text-dark/70">
          Don't have an account? <Link to="/register" className="text-accent font-bold hover:underline">Register here</Link>
        </p>
      </div>
    </div>
  );
}
