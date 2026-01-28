'use client'
import { deleteActivity } from '@/app/admin/actions'
import Image from 'next/image'
import { Trash2, Calendar } from 'lucide-react'

interface Activity {
    id: string;
    title: string;
    description: string;
    image_url: string | null;
    event_date: string;
    created_at: string;
}

export default function ActivityList({ initialActivities }: { initialActivities: Activity[] }) {
    return (
        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            {initialActivities.map((activity) => (
                <div key={activity.id} className="flex gap-4 p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition group">
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                        {activity.image_url ? (
                            <Image
                                src={activity.image_url}
                                alt={activity.title}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">📷</div>
                        )}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                            <div>
                                <h4 className="font-bold text-gray-900 truncate">{activity.title}</h4>
                                <div className="flex items-center gap-1.5 text-xs text-blue-600 font-bold mb-1 uppercase tracking-wider">
                                    <Calendar size={12} />
                                    {new Date(activity.event_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                </div>
                            </div>
                            <button
                                onClick={() => { if (confirm('Hapus kegiatan ini?')) deleteActivity(activity.id) }}
                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                                title="Hapus"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                        <p className="text-xs text-gray-500 line-clamp-2">{activity.description}</p>
                    </div>
                </div>
            ))}
            {initialActivities.length === 0 && (
                <div className="text-center py-10 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                    <p className="text-gray-400 text-sm">Belum ada kegiatan.</p>
                </div>
            )}
        </div>
    )
}
