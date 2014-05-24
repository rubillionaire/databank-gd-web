FOREMAN=node_modules/.bin/nf

.PHONY: build watch

build:
	npm run build

watch:
	$(FOREMAN) --procfile Procfile.dev start