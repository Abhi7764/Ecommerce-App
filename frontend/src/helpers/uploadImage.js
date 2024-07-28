
const uploadImage = async (image) => {
    const formData = new FormData();
    formData.append('file', image);
    formData.append("upload_preset", "Ecommerce-App")

    const cloudName = import.meta.env.VITE_CLOUD_NAME;
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    const dataResponse = await fetch(url, {
        method: 'POST',
        body: formData,
    })
    return await dataResponse.json()
}

export default uploadImage