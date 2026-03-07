import Layout from '@theme/Layout';
import Hero from '../components/Hero';

export default function Home() {
  return (
    <Layout
      title="Microproduct Lab"
      description="An open knowledge hub for building microproducts"
    >
      <Hero
        title="Microproduct Lab"
        description="Open Knowledge Hub to learn, develop, and contribute insights for building focused apps."
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
