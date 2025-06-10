
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        'ac-ampoule-detail': resolve(__dirname, "src/ac-ampoule-detail.html"),
        'ac-cream-detail': resolve(__dirname, "src/ac-cream-detail.html"),
        'ac-mask-detail': resolve(__dirname, "src/ac-mask-detail.html"),
        'ac-product': resolve(__dirname, "src/ac-product.html"),
        'amino-powder-detail': resolve(__dirname, "src/amino-powder-detail.html"),
        'amino-product': resolve(__dirname, "src/amino-product.html"),
        'best': resolve(__dirname, "src/best.html"),
        'best2': resolve(__dirname, "src/best2.html"),
        'brand': resolve(__dirname, "src/brand.html"),
        'brand2': resolve(__dirname, "src/brand2.html"),
        'cart': resolve(__dirname, "src/cart.html"),
        'cart2': resolve(__dirname, "src/cart2.html"),
        'cleansing-balm-detail': resolve(__dirname, "src/cleansing-balm-detail.html"),
        'cleansing-milk-detail': resolve(__dirname, "src/cleansing-milk-detail.html"),
        'index': resolve(__dirname, "src/index.html"),
        'index1': resolve(__dirname, "src/index1.html"),
        'index2': resolve(__dirname, "src/index2.html"),
        'order': resolve(__dirname, "src/order.html"),
        'product': resolve(__dirname, "src/product.html"),
        'product2': resolve(__dirname, "src/product2.html")
      }
    }
  }
});
