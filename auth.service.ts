### Builder
FROM maven:3.8.5-openjdk-17 AS builder
WORKDIR /usr/src/app
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn package

### Runner
FROM openjdk:17-slim
WORKDIR /app
COPY --from=builder /usr/src/app/target/quarkus-app/ /app/
EXPOSE 8080
CMD ["java", "-jar", "/app/quarkus-run.jar"]