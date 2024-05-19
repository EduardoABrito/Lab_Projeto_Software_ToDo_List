FROM ubuntu:latest AS build

RUN apt-get update && apt-get upgrade -y
RUN apt-get install openjdk-21-jdk -y
RUN apt-get install -y maven

COPY . .


RUN mvn clean install -e

FROM openjdk:21-jdk-slim

EXPOSE 8080

COPY --from=build target/*.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]