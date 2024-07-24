DOCKER-EXEC=docker-compose
DOCKER=docker

.PHONY: up
up:
	$(DOCKER-EXEC) up -d

.PHONY: down
down:
	$(DOCKER-EXEC) down

.PHONY: connect
connect:
	$(DOCKER) exec -ti front-app bash