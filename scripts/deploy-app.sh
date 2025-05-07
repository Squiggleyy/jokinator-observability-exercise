set -e

echo "🚀 Starting Minikube..."
minikube start --driver=docker

echo "🔄 Setting Minikube Docker environment..."
eval $(minikube docker-env)

echo "Cleaning Maven packages just in case..."
cd backend
mvn clean package -DskipTests
cd ..
# mvn -pl backend clean package -DskipTests

echo "🐳 Building Docker images..."
docker build -t spring-react-app-frontend:latest ./frontend
docker build -t spring-react-app-backend:latest ./backend

echo "📜 Applying Kubernetes manifests..."
kubectl apply -f k8s/frontend-deployment.yaml
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/service.yaml
kubectl apply -f k8s/ingress.yaml

echo "🌐 Turning on minikube NGINX ingress controller..."
minikube addons enable ingress

kubectl patch svc ingress-nginx-controller \
  -n ingress-nginx \
  -p '{"spec": {"type": "LoadBalancer"}}'

echo "⏳ Waiting for pods to be ready..."
kubectl wait --for=condition=ready pod --all --timeout=90s

echo "Starting a tunnel so you can reach the ingress controller on MacOS..."
sudo minikube tunnel # Use 'kubectl get svc -n ingress-nginx' to get the external IP. Should default to 127.0.0.1