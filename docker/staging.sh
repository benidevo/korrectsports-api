# wait for MySQL
echo "Waiting for MySQL..."
while ! nc -z db 3306; do
  sleep 5
done

npm run typeorm migration:run

npm run build
npm run start:prod
