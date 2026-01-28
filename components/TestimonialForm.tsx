'use client'

import { useActionState } from 'react'
import { submitTestimonial } from '@/app/actions'

interface ActionState {
    success: boolean;
    message: string;
    errors?: {
        name?: string[];
        message?: string[];
    };
}

const initialState: ActionState = { success: false, message: '' }

export default function TestimonialForm() {
    const [state, formAction, isPending] = useActionState(submitTestimonial, initialState)

    return (
        <form action={formAction} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 mt-8">
            <h3 className="text-xl font-bold mb-6 text-gray-800">Tulis Pesan untuk KKN 21</h3>

            <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nama</label>
                <input
                    name="name"
                    type="text"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    required
                    placeholder="Nama Anda"
                    minLength={2}
                    maxLength={50}
                />
                {state?.errors?.name && <p className="text-red-500 text-xs mt-1">{state.errors.name[0]}</p>}
            </div>

            <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Pesan</label>
                <textarea
                    name="message"
                    className="w-full border border-gray-300 rounded-lg p-3 h-32 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
                    required
                    placeholder="Tulis pesan atau kesan..."
                    minLength={5}
                    maxLength={500}
                />
                {state?.errors?.message && <p className="text-red-500 text-xs mt-1">{state.errors.message[0]}</p>}
            </div>

            {state?.message && (
                <div className={`p-4 rounded-lg mb-6 text-sm ${state.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    {state.message}
                </div>
            )}

            <button
                type="submit"
                disabled={isPending}
                className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 disabled:bg-blue-300 transition-transform active:scale-95 shadow-md"
            >
                {isPending ? 'Mengirim...' : 'Kirim Pesan'}
            </button>
            <p className="text-center text-xs text-gray-400 mt-4">
                Pesan akan dimoderasi sebelum ditampilkan.
            </p>
        </form>
    )
}
