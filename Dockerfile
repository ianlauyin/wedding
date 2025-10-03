# Multi-stage build for Wedding App
# Stage 1: Build Frontend
FROM node:20-alpine AS frontend-builder

WORKDIR /src/frontend

# Copy package files
COPY ./frontend .
COPY ./interface .

# Install pnpm and dependencies
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile


# Build frontend into 
RUN pnpm run build ~/app/assets/web

# Stage 2: Build Rust Backend
FROM rust:1.83-slim AS backend-builder

WORKDIR /src/backend

COPY ./backend .
COPY ./interface .
COPY ../core_rs_workspace .

# Install build dependencies
RUN cargo install

# Build backend in release mode
RUN cargo build --release
COPY target/release/wedding_backend /app/wedding_backend

# Stage 3: Runtime
FROM debian:bookworm-slim

WORKDIR /app

# Expose port
EXPOSE 8080

# Run the application
CMD ["/app/wedding_backend"]

