import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button onClick={() => {}}>Click me</Button>);
    expect(
      screen.getByRole('button', { name: /click me/i })
    ).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByRole('button', { name: /click me/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

describe('Button', () => {
  it('applies correct class for form variant', () => {
    const { getByRole } = render(<Button variant="form">Form Button</Button>);
    const button = getByRole('button');

    expect(button.className).toMatch(/bg-secondary/);
  });
});

it('disables the button when disabled is true', () => {
  const { getByRole } = render(
    <Button disabled onClick={vi.fn()}>
      Can't click me
    </Button>
  );
  const button = getByRole('button');
  expect(button).toBeDisabled();
});

it('does not call onClick when disabled', () => {
  const handleClick = vi.fn();
  const { getByRole } = render(
    <Button disabled onClick={handleClick}>
      Click
    </Button>
  );
  const button = getByRole('button');
  button.click();
  expect(handleClick).not.toHaveBeenCalled();
});

it('applies the correct class for the "primary" variant', () => {
  const { getByRole } = render(<Button variant="primary">Primary</Button>);
  const button = getByRole('button');
  expect(button.className).toMatch(/bg-primary/);
});

it('sets the button type correctly', () => {
  const { getByRole } = render(<Button type="submit">Submit</Button>);
  const button = getByRole('button');
  expect(button).toHaveAttribute('type', 'submit');
});
