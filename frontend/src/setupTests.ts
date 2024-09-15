import '@testing-library/jest-dom';
import { beforeEach } from 'vitest';

beforeEach(() => {
    const root = document.createElement('div');
    root.id = 'root';
    document.body.appendChild(root);
});