from node as builder
workdir /app
COPY package*.json .
RUN yarn 
copy . .
run yarn build

from node
workdir /app
copy --from=builder /app/build .
copy preprocessing.mjs .
copy entrypoint.sh .
entrypoint /app/entrypoint.sh