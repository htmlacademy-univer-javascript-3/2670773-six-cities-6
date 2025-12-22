import '@testing-library/jest-dom/vitest';
import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SortOptions, { SortType } from './sort-options.tsx';

describe('SortOptions', () => {
  it('should render current sort type', () => {
    render(
      <SortOptions
        sortState={SortType.Popular}
        onSortChange={vi.fn()}
      />
    );

    expect(screen.getByTestId('sort-type')).toHaveTextContent(SortType.Popular);
  });

  it('should open and close options list when clicking on sort type', () => {
    render(
      <SortOptions
        sortState={SortType.Popular}
        onSortChange={vi.fn()}
      />
    );

    const sortType = screen.getByTestId('sort-type');
    const optionsList = screen.getByRole('list');

    // изначально закрыт
    expect(optionsList.className).not.toContain('places__options--opened');

    fireEvent.click(sortType);
    expect(optionsList.className).toContain('places__options--opened');

    fireEvent.click(sortType);
    expect(optionsList.className).not.toContain('places__options--opened');
  });

  it('should call onSortChange and close list when option is clicked', () => {
    const handleChange = vi.fn();

    render(
      <SortOptions
        sortState={SortType.Popular}
        onSortChange={handleChange}
      />
    );

    fireEvent.click(screen.getByTestId('sort-type'));

    const option = screen.getByTestId(`sort-option-${SortType.HighToLowPrice}`);
    fireEvent.click(option);

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(SortType.HighToLowPrice);

    const optionsList = screen.getByRole('list');
    expect(optionsList.className).not.toContain('places__options--opened');
  });

  it('should mark active option based on sortState', () => {
    render(
      <SortOptions
        sortState={SortType.TopRatedFirst}
        onSortChange={vi.fn()}
      />
    );

    const activeOption = screen.getByTestId(`sort-option-${SortType.TopRatedFirst}`);
    expect(activeOption).toHaveClass('places__option--active');
  });
});
