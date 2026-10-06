import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { forgotPasswordSchema, type ForgotPasswordInput } from '../lib/schemas';

export const ForgotPasswordPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordInput) => {
    console.log('Reset Link Requested:', data);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center space-y-4">
        <h3 className="text-xl font-semibold text-white">Check your email</h3>
        <p className="text-sm text-slate-400">
          We have sent password reset instructions to your email address.
        </p>
        <Link
          to="/login"
          className="inline-block mt-4 text-sm font-medium text-indigo-400 hover:text-indigo-300"
        >
          Return to login
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-white">Forgot Password</h3>
        <p className="text-sm text-slate-400 mt-1">
          Enter your registered email to receive a reset link.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300">Email address</label>
        <input
          {...register('email')}
          type="email"
          className="mt-1 block w-full rounded-lg bg-slate-800 border border-slate-700 text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="developer@example.com"
        />
        {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex justify-center py-2.5 px-4 rounded-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        {isSubmitting ? 'Sending link...' : 'Send Reset Link'}
      </button>

      <p className="text-center text-sm text-slate-400">
        <Link to="/login" className="font-medium text-indigo-400 hover:text-indigo-300">
          Back to sign in
        </Link>
      </p>
    </form>
  );
};