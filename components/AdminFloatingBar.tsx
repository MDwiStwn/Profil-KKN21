'use client'
import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { LayoutDashboard, ExternalLink, LogOut, User, Menu, X, Home, BarChart3, Camera, MessageSquare, MapPin } from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'
import Image from 'next/image'

export default function AdminFloatingBar() {
    const [user, setUser] = useState<any>(null)
    const [isOpen, setIsOpen] = useState(false)
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
        <>
            {/* Desktop Floating Bar */}
            <div className="hidden md:block fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[95%] max-w-4xl animate-in fade-in slide-in-from-top-8 duration-700">
                <div className="bg-slate-900/90 backdrop-blur-2xl border border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.4)] rounded-[2.5rem] p-3 flex items-center justify-between gap-4">
                    {/* User Info */}
                    <div className="flex items-center gap-3 pl-3 pr-5 border-r border-white/10 shrink-0">
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
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition-all whitespace-nowrap ${pathname === '/admin' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/5'}`}
                        >
                            <LayoutDashboard size={16} />
                            DASHBOARD
                        </Link>

                        <div className="h-6 w-px bg-white/10 mx-0.5 shrink-0" />

                        <Link href="/" className="flex items-center gap-2 px-3 py-2.5 bg-white/5 text-gray-300 text-[11px] font-bold rounded-xl hover:bg-white/10 transition border border-white/5 whitespace-nowrap">
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
                        className="p-2.5 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm border border-red-500/20 group shrink-0"
                        title="Logout"
                    >
                        <LogOut size={18} className="transition-transform group-hover:translate-x-0.5" />
                    </button>
                </div>
            </div>

            {/* Mobile Sidebar Trigger (Hamburger) */}
            <div className="md:hidden fixed top-4 right-4 z-[110]">
                <button
                    onClick={() => setIsOpen(true)}
                    className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-2xl border border-white/10 active:scale-95 transition-transform"
                >
                    <Menu size={24} />
                </button>
            </div>

            {/* Mobile Sidebar Drawer Overlay */}
            <div className={`md:hidden fixed inset-0 z-[120] transition-all duration-500 ${isOpen ? 'visible' : 'invisible'}`}>
                {/* Backdrop */}
                <div
                    className={`absolute inset-0 bg-slate-950/60 backdrop-blur-md transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
                    onClick={() => setIsOpen(false)}
                />

                {/* Sidebar Panel */}
                <div className={`absolute top-0 left-0 w-[280px] h-full bg-slate-900 border-r border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] transition-transform duration-500 flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    {/* Header with Close */}
                    <div className="p-6 flex items-center justify-between border-b border-white/5">
                        <div className="flex flex-col">
                            <span className="text-white font-black tracking-tighter text-xl italic leading-none">
                                ADMIN<span className="text-blue-500">.</span>
                            </span>
                            <span className="text-[9px] font-bold text-blue-400/60 uppercase tracking-widest mt-1">Control Panel</span>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="w-10 h-10 bg-white/5 text-white rounded-xl flex items-center justify-center border border-white/10 active:bg-white/10 transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Profile Section */}
                    <div className="p-6 bg-gradient-to-br from-blue-600/10 to-transparent border-b border-white/5">
                        <div className="relative inline-block mb-4">
                            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-xl overflow-hidden border-2 border-blue-500/30">
                                {user.user_metadata?.avatar_url ? (
                                    <Image
                                        src={user.user_metadata.avatar_url}
                                        alt="Profile"
                                        width={64}
                                        height={64}
                                        className="object-cover"
                                    />
                                ) : (
                                    <User size={30} className="text-blue-600" />
                                )}
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-4 border-slate-900 rounded-full" />
                        </div>
                        <span className="block text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">Signed in as</span>
                        <span className="block text-lg text-white font-black tracking-tight truncate mb-0.5">
                            {user.email?.split('@')[0]}
                        </span>
                        <span className="block text-[11px] text-white/40 font-medium truncate">
                            {user.email}
                        </span>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-2 no-scrollbar">
                        <Link
                            href="/admin"
                            onClick={() => setIsOpen(false)}
                            className={`flex items-center gap-3 w-full p-4 rounded-2xl text-sm font-bold transition-all ${pathname === '/admin' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'text-gray-400 hover:bg-white/5'}`}
                        >
                            <LayoutDashboard size={20} />
                            Dashboard Utama
                        </Link>

                        <div className="h-px bg-white/5 my-4 mx-2" />

                        <span className="px-4 text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Navigasi Situs</span>

                        <div className="space-y-1">
                            {[
                                { name: 'Lihat Situs', href: '/', icon: Home },
                                { name: 'Dampak KKN', href: '/#stats', icon: BarChart3 },
                                { name: 'Kegiatan', href: '/#activities', icon: Camera },
                                { name: 'Testimoni', href: '/#guestbook', icon: MessageSquare },
                                { name: 'Lokasi', href: '/#map', icon: MapPin },
                            ].map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-3 w-full p-4 rounded-2xl text-sm font-bold text-gray-400 hover:bg-white/5 hover:text-white transition-all group"
                                >
                                    <link.icon size={20} className="group-hover:text-blue-500 transition-colors" />
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Footer / Logout */}
                    <div className="p-4 border-t border-white/5 bg-slate-950/20">
                        <button
                            onClick={handleLogout}
                            className="flex items-center justify-center gap-2 w-full p-4 bg-red-500/10 text-red-500 rounded-2xl text-sm font-bold hover:bg-red-500 hover:text-white transition-all active:scale-95"
                        >
                            <LogOut size={20} />
                            Konfirmasi Keluar
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
