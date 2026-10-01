'use server';

import { fetchApi } from '@/lib/api';
import { revalidatePath } from 'next/cache';

export async function createBerthAction(prevState: any, formData: FormData) {
  try {
    const payload = {
      name: formData.get('name'),
      portName: formData.get('portName'),
      maxCapacity: Number(formData.get('maxCapacity')),
      depth: Number(formData.get('depth')),
    };

    await fetchApi('/berths', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    revalidatePath('/dashboard/berths');
    return { success: true, message: 'Rıhtım başarıyla eklendi!' };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function dockShipAction(berthId: number, shipId: number) {
  try {
    await fetchApi(`/berths/${berthId}/dock`, {
      method: 'POST',
      body: JSON.stringify({ shipId }),
    });

    revalidatePath('/dashboard/berths');
    revalidatePath('/dashboard/ships'); // Gemiler sayfasını da güncelleyelim
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function undockShipAction(berthId: number, shipId: number) {
  try {
    await fetchApi(`/berths/${berthId}/undock`, {
      method: 'POST',
      body: JSON.stringify({ shipId }),
    });

    revalidatePath('/dashboard/berths');
    revalidatePath('/dashboard/ships');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
