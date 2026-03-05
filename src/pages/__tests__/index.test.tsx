import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../index';

// Mock the Hero component so we can verify props passed to it without testing its implementation again
jest.mock('../../components/Hero', () => {
  type MockHeroProps = {
    title: string;
    description: string;
    primaryCta: { label: string; to: string };
    secondaryCta: { label: string; to: string };
  };

  return function MockHero(props: MockHeroProps) {
    return (
      <div data-testid="mock-hero">
        <span data-testid="hero-title">{props.title}</span>
        <span data-testid="hero-description">{props.description}</span>
        <span data-testid="hero-primary-label">{props.primaryCta.label}</span>
        <span data-testid="hero-primary-to">{props.primaryCta.to}</span>
        <span data-testid="hero-secondary-label">{props.secondaryCta.label}</span>
        <span data-testid="hero-secondary-to">{props.secondaryCta.to}</span>
      </div>
    );
  };
});

describe('Home page', () => {
  it('renders Layout and Hero with correct props', () => {
    render(<Home />);

    const layout = screen.getByTestId('layout');
    expect(layout).toBeInTheDocument();
    expect(layout).toHaveAttribute('data-title', 'Microproduct Incubator');
    expect(layout).toHaveAttribute(
      'data-description',
      'Open knowledge hub for building focused apps that turn data into usable tools and real utility.',
    );

    expect(screen.getByTestId('mock-hero')).toBeInTheDocument();
    expect(screen.getByTestId('hero-title')).toHaveTextContent(
      'Microproduct Incubator Open Knowledge Hub',
    );
    expect(screen.getByTestId('hero-description')).toHaveTextContent(
      'Focused apps that turn data into usable tools and real utility. Learn, build, and contribute through open documentation and community-reviewed insights.',
    );
    expect(screen.getByTestId('hero-primary-label')).toHaveTextContent('Learn');
    expect(screen.getByTestId('hero-primary-to')).toHaveTextContent(
      '/docs/intro/what-is-a-microproduct',
    );
    expect(screen.getByTestId('hero-secondary-label')).toHaveTextContent(
      'Contribute',
    );
    expect(screen.getByTestId('hero-secondary-to')).toHaveTextContent(
      '/contribute',
    );
  });
});
