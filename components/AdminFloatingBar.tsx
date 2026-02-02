'use client'
import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { LayoutDashboard, ExternalLink, LogOut, User } from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'
import Image from 'next/image'

export default function AdminFloatingBar() {
    const [user, setUser] = useState<any>(null)
    const supabase = createClient()
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            setUser(user)
        }
        getUser()

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null)
        })

        return () => subscription.unsubscribe()
    }, [supabase])

    if (!user) return null

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.push('/login')
        router.refresh()
    }

    return (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[95%] max-w-4xl animate-in fade-in slide-in-from-top-8 duration-700">
            <div className="bg-slate-900/90 backdrop-blur-2xl border border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.4)] rounded-[2.5rem] p-3 flex items-center justify-between gap-4">
                {/* User Info */}
                <div className="hidden lg:flex items-center gap-3 pl-3 pr-5 border-r border-white/10 shrink-0">
                    <div className="w-11 h-11 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-xl overflow-hidden border border-white/20">
                        {user.user_metadata?.avatar_url ? (
                            <Image
                                src={user.user_metadata.avatar_url}
                                alt="Profile"
                                width={44}
                                height={44}
                                className="object-cover"
                            />
                        ) : (
                            <User size={20} />
                        )}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest leading-none mb-1">Authenticated</span>
                        <span className="text-sm text-white font-black tracking-tight truncate max-w-[120px]">
                            {user.email?.split('@')[0]}
                        </span>
                    </div>
                </div>

                {/* Main Nav */}
                <div className="flex flex-1 items-center gap-1.5 overflow-x-visible py-1 pr-2">
                    <Link
                        href="/admin"
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition-all whitespace-nowrap ${pathname === '/admin' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-100'}`}
                    >
                        <LayoutDashboard size={16} />
                        DASHBOARD
                    </Link>

                    <div className="h-6 w-px bg-white/10 mx-0.5 hidden md:block shrink-0" />

                    <Link href="/" className="flex items-center gap-2 px-3 py-2.5 bg-white text-gray-600 text-[11px] font-bold rounded-xl hover:bg-gray-50 transition border border-gray-100 whitespace-nowrap">
                        <ExternalLink size={14} />
                        SITUS
                    </Link>

                    <Link href="/#stats" className="px-3 py-2.5 bg-blue-50/10 text-blue-400 text-[11px] font-bold rounded-xl hover:bg-blue-500 hover:text-white transition whitespace-nowrap border border-white/5">DAMPAK</Link>
                    <Link href="/#activities" className="px-3 py-2.5 bg-blue-50/10 text-blue-400 text-[11px] font-bold rounded-xl hover:bg-blue-500 hover:text-white transition whitespace-nowrap border border-white/5">KEGIATAN</Link>
                    <Link href="/#guestbook" className="px-3 py-2.5 bg-blue-50/10 text-blue-400 text-[11px] font-bold rounded-xl hover:bg-blue-500 hover:text-white transition whitespace-nowrap border border-white/5">TESTIMONI</Link>
                    <Link href="/#map" className="px-3 py-2.5 bg-blue-50/10 text-blue-400 text-[11px] font-bold rounded-xl hover:bg-blue-500 hover:text-white transition whitespace-nowrap border border-white/5">LOKASI</Link>
                </div>

                {/* Logout */}
                <button
                    onClick={handleLogout}
                    className="p-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm border border-red-100 group"
                    title="Logout"
                >
                    <LogOut size={18} className="transition-transform group-hover:translate-x-0.5" />
                </button>
            </div>
        </div>
    )
}
