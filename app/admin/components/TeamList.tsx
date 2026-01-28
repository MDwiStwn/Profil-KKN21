'use client'
import { deleteTeamMember } from '@/app/admin/actions'
import Image from 'next/image'
import { Trash2 } from 'lucide-react'

interface TeamMember {
    id: string;
    name: string;
    role: string;
    image_url: string;
    created_at: string;
}

export default function TeamList({ initialMembers }: { initialMembers: TeamMember[] }) {
    return (
        <div className="grid grid-cols-1 gap-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            {initialMembers.map((member) => (
                <div key={member.id} className="flex items-center gap-4 p-3 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition">
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                        {member.image_url ? (
                            <Image
                                src={member.image_url}
                                alt={member.name}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">👤</div>
                        )}
                    </div>
                    <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-gray-900 truncate">{member.name}</h4>
                        <p className="text-xs text-gray-500 font-medium truncate">{member.role}</p>
                    </div>
                    <button
                        onClick={() => { if (confirm('Hapus anggota ini?')) deleteTeamMember(member.id) }}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                        title="Hapus"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            ))}
            {initialMembers.length === 0 && (
                <div className="text-center py-10 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                    <p className="text-gray-400 text-sm">Belum ada anggota tim.</p>
                </div>
            )}
        </div>
    )
}
