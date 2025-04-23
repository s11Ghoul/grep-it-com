import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
    integrations: [
        tailwind({
            // Путь к конфигурационному файлу
            configFile: './tailwind.config.mjs',
        }),
    ],
});