'use server';

import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  company: z.string().optional(),
  products: z.string().optional(),
  quantity: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export type ContactState = {
  success?: boolean;
  error?: string;
  fieldErrors?: Record<string, string[]>;
};

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const raw = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    company: formData.get('company') as string,
    products: formData.get('products') as string,
    quantity: formData.get('quantity') as string,
    message: formData.get('message') as string,
  };

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string[]> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as string;
      if (!fieldErrors[key]) fieldErrors[key] = [];
      fieldErrors[key].push(issue.message);
    }
    return { fieldErrors };
  }

  try {
    // Log for now — swap with Prisma when DB is available
    console.log('[Lead]', JSON.stringify(parsed.data, null, 2));
    return { success: true };
  } catch (err) {
    console.error('[Lead Error]', err);
    return { error: 'Failed to submit. Please try again.' };
  }
}
