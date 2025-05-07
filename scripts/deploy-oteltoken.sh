##########
# NOTICE #
##########

# Run the steps in this script MANUALLY in the CLI. DO NOT EXECUTE THIS SCRIPT! It doesn't work and I'm not totally sure why quite yet.

# This script is only used to enable the OpenTelemetry datastream. In mid-2025 Observe will launch DIRECT-WRITE for Traces.
# Once launched, this script will be deprecated, and all tokens will be handled directly by 'deploy-observe-agent.sh'

# Add 'TRACE_TOKEN' to 'agent-credentials' kubernetes secret :: this is your 'OpenTelemetry App' Token!
kubectl get secret agent-credentials -n observe -o json | jq --arg tracetoken "$(echo -n ds1eFh3iFkf7WJam45fP:VBol3IZWtvuaoEo3NJq5XgrNJ6zIHrBa | base64)" '.data["TRACE_TOKEN"]=$tracetoken' | kubectl apply -f -

# Perform a rolling restart to apply the changes
kubectl rollout restart deployment -n observe
kubectl rollout restart daemonset -n observe

# Validate the tokens (there should be 2 stored in 'agent-credentials')
kubectl get secret agent-credentials -n observe -o jsonpath="{.data}" | jq 'map_values(@base64d)'