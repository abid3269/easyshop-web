import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock scrollIntoView as it's not implemented in jsdom
window.HTMLElement.prototype.scrollIntoView = vi.fn();
