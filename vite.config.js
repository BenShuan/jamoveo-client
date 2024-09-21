import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

})
git init
git add .
git commit -m "initial-commit"
git branch -M main
git remote add origin https://github.com/BenShuan/jamoveo-client.git
git push -u origin main