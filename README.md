# Luke's Jokinator 5000
This is a basic Java web application (Spring boot + React) that can be used to practice the instrumentation of observability solutions. The app only works in minikube.

**As of 2025, Docker Desktop and Minikube must be installed to proceed with this exercise!**

If you haven't already, clone the repository with "git clone https://github.com/squiggleyy/spring-observability-exercise". Once the repo is available on your local machine, complete the following steps:

# Start the app
1. Navigate to the `~/spring-observability-exercise` directory and run the `deploy-app.sh` script via `sh deploy-app.sh`.
2. After the script completes, run "kubectl get pods" to confirm that there is a `spring-react-app` pod running in the default namespace.
3. Since nginx dynamically assigns a frontend port, check the URL by running `minikube service spring-react-app-service --url`.
4. Open the application by visiting `http://localhost:XXXXX` in a browser. If it doesn't load, try incognito mode.
5. Interact with the web application to see what it does!

*Now, let's get ready to collect telemetry...*

# Point to your Observe trial
6. Create a free trial in Observe if you haven't already done so. Log into Observe in the browser.
7. Go to "Add Data" in the left toolbar. Click "Kubernetes" under the section "Observe Agent."

# View your k8 metrics in Observe!
19. Click "Kubernetes" on the left toolbar of the Observe platform.
20. Notice that you are now observing 1 cluster. Click "Namespaces" to view the different namespaces present in your cluster.
21. Click on the "default" namespace. Notice the flask-app pod that you saw earlier in the terminal. Here you can view the pod's CPU and Memory usage.
22. Click on the flask-app pod. There should be only 1 container in this pod. Here you can view the individual container's CPU and Memory usage.
23. Take a look at the pods in the "observe" namespace as well. These are the Observe Agent pods that you saw earlier in the terminal.

# View your k8 logs in Observe!
24. Click "Logs" and select the "Kubernetes Logs" dataset. Filter to "container = flask-app".
25. Notice that container logs are emitted every time you click around!
26. You can also view these logs directly in the Kubernetes Explorer when looking at a container, pod, node, or namespace.

# View your application traces in Observe!
27. Click "Traces" and take a look at your "service entry point" spans. In the "Operation" column, you'll see the http GET requests from clicking the buttons or refreshing the page.
28. Pick an entry point span and click "View trace." In this case, it is normal to see only 1 span for the trace. Read through the "Fields & attributes" tab.
29. Click the "Logs" tab. Select "Kubernetes Logs" and view those logs for the cluster, pod, and namespace right below the distributed trace! This demonstrates automatic correlation of infrastructure, logs, and traces via k8s resource attributes.