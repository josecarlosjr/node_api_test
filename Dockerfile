#FROM nginx
#COPY wrapper.sh /
#COPY *.* /usr/share/nginx/html
#CMD ["./wrapper.sh"]

FROM node:lts-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
RUN npm install --silent
# RUN npm install react-scripts@3.4.1 -g --silent
COPY . /app
EXPOSE 3333 
#RUN npm run build
CMD ["node", "server.js"]

# production environment
#FROM nginx:stable-alpine
#COPY --from=build /app/ /usr/share/nginx/html
#EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]
