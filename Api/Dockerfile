FROM ubuntu:latest AS build

RUN [ -e /bin/sh ] || (echo "/bin/sh not found" && exit 1)

RUN apt-get update && apt-get install -y openjdk-21-jdk maven

COPY . .
RUN mvn clean install

FROM openjdk:21-jdk-slim

RUN [ -e /bin/sh ] || (echo "/bin/sh not found" && exit 1)

EXPOSE 8080
COPY --from=build target/todo-0.0.1-SNAPSHOT.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]