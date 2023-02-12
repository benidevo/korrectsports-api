build:
	docker-compose -f docker/prod.yml build --no-cache

build-dev:
	docker-compose -f docker/dev.yml build --no-cache

up:
	docker-compose -f docker/prod.yml up -d --remove-orphans

up-dev:
	docker-compose -f docker/dev.yml up  --remove-orphans

down:
	docker-compose -f docker/prod.yml down

down-dev:
	docker-compose -f docker/dev.yml down

devDB-generateMigrations:
	docker-compose -f docker/dev.yml  exec -it api npm run typeorm migration:generate src/typeorm/migrations/$(name)
devDB-runMigrations:
	docker-compose -f docker/dev.yml  exec -it api npm run migration:run

devDB-revertMigrations:
	docker-compose -f docker/dev.yml exec -it api npm run migration:revert

devDB-drop:
	docker-compose -f docker/dev.yml  down -v

show-logs:
	docker-compose -f docker/dev.yml logs -f
