"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await signIn("credentials", {
        redirect: false,
        email: email,
        password: password,
      });

      if (response.ok) {
        router.push("/");
      }

      if (response.error) {
        setError("Email ou mot de passe invalide. Veuillez réessayer !");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const loginWithGoogle = () => {
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="relative w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <img
          src="/assets/login.jpg"
          alt="login"
          className="absolute top-0 left-0 w-full h-32 object-cover rounded-t-lg"
        />
        <div className="mt-32">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              placeholder="Email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              placeholder="Mot de passe"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}
            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Se connecter
            </button>
          </form>
          <button
            className="w-full mt-4 py-3 border border-gray-300 text-gray-700 rounded-md flex items-center justify-center hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={loginWithGoogle}
          >
            <FcGoogle className="mr-2" />
            Se connecter avec Google
          </button>
          <a
            href="/register"
            className="block mt-4 text-center text-blue-500 hover:underline"
          >
            Vous n'avez pas de compte ? Inscrivez-vous ici
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;