# Usar a imagem base do Node.js
FROM node:22.16.0-alpine

# Definir o diretório de trabalho no container
WORKDIR /app

# Diretório de trabalho
WORKDIR /app

# Copiar apenas os arquivos de dependências primeiro (para otimizar cache)
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o restante da aplicação
COPY . .

# Expor a porta padrão do Adonis
EXPOSE 3333

# Comando padrão para iniciar a aplicação com HMR
CMD ["node", "ace", "serve", "--watch"]