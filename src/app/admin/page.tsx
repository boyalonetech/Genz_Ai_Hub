"use client";
import Dashboard from "@/components/dashbord/Dashboard";
import { EyeIcon, EyeOff, Lock } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function page() {
  const [isAuth, setIsAuth] = useState(false);
  const [hide, setHide] = useState("password");
  const [see, setSee] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const username: any = process.env.NEXT_PUBLIC_USERNAME;
  const emailref: any = process.env.NEXT_PUBLIC_EMAIL;
  const passwordref: any = process.env.NEXT_PUBLIC_PASSWORD;

  const handleAuth = () => {
    if (name === username && email === emailref && password === passwordref) {
      setIsAuth(true);
      localStorage.setItem("isAdmin", "true");
      setName(""), setEmail(""), setPassword("");
      setSee(false);
    } else {
      setError(true);
    }
  };

  const handleLogout = () => {
    setIsAuth(false);
    localStorage.removeItem("isAdmin");
  };

  useEffect(() => {
    if (see) {
      setHide("text");
    } else {
      setHide("password");
    }

    const auth = localStorage.getItem("isAdmin");

    if (auth === "true") {
      setIsAuth(true);
    }
  });
  return (
    <section>
      {!isAuth ? (
        <>
          <section className="flex flex-col justify-center items-center min-h-screen">
            <fieldset className="gap-9 flex w-full md:w-100 px-3 md:px-0 flex-col">
              <h1 className="text-center text-3xl font-bold">ADMIN LOGIN</h1>
              <section className="flex-col flex gap-3">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border w-full p-4 rounded-xl focus:border-none focus:outline-2 focus:outline-gray-900"
                  placeholder="Username"
                  required
                />

                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="border w-full p-4 rounded-xl focus:border-none focus:outline-2 focus:outline-gray-900"
                  placeholder="Email"
                  required
                />

                <div className="relative flex">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={hide}
                    className="border w-full p-4 rounded-xl focus:border-none focus:outline-2 focus:outline-gray-900"
                    placeholder="Password"
                    required
                  />
                  <button
                    className="absolute top-4 right-3"
                    onClick={() => {
                      setSee(!see);
                    }}
                  >
                    {!see ? (
                      <EyeIcon className="text-gray-500 cursor-pointer" />
                    ) : (
                      <EyeOff className="text-gray-500 cursor-pointer" />
                    )}
                  </button>
                </div>
              </section>
              <button
                type="submit"
                className="p-4 px-6 bg-orange-400 text-lg font-medium cursor-pointer hover:bg-orange-500 transform-3d duration-300 text-white rounded-xl"
                onClick={handleAuth}
              >
                {" "}
                Login{" "}
              </button>
            </fieldset>
            {error && (
              <div className="fixed bg-black/50 backdrop-blur-md h-screen w-screen flex items-center z-10 justify-center">
                <div className="fixed bg-gray-50 flex items-center justify-center rounded-2xl z-50">
                  <div className="max-w-md w-full bg-white rounded-2xl shadow-lg border p-8 text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Lock className="w-8 h-8 text-red-500" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">
                      Access Denied
                    </h1>
                    <p className="text-gray-600 mb-6">
                      You need Entered an Incorrect Username, Email or Password
                    </p>
                    <button
                      className="w-full bg-orange-400 text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-500 transition-colors"
                      onClick={() => setError(false)}
                    >
                      Try Again
                    </button>
                  </div>
                </div>
              </div>
            )}
          </section>
        </>
      ) : (
        <Dashboard logout={handleLogout} />
      )}
    </section>
  );
}
