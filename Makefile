.PHONY: migrate
migrate:
	node /app/node_modules/typeorm/cli migration:run --dataSource /app/data.source.js

.PHONY: start
start: migrate
	node /app/main.js

.PHONY: lint
lint:
	cd api && npm run lint
	cd common && npm run lint
	cd ui && npm run lint

.PHONY: patch
patch:
	node ./scripts/version.js patch

.PHONY: minor
minor:
	node ./scripts/version.js minor

.PHONY: major
major:
	node ./scripts/version.js major
