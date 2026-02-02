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
            <div className="mb-12">
                <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">Manajemen Konten</h1>
                <p className="text-gray-500 font-medium">Selamat datang, <span className="text-blue-600">{user.email}</span></p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {/* Testimonial Section */}
                <section className="bg-white p-10 rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.06)] border border-gray-50">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-14 h-14 bg-blue-50 rounded-[1.5rem] flex items-center justify-center text-blue-600 shadow-sm border border-blue-100">
                            <MessageSquare size={26} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-slate-900 leading-none mb-1">Moderasi Testimoni</h2>
                            <p className="text-gray-400 text-sm font-bold uppercase tracking-widest text-[10px]">Pesan dari warga</p>
                        </div>
                    </div>
                    <TestimonialModerationList initialTestimonials={testimonials || []} />
                </section>

                {/* Activity Management */}
                <div className="space-y-8">
                    <section className="bg-white p-10 rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.06)] border border-gray-50">
                        <div className="flex items-center gap-4 mb-10">
                            <div className="w-14 h-14 bg-purple-50 rounded-[1.5rem] flex items-center justify-center text-purple-600 shadow-sm border border-purple-100">
                                <PenTool size={26} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-slate-900 leading-none mb-1">Tambah Dokumentasi</h2>
                                <p className="text-gray-400 text-sm font-bold uppercase tracking-widest text-[10px]">Publikasi kegiatan baru</p>
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
