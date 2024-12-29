import { mergeTests } from '@playwright/test';
import { pages } from './pages.fixture';
import { components } from './components.fixture';
import { api } from './api.fixture';

export const test = mergeTests(pages, components, api);

export { expect } from '@playwright/test';
