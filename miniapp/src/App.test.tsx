import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { App } from './App.js';

describe('App', () => {
  it('shows the shell heading', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: 'شکار گنج' })).toBeTruthy();
  });
});
