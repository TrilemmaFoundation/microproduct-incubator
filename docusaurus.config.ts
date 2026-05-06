import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import { SITE_URL } from './siteUrl';

const REPO_URL = 'https://github.com/TrilemmaFoundation/microproduct-lab';

const config: Config = {
  title: 'Build Trilemma',
  tagline:
    'The AI-agent control panel for building microproducts—patterns, templates, standards, and a machine-readable registry.',
  favicon: 'img/favicon.ico',

  headTags: [
    {
      tagName: 'link',
      attributes: {
        rel: 'apple-touch-icon',
        href: '/img/apple-touch-icon.png',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/img/favicon-32x32.png',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/img/favicon-16x16.png',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'manifest',
        href: '/site.webmanifest',
      },
    },
  ],

  url: SITE_URL,
  baseUrl: '/',

  organizationName: 'TrilemmaFoundation',
  projectName: 'microproduct-lab',

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
        debug: false,
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
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'agents',
        path: 'docs/agents',
        routeBasePath: 'agents',
        sidebarPath: false,
        editUrl: `${REPO_URL}/edit/main/`,
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'templates',
        path: 'docs/templates',
        routeBasePath: 'templates',
        sidebarPath: false,
        editUrl: `${REPO_URL}/edit/main/`,
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'archetypes',
        path: 'docs/archetypes',
        routeBasePath: 'archetypes',
        sidebarPath: './sidebars.archetypes.ts',
        editUrl: `${REPO_URL}/edit/main/`,
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'standards',
        path: 'docs/standards',
        routeBasePath: 'standards',
        sidebarPath: './sidebars.standards.ts',
        editUrl: `${REPO_URL}/edit/main/`,
      },
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    metadata: [
      { property: 'og:title', content: 'Build Trilemma' },
      {
        property: 'og:description',
        content:
          'Canonical place to discover microproduct patterns, templates, build instructions, and a machine-readable product registry—for humans and AI agents.',
      },
      { property: 'og:url', content: SITE_URL },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    navbar: {
      logo: {
        alt: 'Trilemma Foundation',
        src: 'img/trilemma_foundation_white.png',
        srcDark: 'img/trilemma_foundation_white.png',
        href: '/',
        height: 26,
      },
      items: [
        { to: '/', label: 'Start', position: 'left' },
        { to: '/registry', label: 'Registry', position: 'left' },
        { to: '/schemas', label: 'Schemas', position: 'left' },
        { to: '/build', label: 'Build', position: 'left' },
        {
          to: '/docs/intro/what-is-a-microproduct',
          label: 'Docs',
          position: 'left',
          activeBaseRegex: '^/docs/',
        },
      ],
    },
    footer: {
      // Infima: 'light' omits .footer--dark (hardcoded grey/blue); tokens come from custom.css.
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
