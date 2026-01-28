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

export async function deleteActivity(id: string) {
    const supabase = await createClient()
    await supabase.from('activities').delete().eq('id', id)
    revalidatePath('/admin')
    revalidatePath('/')
}

export async function createActivity(prevState: unknown, formData: FormData) {
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

export async function deleteTeamMember(id: string) {
    const supabase = await createClient()
    await supabase.from('team_members').delete().eq('id', id)
    revalidatePath('/admin')
    revalidatePath('/')
}

export async function createTeamMember(prevState: unknown, formData: FormData) {
    const supabase = await createClient()

    // Image Upload
    const imageFile = formData.get('image') as File
    let imageUrl = null

    if (imageFile && imageFile.size > 0) {
        const filename = `team-${Date.now()}-${imageFile.name.replace(/[^a-zA-Z0-9.-]/g, '')}`
        const { data, error } = await supabase.storage
            .from('team-photos')
            .upload(filename, imageFile)

        if (error) {
            console.error('Upload error', error)
            return { success: false, message: 'Upload foto gagal' }
        }

        if (data) {
            const { data: { publicUrl } } = supabase.storage.from('team-photos').getPublicUrl(data.path)
            imageUrl = publicUrl
        }
    }

    const rawData = {
        name: formData.get('name'),
        role: formData.get('role'),
    }

    const { teamMemberSchema } = await import('@/lib/schemas')
    const validated = teamMemberSchema.safeParse(rawData)
    if (!validated.success) {
        return { success: false, errors: validated.error.flatten().fieldErrors }
    }

    const { error } = await supabase.from('team_members').insert({
        ...validated.data,
        image_url: imageUrl
    })

    if (error) {
        console.error('Insert error', error)
        return { success: false, message: "Gagal menyimpan anggota tim" }
    }

    revalidatePath('/')
    revalidatePath('/admin')
    return { success: true, message: "Anggota tim berhasil ditambahkan" }
}
