# Luke's Jokinator 5000
This is a basic Java web application (Spring boot + React) that can be used to practice the instrumentation of observability solutions. The app only works in minikube.

**As of 2025, Docker Desktop and Minikube must be installed to proceed with this exercise!**

If you haven't already, clone the repository with "git clone https://github.com/squiggleyy/spring-observability-exercise". Once the repo is available on your local machine, complete the following steps:

# Start the app
1. Navigate to the `~/spring-observability-exercise` directory and run the `deploy-app.sh` script via `sh scripts/deploy-app.sh`.
2. This should take a couple of minutes. After the app deploys, it should start a tunnel for MacOS. **Please keep this tunnel running to access the app in-browser.**
3. In a new terminal window, run `kubectl get pods` to confirm that there are 2 pods running in the default namespace.
4. Open the application by visiting `http://127.0.0.1/` in a browser.
5. Interact with the web application to see what it does!

*Now, let's get ready to collect logs & metrics...*

# Deploy the Observe Agent
6. Create a free trial in Observe if you haven't already done so. Log into Observe in the browser.
7. Go to "Add Data" in the left toolbar. Click "Kubernetes" under the section "Observe Agent."
8. Generate a token in the "Install" tab. Run through the provided commands to install the Observe Agent. Alternatively, use the script `scripts/deploy-observe-agent.sh`, but please remember to update your `observe.collectionEndpoint.value` and `OBSERVE_TOKEN`.

# View your k8 metrics in Observe!
9. Click "Kubernetes" on the left toolbar of the Observe platform.
10. Notice that you are now observing 1 cluster. Click "Namespaces" to view the different namespaces present in your cluster.
11. Click on the "default" namespace. Notice the 2 pods that you saw earlier in the terminal. Here you can view the pod's CPU and Memory usage.
12. Click on the backend pod. There should be only 1 container in this pod. Here you can view the individual container's CPU and Memory usage.
13. Take a look at the pods in the `observe` namespace as well. These are the Observe Agent pods that you saw earlier in the terminal.
14. Look at the pods in the `ingress-nginx` namespace. This is the ingress controller, which routes user requests to the appropriate service.

# View your k8 logs in Observe!
15. Navigate to the Observe Log Explorer, and select the `Kubernetes Logs` dataset. Filter to `container = frontend`. Notice that container logs are emitted every time you click around!
16. Click the checkbox for a log row, and pivot to the Observe Metrics Explorer based on `container`. Infrastructure <> Logs correlation is OOTB with Observe!
17. You can also view these logs directly in the Kubernetes Explorer when looking at a container, pod, node, or namespace.

*Now, let's get ready to collect traces...*

# Configure traces
18. Follow the instructions listed here: https://docs.observeinc.com/en/latest/content/observe-agent/ConfigureApplicationInstrumentation.html

# [WIP] View your application traces in Observe!
19. Click "Traces" and take a look at your "service entry point" spans. In the "Operation" column, you'll see the http GET requests from clicking the buttons or refreshing the page.
20. Pick an entry point span and click "View trace." In this case, it is normal to see only 1 span for the trace. Read through the "Fields & attributes" tab.
21. Click the "Logs" tab. Select "Kubernetes Logs" and view those logs for the cluster, pod, and namespace right below the distributed trace! This demonstrates automatic correlation of infrastructure, logs, and traces via k8s resource attributes.