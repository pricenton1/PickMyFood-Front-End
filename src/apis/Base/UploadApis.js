import axios from "axios";

export const UploadApis = async (data) => {
    console.log("masukPost")
    let result = await axios.post(`https://api.cloudinary.com/v1_1/shomai/image/upload`,data
    )
    return result.data
}