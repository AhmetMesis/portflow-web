'use server';

import { fetchApi } from '@/lib/api';
import { revalidatePath } from 'next/cache';

export async function createDocumentAction(prevState: any, formData: FormData) {
  try {
    const shipId = formData.get('shipId');
    const cargoId = formData.get('cargoId');

    const payload: any = {
      title: formData.get('title'),
      type: formData.get('type'),
      fileUrl: formData.get('fileUrl'),
      expiresAt: formData.get('expiresAt') || undefined,
    };

    if (shipId) payload.shipId = Number(shipId);
    if (cargoId) payload.cargoId = Number(cargoId);

    await fetchApi('/documents', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    revalidatePath('/dashboard/documents');
    return { success: true, message: 'Belge başarıyla eklendi!' };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
