import { api } from '@_e2e/fixtures/api.fixture';
import { components } from '@_e2e/fixtures/components.fixture';
import { pages } from '@_e2e/fixtures/pages.fixture';
import { mergeTests } from '@playwright/test';

export const test = mergeTests(pages, components, api);

export { expect } from '@playwright/test';
