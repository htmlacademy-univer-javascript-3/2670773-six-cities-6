import '@testing-library/jest-dom/vitest';
import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import CitiesList from './cities-list.tsx';

describe('CitiesList', () => {
  const cities = ['Paris', 'Cologne', 'Brussels', 'Amsterdam'];
  const activeCity = 'Paris';

  it('should render list of cities', () => {
    render(
      <CitiesList
        cities={cities}
        activeCity={activeCity}
        onCityClick={vi.fn()}
      />
    );

    const items = screen.getAllByRole('listitem');
    expect(items.length).toBe(cities.length);

    cities.forEach((city) => {
      expect(screen.getByText(city)).toBeInTheDocument();
    });
  });

  it('should highlight active city', () => {
    render(
      <CitiesList
        cities={cities}
        activeCity={activeCity}
        onCityClick={vi.fn()}
      />
    );

    const activeLink = screen.getByText(activeCity).closest('a');
    expect(activeLink).toHaveClass('tabs__item--active');
  });

  it('should call onCityClick when city is clicked', () => {
    const handleClick = vi.fn();

    render(
      <CitiesList
        cities={cities}
        activeCity={activeCity}
        onCityClick={handleClick}
      />
    );

    const targetCity = 'Amsterdam';
    const link = screen.getByText(targetCity);

    fireEvent.click(link);

    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(handleClick).toHaveBeenCalledWith(targetCity);
  });
});
