import Layout from '@theme/Layout';
import Hero from '../components/Hero';

export default function Home() {
  return (
    <Layout
      title="Microproduct Incubator"
      description="Open knowledge hub for building focused apps that turn data into usable tools and real utility."
    >
      <Hero
        title="Microproduct Incubator Open Knowledge Hub"
        description="Focused apps that turn data into usable tools and real utility. Learn, build, and contribute through open documentation and community-reviewed insights."
        primaryCta={{
          label: 'Learn',
          to: '/docs/intro/what-is-a-microproduct',
        }}
        secondaryCta={{
          label: 'Contribute',
          to: '/contribute',
        }}
      />
    </Layout>
  );
}
