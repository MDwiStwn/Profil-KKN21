'use client'
import { createClient } from '@/utils/supabase/client'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import Beams from '@/components/Beams/Beams'

export default function Login() {
    const [loading, setLoading] = useState(false)
    const supabase = createClient()

    const handleLogin = async () => {
        setLoading(true)
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: location.origin + '/auth/callback',
            },
        })
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
            {/* Animated Beams Background */}
            <div className="absolute inset-0 z-0">
                <Beams
                    beamWidth={3}
                    beamHeight={40}
                    beamNumber={15}
                    lightColor="#4285F4"
                    speed={1.5}
                    noiseIntensity={1.5}
                    scale={0.5}
                    rotation={20}
                />
            </div>

            {/* Gradient Overlays */}
            <div className="absolute inset-0 z-1 bg-gradient-to-t from-black via-transparent to-transparent" />
            <div className="absolute inset-0 z-1 bg-gradient-to-r from-black/50 via-transparent to-black/50" />

            <div className="relative z-10 bg-white/5 backdrop-blur-2xl p-10 rounded-[2.5rem] border border-white/10 shadow-2xl w-full max-w-md text-center transform transition-all duration-500 hover:scale-[1.01]">
                <div className="w-20 h-20 bg-blue-600 rounded-3xl mx-auto mb-8 flex items-center justify-center text-white shadow-2xl shadow-blue-500/20 rotate-3 animate-pulse">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A10.003 10.003 0 0012 21a10.003 10.003 0 008.384-4.51l.054.09m-4.283-9.558a5 5 0 01-6.83 6.83m6.83-6.83A5 5 0 1111 4.542a5 5 0 011.274 4.058z" />
                    </svg>
                </div>
                <h1 className="text-3xl font-black mb-2 text-white tracking-tighter">Admin Access</h1>
                <p className="text-gray-400 mb-10 font-medium">Masuk untuk mengelola KKN 21 Sukodadi</p>

                <button
                    onClick={handleLogin}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-4 bg-white text-black font-black py-4 rounded-2xl transition-all duration-300 hover:bg-gray-100 hover:shadow-2xl hover:shadow-white/10 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed group"
                >
                    {loading ? (
                        <Loader2 className="animate-spin w-5 h-5 text-black" />
                    ) : (
                        <>
                            <svg className="w-5 h-5 transition-transform group-hover:rotate-12" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="currentColor" d="M12 4.6c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 1.09 14.97 0 12 0 7.7 0 3.99 2.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            Masuk dengan Google
                        </>
                    )}
                </button>
            </div>
        </div>
    )
}
