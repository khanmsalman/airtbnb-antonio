/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        // domains: [
        //     "avatars.githubusercontent.com"
        // ]

        // now ues remotePatterns instead of domains
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'avatars.githubusercontent.com',
              port: '',
              pathname: '/u/*',
            },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                port: '',
                pathname: '/a/*',
            }
        ]
    }
};

export default nextConfig;
