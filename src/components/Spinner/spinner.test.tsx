import '@testing-library/jest-dom/vitest';
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import Spinner from './spinner.tsx';

// Мокаем CSS-модули
vi.mock('./spinner.module.css', () => ({
  default: {
    spinner: 'spinner',
  },
}));

describe('Spinner', () => {
  it('should render spinner container and spinner element', () => {
    const { container } = render(<Spinner />);

    // внешний контейнер
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toBeInTheDocument();

    // сам спиннер
    const spinner = container.querySelector('.spinner');
    expect(spinner).toBeInTheDocument();
  });
});
