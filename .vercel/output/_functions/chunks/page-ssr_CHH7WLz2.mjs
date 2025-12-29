import { createClient } from '@sanity/client';

const sanityClient = createClient(
            {"apiVersion":"v2023-08-24","projectId":"el8ex8qy","dataset":"production","useCdn":false}
          );

globalThis.sanityClient = sanityClient;
