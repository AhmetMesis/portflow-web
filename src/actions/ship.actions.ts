'use server';

import { fetchApi } from '@/lib/api';
import { revalidatePath } from 'next/cache';

export async function createShipAction(prevState: any, formData: FormData) {
  try {
    const payload = {
      name: formData.get('name'),
      imoNumber: formData.get('imoNumber'),
      flag: formData.get('flag'),
      type: formData.get('type'),
      grossTonnage: Number(formData.get('grossTonnage')),
      length: Number(formData.get('length')),
    };

    await fetchApi('/ships', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    // Başarılı olduğunda, Next.js'e "/dashboard/ships" sayfasındaki verilerin (cache) bayatladığını bildir.
    // Böylece sayfayı yenilemeye gerek kalmadan arkaplanda veriyi tekrar çeker (Revalidation).
    revalidatePath('/dashboard/ships'); 
    
    return { success: true, message: 'Gemi başarıyla eklendi!' };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
