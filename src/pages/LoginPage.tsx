import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { loginSchema, type LoginInput } from '../lib/schemas';

export const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    // API Integration Point
    console.log('Login Payload:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h3 className="text-xl font-semibold text-white mb-4">Sign in to your account</h3>

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

      <div>
        <label className="block text-sm font-medium text-slate-300">Password</label>
        <input
          {...register('password')}
          type="password"
          className="mt-1 block w-full rounded-lg bg-slate-800 border border-slate-700 text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {errors.password && <p className="mt-1 text-xs text-red-400">{errors.password.message}</p>}
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center text-sm text-slate-400">
          <input {...register('rememberMe')} type="checkbox" className="rounded bg-slate-800 border-slate-700 text-indigo-600 focus:ring-indigo-500 mr-2" />
          Remember me
        </label>
        <Link to="/forgot-password" className="text-sm font-medium text-indigo-400 hover:text-indigo-300">
          Forgot password?
        </Link>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex justify-center py-2.5 px-4 rounded-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        {isSubmitting ? 'Signing in...' : 'Sign In'}
      </button>

      <p className="text-center text-sm text-slate-400 mt-4">
        Don't have an account?{' '}
        <Link to="/register" className="font-medium text-indigo-400 hover:text-indigo-300">
          Sign up
        </Link>
      </p>
    </form>
  );
};