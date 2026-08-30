import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const site = process.env.SITE_URL ?? 'https://matlofleurs.fr';

const police = (name, cssVariable, weights, styles = ['normal']) => ({
  provider: fontProviders.google(),
  name,
  cssVariable,
  weights,
  styles,
  subsets: ['latin'],
  fallbacks: ['Georgia', 'Times New Roman', 'serif'],
});

export default defineConfig({
  site,

  // `file` évite la redirection DirectorySlash d'Apache vers `/page/`, la
  // convention du projet étant de ne jamais avoir de slash final.
  trailingSlash: 'never',
  build: {
    format: 'file',
  },

  fonts: [
    police('Cinzel', '--police-titre', [400]),
    police('Cormorant Garamond', '--police-corps', [400, 500], ['normal', 'italic']),
    police('IM Fell DW Pica', '--police-label', [400]),
    police('Tangerine', '--police-accent', [400]),
    police('Updock', '--police-logotype', [400]),
  ],

  integrations: [
    // La confirmation d'envoi est en noindex : la déclarer dans le sitemap
    // enverrait à Google deux instructions contradictoires.
    sitemap({
      filter: (page) => !/\/(message-envoye|404|og)$/.test(page),
    }),
  ],
});
