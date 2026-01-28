'use server'
import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { activitySchema } from '@/lib/schemas'

export async function approveTestimonial(id: string) {
    const supabase = await createClient()
    // Auth check is done by middleware + RLS (user must be authenticated)
    await supabase.from('testimonials').update({ is_approved: true }).eq('id', id)
    revalidatePath('/admin')
    revalidatePath('/')
}

export async function deleteTestimonial(id: string) {
    const supabase = await createClient()
    await supabase.from('testimonials').delete().eq('id', id)
    revalidatePath('/admin')
    revalidatePath('/')
}

export async function createActivity(prevState: any, formData: FormData) {
    const supabase = await createClient()

    // Image Upload
    const imageFile = formData.get('image') as File
    let imageUrl = null

    if (imageFile && imageFile.size > 0) {
        // Validate file type/size if needed
        const filename = `${Date.now()}-${imageFile.name.replace(/[^a-zA-Z0-9.-]/g, '')}`
        const { data, error } = await supabase.storage
            .from('activity-photos')
            .upload(filename, imageFile)

        if (error) {
            console.error('Upload error', error)
            return { success: false, message: 'Upload foto gagal' }
        }

        if (data) {
            const { data: { publicUrl } } = supabase.storage.from('activity-photos').getPublicUrl(data.path)
            imageUrl = publicUrl
        }
    }

    const rawData = {
        title: formData.get('title'),
        description: formData.get('description'),
        event_date: formData.get('event_date')
    }

    const validated = activitySchema.safeParse(rawData)
    if (!validated.success) {
        return { success: false, errors: validated.error.flatten().fieldErrors }
    }

    const { error } = await supabase.from('activities').insert({
        ...validated.data,
        image_url: imageUrl
    })

    if (error) {
        console.error('Insert error', error)
        return { success: false, message: "Gagal menyimpan kegiatan" }
    }

    revalidatePath('/')
    revalidatePath('/admin')
    return { success: true, message: "Kegiatan berhasil ditambahkan" }
}
