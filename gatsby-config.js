module.exports = {
  siteMetadata: {
    name: 'Vyron Vasileiadis',
    description:
      'Software Engineer: C# / .NET, Python, JavaScript, TypeScript, Angular, React, Gatsby, Microsoft Azure, Docker, Kubernetes',
    keywords: [
      'C#',
      '.NET',
      'JavaScript',
      'TypeScript',
      'Microsoft Azure',
      'Docker',
      'Kubernetes'
    ],
    siteUrl: 'https://fedonman.com',
    siteImage: 'https://paulie.dev/images/paulie-open-graph-image.jpg',
    profileImage: ``,
    lang: `en`,
    config: {
      sidebarWidth: 200,
    },
  },
  plugins: [
    `gatsby-plugin-gatsby-cloud`,
    `gatsby-plugin-mdx-embed`,
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          quality: 90,
          formats: ['auto', 'webp', 'avif'],
          placeholder: 'blurred',
        },
      },
    },
    {
      resolve: '@pauliescanlon/gatsby-theme-terminal',
      options: {
        source: [
          {
            name: 'posts',
            dir: process.env.NODE_ENV === 'development' ? 'posts/2021' : 'posts',
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-76055934-4',
      },
    },
    `gatsby-plugin-sitemap`,
  ],
}
