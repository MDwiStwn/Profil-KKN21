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
                    <div className="hidden md:flex gap-4 text-[13px] font-black uppercase tracking-[0.15em] text-slate-600">
                        {['Dampak', 'Kegiatan', 'Testimoni', 'Lokasi'].map((item) => (
                            <Link
                                key={item}
                                href={`/#${item === 'Dampak' ? 'stats' : item === 'Testimoni' ? 'guestbook' : item === 'Lokasi' ? 'map' : 'activities'}`}
                                className="relative px-5 py-2.5 transition-all duration-300 hover:text-blue-600 group"
                            >
                                <span className="relative z-10">{item}</span>
                                <span className="absolute inset-0 bg-blue-50 rounded-full scale-0 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100 -z-0" />
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
