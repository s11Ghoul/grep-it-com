// src/lib/api.js
const API_URL = import.meta.env.PUBLIC_STRAPI_API_URL || 'http://localhost:1337';

/**
 * Простая функция для получения данных из Strapi API
 */
export async function fetchAPI(endpoint, params = {}) {
    // Формируем базовый URL
    let url = `${API_URL}/api/${endpoint}`;

    // Добавляем параметры запроса, если они есть
    if (Object.keys(params).length > 0) {
        // Преобразуем параметры в формат URL query string
        const queryString = Object.keys(params)
            .map(key => {
                // Если значение - объект, преобразуем его в JSON строку
                const value = typeof params[key] === 'object'
                    ? JSON.stringify(params[key])
                    : params[key];

                return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
            })
            .join('&');

        // Добавляем параметры к URL
        url = `${url}?${queryString}`;
    }

    console.log('Fetching URL:', url);

    try {
        // Выполняем запрос
        const response = await fetch(url);

        // Получаем текст ответа для отладки
        const responseText = await response.text();

        // Если ответ не успешный, выбрасываем ошибку
        if (!response.ok) {
            console.error(`API Error: ${response.status}. Response:`, responseText);
            throw new Error(`API Error: ${response.status}`);
        }

        // Парсим ответ как JSON
        try {
            const data = JSON.parse(responseText);
            console.log('Parsed API response structure:', JSON.stringify(data, null, 2));
            return data;
        } catch (jsonError) {
            console.error('JSON parse error:', jsonError);
            throw new Error('Invalid JSON in API response');
        }
    } catch (error) {
        console.error('API fetch error:', error);
        throw error;
    }
}

/**
 * Получение URL медиа-файла
 */
export function getStrapiMedia(media) {
    if (!media) return null;

    // Для варианта, когда изображение передается напрямую, без data/attributes
    if (media.url) {
        const url = media.url;
        return url.startsWith('/') ? `${API_URL}${url}` : url;
    }

    // Для варианта со структурой data.attributes
    if (media.data && media.data.attributes && media.data.attributes.url) {
        const url = media.data.attributes.url;
        return url.startsWith('/') ? `${API_URL}${url}` : url;
    }

    return null;
}