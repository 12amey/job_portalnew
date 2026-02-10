# Use an official OpenJDK runtime as a parent image
FROM eclipse-temurin:17-jdk-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the mvnw wrapper and pom.xml first to leverage Docker cache
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Give execution rights to the mvnw wrapper
RUN chmod +x mvnw

# Download dependencies (this step will be cached if pom.xml doesn't change)
# using 'dependency:go-offline' helps, but simple install is often more robust for simple setups
RUN ./mvnw dependency:go-offline -B

# Copy the rest of the source code
COPY src src

# Build the application
RUN ./mvnw package -DskipTests

# Expose port 7070 (matching your application.properties)
EXPOSE 7070

# Define the command to run the application
CMD ["java", "-jar", "target/job_platfom-0.0.1-SNAPSHOT.jar"]
