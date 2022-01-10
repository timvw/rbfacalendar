FROM rust:1.57 as build

WORKDIR /opt/app

# create an empty project
RUN mkdir -p /opt/app/src/bin && \
    echo "fn main() {}" > /opt/app/src/bin/test.rs

# copy over your manifests
COPY ./Cargo.lock ./Cargo.lock
COPY ./Cargo.toml ./Cargo.toml

# this build step will cache your dependencies
RUN cargo build --release

# copy your source tree
COPY ./src ./src

# build for release
RUN cargo build --release

# Copy the binary into a new container for a smaller docker image
FROM debian:buster-slim

WORKDIR /opt/app
COPY --from=build /opt/app/target/release/rbfacalendar /opt/app/rbfacalendar

EXPOSE 8000
ENV ROCKET_ADDRESS=0.0.0.0
ENTRYPOINT [ "/opt/app/rbfacalendar" ]