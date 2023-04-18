import { API_URL, BASE_PARAMS } from "../config/consts";

export const request = async <T>(url: string, params = ''): Promise<T> => {
    const response = await fetch(`${API_URL}${url}?${BASE_PARAMS}&${params}`);
    const { data } = await response.json();

    return data as T;
}

