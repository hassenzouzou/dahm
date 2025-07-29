/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://yourdomain.com', // Replace with your actual domain
    generateRobotsTxt: true, // Generate robots.txt
    sitemapSize: 7000,
    changefreq: 'daily',
    priority: 0.7,
    exclude: [
        '/api/*', // Exclude API routes from main sitemap
    ],
    additionalPaths: async (config) => [
        // Add specific paths with custom priority and changefreq
        await config.transform(config, '/#home', {
            priority: 0.9,
            changefreq: 'monthly',
            lastmod: new Date().toISOString(),
        }),
        await config.transform(config, '/#services', {
            priority: 0.9,
            changefreq: 'weekly',
            lastmod: new Date().toISOString(),
        }),
        await config.transform(config, '/#portfolio', {
            priority: 0.8,
            changefreq: 'weekly',
            lastmod: new Date().toISOString(),
        }),
        await config.transform(config, '/#team', {
            priority: 0.7,
            changefreq: 'monthly',
            lastmod: new Date().toISOString(),
        }),
        await config.transform(config, '/#about', {
            priority: 0.8,
            changefreq: 'monthly',
            lastmod: new Date().toISOString(),
        }),
        await config.transform(config, '/#contact', {
            priority: 0.8,
            changefreq: 'monthly',
            lastmod: new Date().toISOString(),
        }),
    ],
    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                allow: '/',
            },
            {
                userAgent: 'Googlebot',
                allow: '/',
            },
            {
                userAgent: 'Bingbot',
                allow: '/',
            },
        ],
        additionalSitemaps: [
            'https://yourdomain.com/sitemap.xml', // Replace with your actual domain
        ],
    },
    transform: async (config, path) => {
        // Custom transformation for Arabic RTL content
        return {
            loc: path,
            changefreq: config.changefreq,
            priority: config.priority,
            lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
            alternateRefs: [
                {
                    href: `https://yourdomain.com${path}`, // Arabic version
                    hreflang: 'ar-OM',
                },
                // Add English version if available
                // {
                //   href: `https://yourdomain.com/en${path}`,
                //   hreflang: 'en-US',
                // },
            ],
        }
    },
}
