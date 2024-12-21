'use client';

import { useState } from 'react';
import { fakeUsers } from '@/utils/fakeUsers';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSignup = () => {
    // Fake user kontrolü (email benzersiz olmalı)
    if (fakeUsers.some((u) => u.email === email)) {
      setError('Bu email zaten kayıtlı.');
      return;
    }

    // Başarıyla kayıt olursa
    setSuccess(true);
    setTimeout(() => {
      router.push('/auth/login'); // Login sayfasına yönlendirme
    }, 2000);
  };

  return (
    <motion.div
      className="flex-1 bg-gradient-radial-accent min-h-screen flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col md:flex-row items-center bg-white shadow-lg rounded-lg max-w-4xl w-full overflow-hidden">
        {/* Resim Alanı */}
        <div className="hidden md:block w-1/2">
          <img
            src="/signup.jpg"
            alt="Signup Illustration"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Form Alanı */}
        <div className="w-full md:w-1/2 p-8">
          <h1 className="text-2xl font-bold mb-4 text-primary">Kayıt Ol</h1>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {success && (
            <p className="text-green-500 mb-4">
              Başarıyla kayıt oldunuz! Giriş sayfasına yönlendiriliyorsunuz...
            </p>
          )}
          <input
            type="text"
            placeholder="İsim"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mb-4 p-2 border border-gray-300 rounded"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 p-2 border border-gray-300 rounded"
          />
          <input
            type="password"
            placeholder="Şifre"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-4 p-2 border border-gray-300 rounded"
          />
          <button
            onClick={handleSignup}
            className="w-full bg-secondary text-white py-2 rounded hover:bg-accent"
          >
            Kayıt Ol
          </button>
          <p className="mt-4 text-sm">
            Zaten hesabınız var mı?{' '}
            <a href="/auth/login" className="text-secondary underline">
              Giriş Yap
            </a>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
