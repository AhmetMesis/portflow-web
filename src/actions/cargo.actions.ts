'use server';

import { fetchApi } from '@/lib/api';
import { revalidatePath } from 'next/cache';

export async function createCargoAction(prevState: any, formData: FormData) {
  try {
    const payload = {
      description: formData.get('description'),
      weight: Number(formData.get('weight')),
      type: formData.get('type'),
      shipId: Number(formData.get('shipId')),
    };

    await fetchApi('/cargo', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    revalidatePath('/dashboard/cargo');
    return { success: true, message: 'Yük başarıyla eklendi!' };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
