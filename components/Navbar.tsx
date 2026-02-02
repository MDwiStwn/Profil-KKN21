import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'

export default async function Navbar() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    return (
        <nav className="fixed top-0 w-full z-50 bg-white/60 backdrop-blur-2xl border-b border-gray-100/50">
            <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                <Link href="/" className="font-black text-xl text-slate-900 tracking-tighter uppercase italic">
                    KKN 21<span className="text-blue-600">.</span>
                </Link>
                {!user && (
                    <div className="hidden md:flex gap-8 text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">
                        {['Dampak', 'Kegiatan', 'Testimoni', 'Lokasi'].map((item) => (
                            <Link
                                key={item}
                                href={`/#${item === 'Dampak' ? 'stats' : item === 'Testimoni' ? 'guestbook' : item === 'Lokasi' ? 'map' : 'activities'}`}
                                className="relative py-2 transition-colors hover:text-blue-600 group"
                            >
                                {item}
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full" />
                            </Link>
                        ))}
                    </div>
                )}
                {user ? (
                    <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center border border-blue-100">
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                    </div>
                ) : (
                    <Link
                        href="/login"
                        className="px-5 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition text-sm font-medium"
                    >
                        Admin
                    </Link>
                )}
            </div>
        </nav>
    )
}
