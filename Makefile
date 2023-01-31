build:
	docker-compose -f docker/prod.yml build --no-cache 

build-dev:
	docker-compose -f docker/dev.yml build --no-cache

up:
	docker-compose -f docker/prod.yml up -d --remove-orphans

up-dev:
	docker-compose -f docker/dev.yml up --remove-orphans
