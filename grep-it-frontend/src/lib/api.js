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
        console.log('Response text:', responseText);

        // Если ответ не успешный, выбрасываем ошибку
        if (!response.ok) {
            throw new Error(`API Error: ${response.status}. Response: ${responseText}`);
        }

        // Парсим ответ как JSON
        try {
            return JSON.parse(responseText);
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
    if (!media || !media.data) return null;

    const { url } = media.data.attributes;
    return url.startsWith('/') ? `${API_URL}${url}` : url;
}