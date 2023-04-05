build:
	docker-compose -f docker/prod.yml build --no-cache

build-dev:
	docker-compose -f docker/dev.yml build --no-cache

build-staging:
	docker-compose -f docker/staging.yml build --no-cache

up:
	docker-compose -f docker/prod.yml up -d --remove-orphans

up-staging:
	docker-compose -f docker/staging.yml up --remove-orphans

up-dev:
	docker-compose -f docker/dev.yml up  --remove-orphans

pull:
	docker-compose -f docker/prod.yml pull api

pull-staging:
	docker-compose -f docker/staging.yml pull api

pull-dev:
	docker-compose -f docker/dev.yml pull api

down:
	docker-compose -f docker/prod.yml down
down-staging:
	docker-compose -f docker/staging.yml down

down-dev:
	docker-compose -f docker/dev.yml down

devDB-generateMigrations:
	docker-compose -f docker/dev.yml exec -it api npm run typeorm migration:generate src/typeorm/migrations/$(name)
devDB-runMigrations:
	docker-compose -f docker/dev.yml exec -it api npm run migration:run

devDB-revertMigrations:
	docker-compose -f docker/dev.yml exec -it api npm run migration:revert

devDB-drop:
	docker-compose -f docker/dev.yml  down -v

stagingDB-drop:
	docker-compose -f docker/staging.yml down -v

show-logs:
	docker-compose -f docker/dev.yml logs -f
