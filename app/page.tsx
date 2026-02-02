import { createClient } from '@/utils/supabase/server'
import TestimonialForm from '@/components/TestimonialForm'
import Image from 'next/image'

export const revalidate = 60 // ISR: Revalidate every 60 seconds

import Beams from '@/components/Beams/Beams'

export default async function Home() {
  const supabase = await createClient()

  // Fetch Data (Parallel) - Optimized
  const [{ data: activities }, { data: testimonials }, { data: teamMembers }] = await Promise.all([
    supabase.from('activities').select('*').order('event_date', { ascending: false }).limit(6),
    supabase.from('testimonials').select('*').eq('is_approved', true).order('created_at', { ascending: false }).limit(20),
    supabase.from('team_members').select('*').order('created_at', { ascending: true })
  ])

  return (
    <div className="flex flex-col gap-32 pb-32 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-50/50 via-white to-white">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center bg-[#020617] text-white overflow-hidden rounded-b-[4rem] shadow-2xl">
        <div className="absolute inset-0 z-0">
          {/* Enhanced Mesh Gradient */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_#1e3a8a_0%,_transparent_50%),radial-gradient(circle_at_70%_70%,_#1e1b4b_0%,_transparent_50%)] opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020617]/50 to-[#020617]" />

          {/* Animated Glows */}
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] animate-pulse delay-700" />

          {/* Grain overlay */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-soft-light"></div>
        </div>

        <div className="z-10 text-center px-4 max-w-5xl animate-in fade-in zoom-in duration-1000">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl text-xs font-black uppercase tracking-[0.2em] mb-8 text-blue-300">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-ping" />
            KKN UNMER 2026
          </div>
          <h1 className="text-7xl md:text-9xl font-black mb-8 tracking-tighter leading-none bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/40 italic">
            KKN 21<br />Sukodadi
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
            Membangun Desa, Memberdayakan Masyarakat.<br className="hidden md:block" />
            Sinergi mahasiswa dan warga untuk kemajuan Desa Sukodadi.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <a href="#activities" className="group px-10 py-5 bg-white text-gray-900 rounded-full font-black text-sm hover:bg-gray-100 transition shadow-[0_20px_50px_-10px_rgba(255,255,255,0.3)] hover:-translate-y-1 flex items-center justify-center gap-2">
              JELAJAHI KEGIATAN
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
            <a href="#guestbook" className="px-10 py-5 bg-white/5 border border-white/10 text-white rounded-full font-black text-sm hover:bg-white/10 transition backdrop-blur-md">
              TULIS PESAN
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-white rounded-full" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="container mx-auto px-4 -mt-32 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Program Kerja', value: '6', icon: '🚀' },
            { label: 'Warga Terlibat', value: '100+', icon: '👥' },
            {
              label: 'Hari Pengabdian',
              value: (() => {
                // Logic: Start 10, +1 every day, max 30.
                // Anchor date: Jan 28, 2026 (Today) implies 10.
                const startDate = new Date('2026-01-28T00:00:00+07:00'); // WIB
                const now = new Date();
                // Calculate difference in days
                const diffTime = now.getTime() - startDate.getTime();
                const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

                // If diffDays < 0 (before start date), stick to 10.
                const additionalDays = diffDays < 0 ? 0 : diffDays;

                const totalDays = 10 + additionalDays;
                return Math.min(totalDays, 30).toString();
              })(),
              icon: '📅'
            },
          ].map((stat, i) => (
            <div key={i} className="group bg-white p-10 rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] text-center border border-gray-100 hover:shadow-[0_48px_80px_-16px_rgba(59,130,246,0.12)] transition-all duration-500 hover:-translate-y-2">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-500">{stat.icon}</div>
              <div className="text-6xl font-black text-slate-900 mb-2 tracking-tighter">{stat.value}</div>
              <div className="text-blue-600 font-bold uppercase tracking-[0.2em] text-[10px]">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Activity Feed */}
      <section id="activities" className="container mx-auto px-4 scroll-mt-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-4xl font-bold mb-4 tracking-tight text-gray-900">Jurnal Kegiatan</h2>
            <p className="text-lg text-gray-600 max-w-xl">Dokumentasi visual perjalanan pengabdian kami. Setiap momen memiliki cerita.</p>
          </div>
          <button className="text-blue-600 font-bold hover:underline">Lihat Semua Galeri &toea;</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities?.map((activity) => (
            <div key={activity.id} className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 border border-gray-100 flex flex-col h-full hover:-translate-y-2">
              <div className="relative h-64 bg-gray-200 overflow-hidden">
                {activity.image_url ? (
                  <Image
                    src={activity.image_url}
                    alt={activity.title}
                    fill
                    className="object-cover group-hover:scale-110 transition duration-700 ease-in-out"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 bg-gray-100">
                    <span className="text-4xl mb-2">📷</span>
                    <span className="text-sm">No Image Available</span>
                  </div>
                )}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold text-gray-900 shadow-sm border border-white/50">
                  {new Date(activity.event_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long' })}
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition">{activity.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">{activity.description}</p>
                <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between text-xs font-medium text-gray-400">
                  <span>KKN 21 Sukodadi</span>
                  <span>{new Date(activity.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
          {(!activities || activities.length === 0) && (
            <div className="col-span-full text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
              <p className="text-gray-500 text-lg">Belum ada kegiatan yang diunggah.</p>
            </div>
          )}
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="container mx-auto px-4 scroll-mt-24 text-center">
        <div className="mb-16">
          <h2 className="text-5xl font-black text-gray-900 mb-4 tracking-tighter">Tim Kami</h2>
          <div className="w-20 h-1.5 bg-blue-600 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">Wajah-wajah di balik pengabdian KKN 21 Sukodadi.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-10">
          {teamMembers?.map((member) => (
            <div key={member.id} className="group text-center">
              <div className="relative aspect-square mb-6 rounded-[2.5rem] overflow-hidden shadow-xl ring-4 ring-white group-hover:ring-blue-100 transition-all duration-500 group-hover:scale-[1.02]">
                {member.image_url ? (
                  <Image
                    src={member.image_url}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-110 transition duration-700"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center text-4xl">👤</div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-1 tracking-tight">{member.name}</h4>
              <p className="text-blue-600 font-bold text-sm uppercase tracking-widest">{member.role}</p>
            </div>
          ))}
          {(!teamMembers || teamMembers.length === 0) && (
            <div className="col-span-full text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-100">
              <p className="text-gray-400">Daftar tim akan segera diperbarui.</p>
            </div>
          )}
        </div>
      </section>

      {/* Guestbook Section */}
      <section id="guestbook" className="container mx-auto px-4 scroll-mt-24">
        <div className="bg-blue-600 rounded-[2.5rem] p-8 md:p-16 text-white shadow-2xl relative overflow-hidden">
          {/* Background Circles */}
          <div className="absolute top-0 right-0 -transtale-y-1/2 translate-x-1/2 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute bottom-0 left-0 transtale-y-1/2 -translate-x-1/2 w-64 h-64 bg-indigo-500 rounded-full blur-3xl opacity-50"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="mb-10">
                <span className="inline-block py-1 px-3 rounded-full bg-white/20 border border-white/20 text-xs font-bold mb-4 backdrop-blur-sm">Buku Tamu</span>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">Suara Warga Sukodadi</h2>
                <p className="text-blue-100 text-lg leading-relaxed">
                  Kami sangat menghargai setiap masukan dan cerita dari warga.
                  Sampaikan pesan, kesan, atau saran untuk KKN 21.
                </p>
              </div>

              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-4 custom-scrollbar-light">
                {testimonials?.map((t) => (
                  <div key={t.id} className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:bg-white/15 transition">
                    <p className="text-white/90 italic mb-4 text-lg">&quot;{t.message}&quot;</p>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-white text-blue-600 flex items-center justify-center font-bold text-lg shrink-0 shadow-lg">
                        {t.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-bold text-white">{t.name}</div>
                        <div className="text-xs text-blue-200">{new Date(t.created_at).toLocaleDateString('id-ID', { dateStyle: 'long' })}</div>
                      </div>
                    </div>
                  </div>
                ))}
                {(!testimonials || testimonials.length === 0) && (
                  <div className="p-8 bg-white/5 rounded-2xl border border-white/10 text-center">
                    <p className="text-blue-200">Belum ada testimoni. Jadilah yang pertama!</p>
                  </div>
                )}
              </div>
            </div>

            <div className="text-gray-900">
              <TestimonialForm />
            </div>
          </div>
        </div>
      </section>

      {/* Collaboration Section (Beams) */}
      <section className="container mx-auto px-4">
        <div className="relative bg-[#020617] rounded-[4rem] overflow-hidden min-h-[600px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] flex items-center justify-center text-center p-8 md:p-24 border border-white/5">
          {/* Enhanced Mesh Gradient Background */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,_#1e40af_0%,_transparent_40%),radial-gradient(circle_at_80%_70%,_#4c1d95_0%,_transparent_40%)] opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#020617] via-transparent to-[#020617] opacity-80" />

            {/* Animated Beams Background */}
            <div className="absolute inset-0 opacity-40 mix-blend-screen">
              <Beams
                beamWidth={3}
                beamHeight={40}
                beamNumber={15}
                lightColor="#3b82f6"
                speed={0.8}
                noiseIntensity={1.5}
                scale={0.4}
                rotation={15}
              />
            </div>

            {/* Floating Glows */}
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] animate-pulse delay-1000" />
          </div>

          {/* Grain overlay */}
          <div className="absolute inset-0 z-1 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>

          <div className="relative z-10 max-w-4xl space-y-10">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-2xl text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">
              Prakarsa Bersama
            </div>

            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none italic bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/30">
              Ayo Berkolaborasi<br />Bersama Kami
            </h2>

            <p className="text-gray-400 text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto">
              KKN 21 Sukodadi berkomitmen memberikan dampak nyata bagi masyarakat.
              Mari bersama-sama membangun desa yang lebih baik.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-6">
              <a href="#guestbook" className="group px-12 py-6 bg-white text-slate-900 rounded-full font-black text-sm transition-all hover:bg-blue-50 hover:-translate-y-1 shadow-[0_20px_50px_-10px_rgba(255,255,255,0.2)] flex items-center justify-center gap-3">
                TULIS PESAN WARGA
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
              <a href="https://instagram.com/kkn21_sukodadi" target="_blank" className="px-12 py-6 bg-white/5 border border-white/10 text-white rounded-full font-black text-sm hover:bg-white/10 transition-all backdrop-blur-xl border-white/20">
                IKUTI INSTAGRAM
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section id="map" className="container mx-auto px-4 scroll-mt-24">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tighter leading-none">Lokasi Pengabdian</h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full mb-4"></div>
          <p className="text-gray-500 font-medium">Temukan posko kami di Desa Sukodadi, Wagir.</p>
        </div>
        <div className="bg-gray-200 rounded-[3rem] overflow-hidden h-[500px] shadow-2xl relative border border-gray-100 transform transition hover:scale-[1.01] duration-500">
          <iframe
            width="100%"
            height="100%"
            frameBorder="0"
            title="Peta Desa Sukodadi"
            scrolling="no"
            marginHeight={0}
            marginWidth={0}
            src="https://maps.google.com/maps?q=Desa%20Sukodadi%2C%20Kec.%20Wagir%2C%20Malang&t=&z=13&ie=UTF8&iwloc=&output=embed"
            className="filter grayscale-[20%] contrast-[1.1] w-full h-full"
          ></iframe>
        </div>
      </section>
    </div>
  )
}
