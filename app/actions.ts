'use server'

import { createClient } from '@/utils/supabase/server'
import { createAdminClient } from '@/utils/supabase/admin'
import { testimonialSchema } from '@/lib/schemas'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'

export async function submitTestimonial(prevState: unknown, formData: FormData) {
    const supabase = await createClient()

    // 1. Validate Input (Zod)
    const rawData = {
        name: formData.get('name'),
        message: formData.get('message'),
    }

    const validated = testimonialSchema.safeParse(rawData)

    if (!validated.success) {
        return {
            success: false,
            message: "Validasi gagal",
            errors: validated.error.flatten().fieldErrors,
        }
    }

    // 2. Rate Limiting (Using Service Role to count hidden submissions)
    const headersList = await headers()
    const ip = headersList.get('x-forwarded-for') || 'unknown'

    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString()

    const adminDb = createAdminClient()
    const { count, error: countError } = await adminDb
        .from('testimonials')
        .select('*', { count: 'exact', head: true })
        .eq('ip_address', ip)
        .gt('created_at', oneHourAgo)

    if (countError) {
        console.error("Rate limit check failed", countError)
        // Fail open or closed? Open for now but log it.
    }

    if (count && count >= 3) {
        return { success: false, message: "Terlalu banyak pengiriman pesan. Silakan coba lagi nanti." }
    }

    // 3. Insert Data
    const { error } = await supabase.from('testimonials').insert({
        name: validated.data.name,
        message: validated.data.message,
        ip_address: ip,
        is_approved: false
    })

    if (error) {
        console.error("Insert error", error)
        return { success: false, message: "Gagal menyimpan data ke database." }
    }

    revalidatePath('/')
    return { success: true, message: "Terima kasih! Pesan Anda telah diterima dan menunggu moderasi." }
}
