# wait for MySQL
echo "Waiting for MySQL..."
while ! nc -z db 3306; do
  sleep 0.1
done

npm run start:dev
