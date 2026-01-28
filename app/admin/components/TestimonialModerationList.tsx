'use client'
import { approveTestimonial, deleteTestimonial } from '@/app/admin/actions'

interface Testimonial {
    id: string;
    name: string;
    message: string;
    is_approved: boolean;
    ip_address: string;
    created_at: string;
}

export default function TestimonialModerationList({ initialTestimonials }: { initialTestimonials: Testimonial[] }) {
    return (
        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
            {initialTestimonials.map((t) => (
                <div key={t.id} className={`p-4 rounded-lg border shadow-sm transition-all ${t.is_approved ? 'bg-white border-gray-200 opacity-75 grayscale' : 'bg-white border-yellow-300 ring-4 ring-yellow-50/50'}`}>
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <span className="font-bold text-gray-900 block">{t.name}</span>
                            <span className="text-xs text-gray-500 font-mono">{t.ip_address} • {new Date(t.created_at).toLocaleString()}</span>
                        </div>
                        <span className={`px-2 py-0.5 text-[10px] uppercase font-bold rounded-full ${t.is_approved ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                            {t.is_approved ? 'Approved' : 'Pending'}
                        </span>
                    </div>
                    <p className="text-sm text-gray-800 mb-4 bg-gray-50 p-2 rounded border border-gray-100">{t.message}</p>
                    <div className="flex gap-2 justify-end">
                        {!t.is_approved && (
                            <button
                                onClick={() => approveTestimonial(t.id)}
                                className="px-4 py-2 bg-green-600 text-white text-xs font-bold rounded-lg hover:bg-green-700 shadow-sm"
                            >
                                TERIMA
                            </button>
                        )}
                        <button
                            onClick={() => { if (confirm('Hapus permanen?')) deleteTestimonial(t.id) }}
                            className="px-4 py-2 bg-red-100 text-red-700 text-xs font-bold rounded-lg hover:bg-red-200"
                        >
                            HAPUS
                        </button>
                    </div>
                </div>
            ))}
            {initialTestimonials.length === 0 && <p className="text-gray-500 text-sm text-center py-4">Tidak ada testimoni.</p>}
        </div>
    )
}
