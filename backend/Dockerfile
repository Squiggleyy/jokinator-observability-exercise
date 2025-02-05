# Use a lightweight JDK base image
FROM openjdk:17
WORKDIR /app

# Copy the built JAR file into the container
COPY target/demo-0.0.1-SNAPSHOT.jar app.jar

# Expose port 8080 for the backend
EXPOSE 8080

# Run the application
CMD ["java", "-jar", "app.jar"]