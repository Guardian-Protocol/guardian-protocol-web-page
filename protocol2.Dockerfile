FROM node:latest
WORKDIR /app

# COPY package.json yarn.lock /app/
RUN git clone https://github.com/EpsyUwU/GUARDIAN_PROTOCOL_NEW.git .
RUN yarn install

# COPY . /app/
EXPOSE 3000
CMD ["yarn", "run", "start"]