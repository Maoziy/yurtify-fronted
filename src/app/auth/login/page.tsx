'use client';

import { useState } from 'react';
import { fakeUsers } from '@/utils/fakeUsers';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setUser } = useUser();
  const router = useRouter();

  const handleLogin = () => {
    const user = fakeUsers.find((u) => u.email === email && u.password === password);
    if (user) {
      setUser(user); // Kullanıcı bilgisini kaydet
      router.push('/'); // Ana sayfaya yönlendir
    } else {
      setError('Email veya şifre yanlış.');
    }
  };

  return (
    <motion.div
      className="flex-1 min-h-screen bg-gradient-radial-accent flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col md:flex-row items-center bg-white shadow-lg rounded-lg max-w-4xl w-full overflow-hidden">
        <div className="hidden md:block w-1/2">
          <img src="/login.jpg" alt="Login Illustration" className="w-full h-full object-cover" />
        </div>

        <div className="w-full md:w-1/2 p-8">
          <h1 className="text-2xl font-bold mb-4 text-primary">Login</h1>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 p-2 border border-gray-300 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-4 p-2 border border-gray-300 rounded"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-secondary text-white py-2 rounded hover:bg-accent"
          >
            Giriş Yap
          </button>
          <p className="mt-4 text-sm">
            Hesabınız yok mu?{' '}
            <a href="/auth/signup" className="text-secondary underline">
              Kaydol
            </a>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
