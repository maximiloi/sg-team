import nextConfig from 'eslint-config-next';

const config = [
  ...nextConfig,
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
      'src/generated/**',
    ],
  },
];

export default config;
