import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../index';

jest.mock('../../components/Hero', () => {
  type MockHeroProps = {
    actions: { label: string; to: string }[];
  };

  return function MockHero({ actions }: MockHeroProps) {
    const dataset = actions.reduce<Record<string, string>>((acc, action, index) => {
      acc[`data-action-${index}`] = `${action.label}:${action.to}`;
      return acc;
    }, {});

    return <div data-testid="mock-hero" {...dataset} />;
  };
});

describe('Home page', () => {
  it('renders layout and wires Hero actions', () => {
    render(<Home />);

    expect(screen.getByTestId('layout')).toBeInTheDocument();

    const hero = screen.getByTestId('mock-hero');
    expect(hero).toHaveAttribute(
      'data-action-0',
      'Registry:/registry',
    );
    expect(hero).toHaveAttribute(
      'data-action-3',
      'Standards:/standards',
    );
  });
});
