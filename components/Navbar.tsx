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
                    <div className="hidden md:flex gap-2 text-[13px] font-bold uppercase tracking-[0.2em] text-slate-500">
                        {[
                            { name: 'Dampak', href: '/#stats' },
                            { name: 'Kegiatan', href: '/#activities' },
                            { name: 'Testimoni', href: '/#guestbook' },
                            { name: 'Lokasi', href: '/#map' },
                        ].map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="relative px-6 py-2.5 transition-all duration-500 hover:text-blue-600 group rounded-full overflow-hidden"
                            >
                                <span className="relative z-10 transition-transform duration-300 group-hover:-translate-y-0.5 inline-block text-slate-700 group-hover:text-blue-600 font-extrabold">
                                    {link.name}
                                </span>

                                {/* Background Glow Pill */}
                                <span className="absolute inset-0 bg-gradient-to-tr from-blue-50 to-indigo-50/30 rounded-full scale-50 opacity-0 transition-all duration-500 group-hover:scale-110 group-hover:opacity-100 -z-0 blur-sm" />

                                {/* Subtle Bottom Border Line */}
                                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[3px] bg-blue-600 rounded-full transition-all duration-300 group-hover:w-4 opacity-0 group-hover:opacity-100" />
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
