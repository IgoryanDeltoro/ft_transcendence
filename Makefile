.PHONY: all up down logs certs migrate studio clean re

all: certs up

## Generate self-signed TLS certificates for local development
certs:
	mkdir -p nginx/certs
	openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
		-keyout nginx/certs/key.pem \
		-out nginx/certs/cert.pem \
		-subj "/C=US/ST=Dev/L=Dev/O=Dev/CN=localhost"

## Copy .env.example to .env if it doesn't exist
env:
	@test -f .env || cp .env.example .env && echo "Created .env from .env.example"


init_dep:
	cd ./frontend && npm ci
	cd ./backend && npm ci

## Build and start all services
up: env init_dep
	docker compose up --build

## Start in background
up-d: env
	docker compose up --build -d

## Stop all services
down:
	docker compose down

## Stop and remove volumes (wipes database!)
clean:
	docker compose down -v


## Remove everythings
fclean: clean
	docker system prune -fa

## Rebuild everything
re: down up

## Follow logs for all services
logs:
	docker compose logs -f

## Follow logs for a specific service: make log s=backend
log:
	docker compose logs -f $(s)

## Run Prisma migrations inside the backend container
migrate:
	docker compose exec backend npx prisma migrate dev

## Open Prisma Studio (web-based DB GUI) — runs on port 5555
studio:
	docker compose exec backend npx prisma studio --port 5555

## Open a shell in a service: make shell s=backend
shell:
	docker compose exec $(s) sh
