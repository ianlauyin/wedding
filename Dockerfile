# Multi-stage build for Wedding App
# Stage 1: Build Frontend
FROM node:20-alpine AS frontend-builder

WORKDIR /app

# Copy workspace configuration files
COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./
COPY frontend/package.json ./frontend/package.json
COPY interface/package.json ./interface/package.json

# Install pnpm
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

# Copy source code
COPY frontend/ ./frontend/
COPY interface/ ./interface/

# Build frontend
WORKDIR /app/frontend
RUN pnpm run build

# Stage 2: Build Rust Backend
FROM rust:1.83-slim AS backend-builder

WORKDIR /app

# Install build dependencies
RUN apt-get update && apt-get install -y \
    pkg-config \
    libssl-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy workspace Cargo files
COPY Cargo.toml Cargo.lock ./

# Copy all crate manifests for dependency caching
COPY backend/Cargo.toml ./backend/
COPY backend/macros/Cargo.toml ./backend/macros/
COPY interface/Cargo.toml ./interface/

# Copy all source code
COPY backend/ ./backend/
COPY interface/ ./interface/

# Copy frontend build to backend assets
COPY --from=frontend-builder /app/frontend/dist ./backend/assets/web

# Build backend in release mode
WORKDIR /app/backend
RUN cargo build --release

# Stage 3: Runtime
FROM debian:bookworm-slim

WORKDIR /app

# Install runtime dependencies
RUN apt-get update && apt-get install -y \
    ca-certificates \
    libssl3 \
    && rm -rf /var/lib/apt/lists/*

# Copy binary from builder
COPY --from=backend-builder /app/target/release/wedding_backend ./wedding_backend

# Copy web assets
COPY --from=frontend-builder /app/frontend/dist ./assets/web

# Create non-root user
RUN useradd -m -u 1000 wedding && \
    chown -R wedding:wedding /app

USER wedding

# Expose port
EXPOSE 8080

# Run the application
CMD ["./wedding_backend"]

