import { z } from 'zod';

export const testimonialSchema = z.object({
    name: z.string()
        .min(2, "Nama minimal 2 karakter")
        .max(50, "Nama maksimal 50 karakter")
        .regex(/^[a-zA-Z0-9\s]*$/, "Nama hanya boleh mengandung huruf dan angka"), // Anti-XSS: Limit special chars
    message: z.string()
        .min(5, "Pesan minimal 5 karakter")
        .max(500, "Pesan maksimal 500 karakter"),
});

export const activitySchema = z.object({
    title: z.string().min(5, "Judul minimal 5 karakter"),
    description: z.string().min(10, "Deskripsi minimal 10 karakter"),
    event_date: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid date format",
    }),
});
