import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const REPO_URL = 'https://github.com/TrilemmaFoundation/microproduct-incubator';

const config: Config = {
  title: 'Microproduct Incubator',
  tagline: 'Focused apps that turn data into usable tools and real utility.',
  favicon: 'img/logo.svg',

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
        sidebarPath: './sidebarsContribute.ts',
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
      logo: {
        alt: 'Trilemma Foundation',
        src: 'img/trilemma_foundation.png',
        srcDark: 'img/trilemma_foundation_white.png',
        href: '/',
        height: 26,
      },
      links: [
        {
          items: [
            {
              label: 'GitHub',
              href: REPO_URL,
            },
            {
              label: 'Discord',
              href: 'https://discord.gg/AS7WMx7Cy2',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Trilemma Foundation`,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
