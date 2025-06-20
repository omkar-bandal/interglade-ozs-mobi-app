import {supabase} from '@lib/supabase/supabase';

export const checkUploadLimit = (
  currentPhotos: string[],
  newFilesCount: number,
) => {
  return currentPhotos.length + newFilesCount > 3;
};

export const uploadFile = async (file: File) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random()
    .toString(36)
    .substring(2)}_${Date.now()}.${fileExt}`;
  const filePath = `${fileName}`;

  console.log('Uploading file:', filePath);

  const {data, error} = await supabase.storage
    .from('service_photos')
    .upload(filePath, file, {
      upsert: false,
    });

  if (error) {
    console.error('Error uploading file:', error);
    throw error;
  }

  if (data) {
    console.log('File uploaded successfully:', data);
    const {
      data: {publicUrl},
    } = supabase.storage.from('service_photos').getPublicUrl(filePath);

    return publicUrl;
  }

  return null;
};
