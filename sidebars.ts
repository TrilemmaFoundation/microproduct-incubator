import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  incubatorSidebar: [
    {
      type: 'category',
      label: 'Intro',
      items: ['intro/what-is-a-microproduct', 'intro/mission'],
    },
    {
      type: 'category',
      label: 'Playbook',
      items: [
        {
          type: 'category',
          label: 'Getting Started',
          items: [
            'playbook/getting-started',
            'playbook/ideation',
            'playbook/architecture',
            'playbook/data-stack-analytics-engineering',
          ],
        },
        {
          type: 'category',
          label: 'Implementation',
          items: [
            'playbook/implementation-phase',
            'playbook/implementation',
            'playbook/qa-methodology',
          ],
        },
        {
          type: 'category',
          label: 'End-to-End Ownership',
          items: ['playbook/end-to-end-ownership'],
        },
      ],
    },
    {
      type: 'category',
      label: 'Resources',
      items: ['resources/index'],
    },
  ],
};

export default sidebars;
