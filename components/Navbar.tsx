import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'

export default async function Navbar() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    return (
        <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="font-bold text-xl text-blue-600 tracking-tight">
                    KKN 21 Sukodadi
                </Link>
                {!user && (
                    <div className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
                        <Link href="/#stats" className="hover:text-blue-600 transition-colors">Dampak</Link>
                        <Link href="/#activities" className="hover:text-blue-600 transition-colors">Kegiatan</Link>
                        <Link href="/#guestbook" className="hover:text-blue-600 transition-colors">Testimoni</Link>
                        <Link href="/#map" className="hover:text-blue-600 transition-colors">Lokasi</Link>
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
