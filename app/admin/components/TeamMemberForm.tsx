'use client'
import { createTeamMember } from '@/app/admin/actions'
import { useActionState, useRef, useEffect } from 'react'
import { Loader2, Upload } from 'lucide-react'

const initialState = { success: false, message: '' }

export default function TeamMemberForm() {
    const [state, formAction, isPending] = useActionState(createTeamMember, initialState)
    const formRef = useRef<HTMLFormElement>(null)

    useEffect(() => {
        if (state.success && formRef.current) {
            formRef.current.reset()
        }
    }, [state])

    return (
        <form ref={formRef} action={formAction} className="space-y-4">
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Nama Lengkap</label>
                <input
                    name="name"
                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition"
                    required
                    placeholder="Contoh: Ahmad Sulaiman"
                />
                {state?.errors?.name && <p className="text-red-500 text-xs mt-1">{state.errors.name}</p>}
            </div>

            <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Jabatan / Peran</label>
                <input
                    name="role"
                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition"
                    required
                    placeholder="Contoh: Ketua Kelompok"
                />
                {state?.errors?.role && <p className="text-red-500 text-xs mt-1">{state.errors.role}</p>}
            </div>

            <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Foto Profil</label>
                <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 mb-2 text-gray-400" />
                            <p className="text-xs text-gray-500 text-center px-4">Pilih foto (JPG, PNG)</p>
                        </div>
                        <input name="image" type="file" accept="image/*" className="hidden" required />
                    </label>
                </div>
            </div>

            {state?.message && (
                <div className={`p-3 rounded-lg text-sm font-bold text-center ${state.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {state.message}
                </div>
            )}

            <button
                type="submit"
                disabled={isPending}
                className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 disabled:opacity-50 transition shadow-lg flex items-center justify-center gap-2"
            >
                {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                {isPending ? 'Menyimpan...' : 'Tambah Anggota'}
            </button>
        </form>
    )
}
