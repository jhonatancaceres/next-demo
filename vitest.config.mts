import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

/**
 * @see https://vitejs.dev/config/
 */
export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'jsdom',
    coverage: {
      provider: 'v8', // 'instanbul' or 'v8'
      reporter: ['lcov', 'text', 'json', 'html'],
      include: ['**/*.ts', '**/*.tsx'],
      exclude: [
        '.next',
        'consts',
        'models',
        'public',
        'app/hooks/use-deep-link',
        'components/Fonts',
        'components/Icons',
        '**/*.config.ts',
        '**/*.config.js',
        '**/*.config.mjs',
        '**/*.vitest.setup.ts',
        '**/*.d.ts',
      ],
    },
    setupFiles: ['./vitest.setup.ts'],
    silent: true, // this is to avoid logging unhandled exceptions https://vitest.dev/config/#silent
  },
});
