import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'url';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        index1: fileURLToPath(new URL('./index1.html', import.meta.url)),
        index2: fileURLToPath(new URL('./index2.html', import.meta.url)),
        best: fileURLToPath(new URL('./best.html', import.meta.url)),
        best2: fileURLToPath(new URL('./best2.html', import.meta.url)),
        brand: fileURLToPath(new URL('./brand.html', import.meta.url)),
        brand2: fileURLToPath(new URL('./brand2.html', import.meta.url)),
        cart: fileURLToPath(new URL('./cart.html', import.meta.url)),
        cart2: fileURLToPath(new URL('./cart2.html', import.meta.url)),
        product: fileURLToPath(new URL('./product.html', import.meta.url)),
        product2: fileURLToPath(new URL('./product2.html', import.meta.url)),
        order: fileURLToPath(new URL('./order.html', import.meta.url)),
        ac_product: './ac-product.html',
        ac_ampoule: './ac-ampoule-detail.html',
        ac_cream: './ac-cream-detail.html',
        ac_mask: './ac-mask-detail.html',
        amino_product: './amino-product.html',
        amino_powder: './amino-powder-detail.html',
        cleansing_balm: './cleansing-balm-detail.html',
        cleansing_milk: './cleansing-milk-detail.html'
      },
      output: {
        assetFileNames: 'assets/[name][extname]'
      },
      external: ['product.js']
    }
  }
});
