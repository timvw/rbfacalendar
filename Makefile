.PHONY: default
default: run

.PHONY: clean
clean: 
	make -j2 clean-frontend clean-backend

.PHONY: clean-frontend
clean-frontend:
	cd frontend && npm cache clear --force

.PHONY: clean-backend
clean-backend:
	cd backend && npm cache clear --force

.PHONY: run
run: 
	make -j2 run-frontend run-backend

.PHONY: run-frontend
run-frontend: 
	cd frontend && ng serve

.PHONY: run-backend
run-backend: 
	cd backend && cargo watch -x run

.PHONY: test
test: test-frontend test-backend

.PHONY: test-frontend
test-frontend: 
	cd frontend && ng test

.PHONY: test-backend
test-backend: 
	cd backend && cargo test

.PHONY: release
release: release-frontend release-backend

.PHONY: release-frontend
release-frontend: clean-frontend 
	cd frontend && ng build

.PHONY: release-backend
release-backend: clean-backend
	cd backend && cargo build --release

.PHONY: build-container
build-container: clean
	docker build -f deployment/Dockerfile -t rbfacalendar:latest .

.PHONY: run-container
run-container: build-container
	docker run --rm -it -p 8000:8000 rbfacalendar:latest

.PHONY: deploy-container
deploy-container: build-container
	docker tag rbfacalendar:latest registry.apps.timvw.be/rbfacalendar:latest
	docker push registry.apps.timvw.be/rbfacalendar:latest
	kubectl apply -f deployment/deploy.yml
	kubectl rollout restart deployment rbfacalendar -n rbfacalendar
