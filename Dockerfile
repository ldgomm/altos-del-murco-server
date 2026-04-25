# syntax=docker/dockerfile:1

FROM eclipse-temurin:21-jdk-jammy AS build

WORKDIR /app

COPY gradlew gradlew
COPY gradle gradle
COPY settings.gradle.kts settings.gradle.kts
COPY build.gradle.kts build.gradle.kts
COPY gradle.properties gradle.properties

RUN chmod +x ./gradlew

COPY src src

RUN ./gradlew clean installDist --no-daemon


FROM eclipse-temurin:21-jre-jammy

WORKDIR /app

COPY --from=build /app/build/install/altos-server ./

EXPOSE 8080

CMD ["./bin/altos-server"]