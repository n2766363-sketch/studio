import type {NextConfig} from 'next';
import { execSync } from 'child_process';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
        try {
            execSync('patch-package', { stdio: 'inherit' });
        } catch (error) {
            console.error('Failed to apply patch-package:', error);
            throw new Error('patch-package failed.');
        }
    }
    return config;
  }
};

export default nextConfig;
