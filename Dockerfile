#FROM nginx
#COPY wrapper.sh /
#COPY *.* /usr/share/nginx/html
#CMD ["./wrapper.sh"] #as build

FROM node:lts-alpine 

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
RUN apk update --no-cache
RUN npm install --silent
# RUN npm install react-scripts@3.4.1 -g --silent
COPY . /app
EXPOSE 3333 
EXPOSE 443
#RUN npm run build
#CMD ["node", "server.js"]
CMD ["npm","start"]
# production environment
#FROM nginx:stable-alpine
#COPY --from=build /app/ /usr/share/nginx/html
#EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]
