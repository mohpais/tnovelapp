import Rest from "@/global/rest"; // Import from Global Packages
import helpers from "@/global/helpers"; // Import from Global Packages
const rest = new Rest().Api(); // Creating a Rest instance
const { get, post, put, bin, del, upload, file, downloadFile } = rest; // Function: get, post, put, bin, del, upload, file, downloadFile

export const DoLogin = async (payload) => {
    try {
        return await post(`auth/login`, payload);
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};
