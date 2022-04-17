.PHONY: migrate
migrate:
	node /app/node_modules/typeorm/cli migration:run --dataSource /app/data.source.js

.PHONY: start
start: migrate
	node /app/main.js

.PHONY: build
build:
	docker buildx build --platform linux/amd64 -t ${APP_NAME} .

.PHONY: tag
tag: build
	docker tag $(APP_NAME) registry.heroku.com/${APP_NAME}/web

.PHONY: push
push: tag
	docker push registry.heroku.com/${APP_NAME}/web

.PHONY: release
release: push
	heroku container:release web -a ${APP_NAME}


