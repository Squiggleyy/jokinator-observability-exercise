# minikube start
# eval $(minikube docker-env)  # Point Docker to Minikube's daemon
# docker build -t my-backend backend/
# docker build -t my-frontend frontend/

# kubectl apply -f k8s/deployment.yaml
# kubectl apply -f k8s/service.yaml

#!/bin/bash

# Exit if any command fails
set -e

echo "🚀 Starting Minikube..."
minikube start --driver=docker

echo "🔄 Setting Minikube Docker environment..."
eval $(minikube docker-env)

echo "🐳 Building Docker images..."
docker build -t spring-react-app-frontend ./frontend
docker build -t spring-react-app-backend ./backend

echo "📜 Applying Kubernetes manifests..."
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml

echo "⏳ Waiting for pods to be ready..."
kubectl wait --for=condition=ready pod --all --timeout=90s

echo "🌐 Getting Minikube service URL..."
FRONTEND_URL=$(minikube service spring-react-app-service --url --format='{{.IP}}:{{.Port}}')

echo "✅ Deployment complete!"
echo "🌍 Access your app at: $FRONTEND_URL"
