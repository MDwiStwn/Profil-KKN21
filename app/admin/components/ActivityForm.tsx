'use client'
import { createActivity } from '@/app/admin/actions'
import { useActionState, useRef, useEffect } from 'react'

const initialState = { success: false, message: '' }

export default function ActivityForm() {
    const [state, formAction, isPending] = useActionState(createActivity, initialState)
    const formRef = useRef<HTMLFormElement>(null)

    useEffect(() => {
        if (state.success && formRef.current) {
            formRef.current.reset()
        }
    }, [state])

    return (
        <form ref={formRef} action={formAction} className="space-y-5">
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Judul Kegiatan</label>
                <input
                    name="title"
                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition"
                    required
                    placeholder="Contoh: Sosialisasi Digital Marketing"
                />
                {state?.errors?.title && <p className="text-red-500 text-xs mt-1">{state.errors.title}</p>}
            </div>

            <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Tanggal Pelaksanaan</label>
                <input
                    name="event_date"
                    type="date"
                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition"
                    required
                />
                {state?.errors?.event_date && <p className="text-red-500 text-xs mt-1">{state.errors.event_date}</p>}
            </div>

            <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Deskripsi Singkat</label>
                <textarea
                    name="description"
                    className="w-full border border-gray-300 rounded-lg p-2.5 h-32 focus:ring-2 focus:ring-blue-500 outline-none transition"
                    required
                    placeholder="Deskripsikan kegiatan..."
                />
                {state?.errors?.description && <p className="text-red-500 text-xs mt-1">{state.errors.description}</p>}
            </div>

            <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Foto Dokumentasi (Opsional)</label>
                <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                            </svg>
                            <p className="text-xs text-gray-500">Klik untuk upload (JPG, PNG)</p>
                        </div>
                        <input name="image" type="file" accept="image/*" className="hidden" />
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
                className="w-full bg-blue-900 text-white font-bold py-3 rounded-xl hover:bg-blue-800 disabled:opacity-50 transition shadow-lg"
            >
                {isPending ? 'Menyimpan...' : 'Simpan Kegiatan'}
            </button>
        </form>
    )
}
