'use server'

import { v2 as cloud } from 'cloudinary'
import streamifier from 'streamifier'

cloud.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

const uploadFiletoCloud = async (file, options) => {
  if (file.size <= 0) return

  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  return new Promise((resolve, reject) => {
    const stream = cloud.uploader.upload_stream(options, (error, result) => {
      if (error) reject(error.message)
      resolve(result)
    })
    streamifier.createReadStream(buffer).pipe(stream)
  })
}

export const uploadImageAction = async (formData) => {
  try {
    const file = formData.get('file')
    const type = formData.get('type')
    const id = formData.get('id')

    if (file instanceof File) {
      const result = await uploadFiletoCloud(file, {
        asset_folder: `metarch/${type}`,
        public_id: id,
      })

      return { url: result.secure_url }
    }

    return { error: 'Invalid file' }
  } catch (err) {
    console.error('Upload Error:', err)
    return { error: err.message }
  }
}
