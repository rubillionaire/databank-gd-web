FOREMAN=node_modules/.bin/nf

.PHONY: build watch bootstrap-db

build:
	npm run build

watch:
	$(FOREMAN) --procfile Procfile.dev start

bootstrap-db:
	npm run bootstrap-db