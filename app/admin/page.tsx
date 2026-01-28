import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import TestimonialModerationList from './components/TestimonialModerationList'
import ActivityForm from './components/ActivityForm'

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

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 border-b border-gray-200 pb-6 gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Admin Dashboard</h1>
                    <p className="text-gray-500 font-medium">Logged in as <span className="text-blue-600">{user.email}</span></p>
                </div>

                <form action={async () => {
                    'use server'
                    const sb = await createClient()
                    await sb.auth.signOut()
                    redirect('/login')
                }}>
                    <button className="text-red-600 hover:text-white text-sm font-bold border-2 border-red-100 px-6 py-2 rounded-xl bg-red-50 hover:bg-red-600 transition shadow-sm hover:shadow-md">
                        Logout
                    </button>
                </form>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Moderation Column */}
                <section className="bg-white p-8 rounded-[2rem] shadow-2xl shadow-blue-900/5 border border-white/50">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-700 text-2xl rotate-3 shadow-lg group-hover:rotate-6 transition">💬</div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 leading-none">Testimoni</h2>
                            <p className="text-gray-400 text-sm font-medium">Moderasi pesan warga</p>
                        </div>
                    </div>
                    <TestimonialModerationList initialTestimonials={testimonials || []} />
                </section>

                {/* CMS Column */}
                <section className="bg-white p-8 rounded-[2rem] shadow-2xl shadow-purple-900/5 border border-white/50 h-fit lg:sticky lg:top-24">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-700 text-2xl -rotate-3 shadow-lg">📝</div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 leading-none">Kegiatan Baru</h2>
                            <p className="text-gray-400 text-sm font-medium">Publikasi dokumentasi</p>
                        </div>
                    </div>
                    <ActivityForm />
                </section>
            </div>
        </div>
    )
}
