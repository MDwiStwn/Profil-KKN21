import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import TestimonialModerationList from './components/TestimonialModerationList'
import ActivityForm from './components/ActivityForm'
import TeamMemberForm from './components/TeamMemberForm'
import TeamList from './components/TeamList'
import ActivityList from './components/ActivityList'
import Link from 'next/link'
import { ExternalLink, LayoutDashboard, MessageSquare, Users, PenTool } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    const { data: testimonials } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false })

    const { data: teamMembers } = await supabase
        .from('team_members')
        .select('*')
        .order('created_at', { ascending: false })

    const { data: activities } = await supabase
        .from('activities')
        .select('*')
        .order('event_date', { ascending: false })

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            {/* Navigation Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-blue-200 shadow-xl">
                        <LayoutDashboard size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-gray-900 tracking-tight leading-none mb-1">KKN 21 Dashboard</h1>
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">{user.email}</p>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <Link href="/" className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-600 text-sm font-bold rounded-xl hover:bg-gray-100 transition border border-gray-200">
                        <ExternalLink size={16} />
                        Lihat Website
                    </Link>
                    <Link href="/#stats" className="px-4 py-2 bg-blue-50 text-blue-600 text-sm font-bold rounded-xl hover:bg-blue-100 transition border border-blue-100">Dampak</Link>
                    <Link href="/#activities" className="px-4 py-2 bg-blue-50 text-blue-600 text-sm font-bold rounded-xl hover:bg-blue-100 transition border border-blue-100">Kegiatan</Link>
                    <Link href="/#guestbook" className="px-4 py-2 bg-blue-50 text-blue-600 text-sm font-bold rounded-xl hover:bg-blue-100 transition border border-blue-100">Testimoni</Link>
                    <Link href="/#map" className="px-4 py-2 bg-blue-50 text-blue-600 text-sm font-bold rounded-xl hover:bg-blue-100 transition border border-blue-100">Lokasi</Link>

                    <form action={async () => {
                        'use server'
                        const sb = await createClient()
                        await sb.auth.signOut()
                        redirect('/login')
                    }}>
                        <button className="px-5 py-2 bg-red-600 text-white text-sm font-bold rounded-xl hover:bg-red-700 transition shadow-lg shadow-red-200">
                            Logout
                        </button>
                    </form>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {/* Testimonial Section */}
                <section className="bg-white p-8 rounded-[2rem] shadow-2xl shadow-blue-900/5 border border-white/50">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-700 rotate-3 shadow-lg">
                            <MessageSquare size={24} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 leading-none">Testimoni</h2>
                            <p className="text-gray-400 text-sm font-medium">Moderasi pesan warga</p>
                        </div>
                    </div>
                    <TestimonialModerationList initialTestimonials={testimonials || []} />
                </section>

                {/* Activity Management */}
                <div className="space-y-8">
                    <section className="bg-white p-8 rounded-[2rem] shadow-2xl shadow-purple-900/5 border border-white/50">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-700 -rotate-3 shadow-lg">
                                <PenTool size={24} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 leading-none">Tambah Kegiatan</h2>
                                <p className="text-gray-400 text-sm font-medium">Input dokumentasi baru</p>
                            </div>
                        </div>
                        <ActivityForm />
                    </section>

                    <section className="bg-white p-8 rounded-[2rem] shadow-2xl shadow-purple-900/5 border border-white/50">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 shadow-sm border border-purple-100">
                                <LayoutDashboard size={20} />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900 leading-none">Daftar Kegiatan</h2>
                        </div>
                        <ActivityList initialActivities={activities || []} />
                    </section>
                </div>
            </div>

            <hr className="my-12 border-gray-100" />

            {/* Team Management Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <section className="bg-white p-8 rounded-[2rem] shadow-2xl shadow-emerald-900/5 border border-white/50">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-700 text-2xl rotate-2 shadow-lg">👥</div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 leading-none">Tim Kami</h2>
                            <p className="text-gray-400 text-sm font-medium">Kelola anggota kelompok</p>
                        </div>
                    </div>
                    <TeamList initialMembers={teamMembers || []} />
                </section>

                <section className="bg-white p-8 rounded-[2rem] shadow-2xl shadow-emerald-900/5 border border-white/50 h-fit">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-700 text-2xl -rotate-2 shadow-lg">➕</div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 leading-none">Tambah Anggota</h2>
                            <p className="text-gray-400 text-sm font-medium">Input data anggota baru</p>
                        </div>
                    </div>
                    <TeamMemberForm />
                </section>
            </div>
        </div>
    )
}
