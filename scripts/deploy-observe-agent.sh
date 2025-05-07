# Adds the Observe Agent helm chart
helm repo add observe https://observeinc.github.io/helm-charts
helm repo update

# Creates the observe namespace and creates a kubernetes secret called 'agent-credentials', then defines 'OBSERVE_TOKEN' to be part of that secret.
kubectl create namespace observe
  kubectl -n observe create secret generic agent-credentials --from-literal=OBSERVE_TOKEN=ds1hsHPL8ktM5dawTg7V:S-SYKo4vIRenBqJY7BvwTAL2W8YiIKz8
  # LATER :: for Traces direct write, coming soon. Add this to Line 7, uses same k8explorer token for TRACE_TOKEN secret:
  # --from-literal=TRACE_TOKEN=ds1hsHPL8ktM5dawTg7V:S-SYKo4vIRenBqJY7BvwTAL2W8YiIKz8

kubectl annotate secret agent-credentials -n observe \
  meta.helm.sh/release-name=observe-agent \
  meta.helm.sh/release-namespace=observe

kubectl label secret agent-credentials -n observe \
  app.kubernetes.io/managed-by=Helm

# Installs the helm chart
# helm install observe-agent observe/agent -n observe \
# --set observe.token.create="false" \
# --set observe.collectionEndpoint.value="https://100112502756.collect.observeinc.com/" \
# --set cluster.name="observe-agent-monitored-cluster" \
# --set cluster.events.enabled="true" \
# --set cluster.metrics.enabled="true" \
# --set node.containers.logs.enabled="true" \
# --set node.containers.metrics.enabled="true" \
# --set application.prometheusScrape.enabled="false" \
# --set agent.selfMonitor.enabled="false"


helm install observe-agent observe/agent -n observe \
--set observe.collectionEndpoint.value="https://100112502756.collect.observeinc.com/" \
--set cluster.name="jokinator2" \
--set node.containers.logs.enabled="true" \
--set application.prometheusScrape.enabled="false" \
--set node.forwarder.enabled="true"