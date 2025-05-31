# Usar a imagem base do Node.js
FROM node:22.26.0-alpine

# Definir o diretório de trabalho no container
WORKDIR /app

# Copiar os arquivos necessários para o container
COPY package*.json ./
COPY . .

# Instalar as dependências
RUN npm install

# Expor a porta padrão do AdonisJS (3333)
EXPOSE 3333

# Comando para iniciar a aplicação
CMD ["node", "ace", "serve", "--watch"]
