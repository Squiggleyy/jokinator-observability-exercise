# Use a lightweight JDK base image
FROM openjdk:17

# Set the working directory inside the container
WORKDIR /app

# Copy the built JAR file into the container
COPY target/demo-0.0.1-SNAPSHOT.jar app.jar

# Copy OpenTelemetry Java Agent
COPY opentelemetry-javaagent.jar /app/opentelemetry-javaagent.jar

# Expose port 8080 for the backend
EXPOSE 8080

# Run the application with OpenTelemetry instrumentation
CMD ["java", "-javaagent:/app/opentelemetry-javaagent.jar", "-jar", "app.jar"]