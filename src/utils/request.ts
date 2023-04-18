import { API_URL, BASE_PARAMS } from "../config/consts";

export const request = async <T>(url: string): Promise<T> => {
    const response = await fetch(`${API_URL}${BASE_PARAMS}&${url}`);
    const { data } = await response.json();

    return data as T;
}

