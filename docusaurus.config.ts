import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const REPO_URL = 'https://github.com/TrilemmaFoundation/microproduct-incubator';

const config: Config = {
  title: 'Microproduct Incubator',
  tagline: 'Focused apps that turn data into usable tools and real utility.',
  favicon: 'img/favicon.svg',

  url: 'https://microproducts.trilemma.foundation',
  baseUrl: '/',

  organizationName: 'TrilemmaFoundation',
  projectName: 'microproduct-incubator',

  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          path: 'docs/core',
          sidebarPath: './sidebars.ts',
          editUrl: `${REPO_URL}/edit/main/`,
        },
        blog: false,
        pages: {},
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],
  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'showcase',
        path: 'docs/showcase',
        routeBasePath: 'showcase',
        sidebarPath: false,
        editUrl: `${REPO_URL}/edit/main/`,
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'contribute',
        path: 'docs/contribute',
        routeBasePath: 'contribute',
        sidebarPath: false,
        editUrl: `${REPO_URL}/edit/main/`,
      },
    ],
  ],

  themeConfig: {
    navbar: {
      logo: {
        alt: 'Trilemma Foundation',
        src: 'img/trilemma_foundation.png',
        srcDark: 'img/trilemma_foundation_white.png',
        href: '/',
        height: 26,
      },
      items: [
        {
          to: '/docs/intro/what-is-a-microproduct',
          label: 'Docs',
          position: 'left',
          activeBaseRegex: '^/docs/',
        },
        {
          to: '/showcase',
          label: 'Showcase',
          position: 'left',
        },
        {
          to: '/contribute',
          label: 'Contribute',
          position: 'left',
        },
      ],
    },
    footer: {
      style: 'light',
      links: [
        {
          className: 'footer-col--foundation',
          items: [
            {
              html: `<div class="footer-foundation">
  <a class="footer-foundation__logo-link" href="/" aria-label="Trilemma Foundation home">
    <img class="footer-foundation__logo" src="/img/trilemma_foundation_white.png" alt="Trilemma Foundation" loading="lazy" />
  </a>
  <p class="footer-foundation__description">
    Trilemma Foundation is a Canadian Registered Charity that incubates technical talent through global university partnerships, open source collaboration, and performance based opportunities. Our mission is to enable the brightest minds to rise based on performance.
  </p>
</div>`,
            },
          ],
        },
        {
          title: 'Connect',
          className: 'footer-col--connect',
          items: [
            {
              label: 'Discord',
              href: 'https://discord.gg/AS7WMx7Cy2',
            },
            {
              label: 'X (Twitter)',
              href: 'https://x.com/TrilemmaFdn',
            },
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/company/trilemma-foundation/',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/TrilemmaFoundation',
            },
            {
              label: 'Email',
              href: 'mailto:matt@trilemma.foundation',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Trilemma Foundation`,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
