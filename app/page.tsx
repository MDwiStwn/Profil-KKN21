import { createClient } from '@/utils/supabase/server'
import TestimonialForm from '@/components/TestimonialForm'
import Image from 'next/image'

export const revalidate = 60 // ISR: Revalidate every 60 seconds

export default async function Home() {
  const supabase = await createClient()

  // Fetch Data (Parallel) - Optimized
  const [{ data: activities }, { data: testimonials }] = await Promise.all([
    supabase.from('activities').select('*').order('event_date', { ascending: false }).limit(6),
    supabase.from('testimonials').select('*').eq('is_approved', true).order('created_at', { ascending: false }).limit(20)
  ])

  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* Gradient Background - In production use a real image */}
          <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900 via-gray-900 to-black opacity-80" />
          {/* Grid Pattern overlay */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
        </div>
        <div className="z-10 text-center px-4 max-w-5xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-block px-4 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm text-sm font-medium mb-6">
            KKN UM 2024
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
            KKN 21<br />Sukodadi
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            Membangun Desa, Memberdayakan Masyarakat.
            Sinergi mahasiswa dan warga untuk kemajuan Desa Sukodadi.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a href="#activities" className="px-8 py-4 bg-white text-gray-900 rounded-full font-bold hover:bg-gray-100 transition shadow-xl hover:shadow-2xl hover:-translate-y-1">
              Lihat Kegiatan
            </a>
            <a href="#guestbook" className="px-8 py-4 bg-transparent border border-white/30 text-white rounded-full font-bold hover:bg-white/10 transition backdrop-blur-sm">
              Tulis Pesan
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="container mx-auto px-4 -mt-32 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Program Kerja', value: '12+', icon: '🚀' },
            { label: 'Warga Terlibat', value: '500+', icon: '👥' },
            { label: 'Hari Pengabdian', value: '45', icon: '📅' },
          ].map((stat, i) => (
            <div key={i} className="bg-white/95 backdrop-blur-xl p-8 rounded-3xl shadow-2xl text-center border border-white/50 hover:scale-105 transition duration-300">
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-5xl font-black text-gray-900 mb-2 tracking-tight">{stat.value}</div>
              <div className="text-gray-500 font-medium uppercase tracking-wide text-sm">{stat.label}</div>
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
                    <p className="text-white/90 italic mb-4 text-lg">"{t.message}"</p>
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

      {/* Map Section */}
      <section id="map" className="container mx-auto px-4 scroll-mt-24">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Lokasi Pengabdian</h2>
          <p className="text-gray-600">Temukan kami di Desa Sukodadi.</p>
        </div>
        <div className="bg-gray-200 rounded-[2.5rem] overflow-hidden h-[500px] shadow-xl relative transform transition hover:scale-[1.01] duration-500">
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
