#!/usr/bin/env bash
# build.sh
# This script configures the build environment for hosting platforms like Render.
# It ensures all necessary system-level dependencies and formatters are installed.

# Exit immediately if a command exits with a non-zero status.
set -o errexit

echo "--- Starting build process ---"

# 1. Install Node.js project dependencies
echo "Installing npm packages..."
npm install

# 2. Install Python and the Black code formatter
echo "Installing Python and Black..."
pip install black

# 3. Update package lists and install system-level formatters for C++ and Java
echo "Installing clang-format and OpenJDK..."
apt-get update && apt-get install -y --no-install-recommends clang-format openjdk-17-jdk wget

# 4. Download and set up the google-java-format command-line tool
echo "Downloading and configuring google-java-format..."
wget https://github.com/google/google-java-format/releases/download/google-java-format-1.17.0/google-java-format-1.17.0-all-deps.jar -O /usr/local/bin/google-java-format.jar

# Create a shell script to make the JAR executable like a standard command
echo '#!/bin/sh
java -jar /usr/local/bin/google-java-format.jar "$@"' > /usr/local/bin/google-java-format

# Make the new script executable
chmod +x /usr/local/bin/google-java-format

echo "--- Build process complete ---"

