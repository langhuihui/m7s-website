#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

# Configuration
SOURCE_DIR=".vitepress/dist"
REMOTE_USER="root"  # Change this if needed
REMOTE_HOST="monibuca.com"
REMOTE_DIR="/opt/1panel/apps/openresty/openresty/www/sites/v5.monibuca.com/index"
REMOTE_PATH="${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_DIR}"

echo -e "${YELLOW}Monibuca Website Deployment Script${NC}"
echo "----------------------------------------"

# Check if source directory exists
if [ ! -d "$SOURCE_DIR" ]; then
  echo -e "${RED}Error: Build directory not found at ${SOURCE_DIR}${NC}"
  echo "Please run 'pnpm run build' first to generate the distribution files."
  exit 1
fi

# Confirm deployment
echo -e "Ready to deploy from ${YELLOW}${SOURCE_DIR}${NC} to ${YELLOW}${REMOTE_HOST}:${REMOTE_DIR}${NC}"
read -p "Continue with deployment? (y/n): " CONFIRM
if [[ $CONFIRM != "y" && $CONFIRM != "Y" ]]; then
  echo -e "${RED}Deployment cancelled.${NC}"
  exit 0
fi

# Start deployment
echo -e "${YELLOW}Starting deployment...${NC}"

# Delete remote assets directory first
echo "Removing existing assets directory on server..."
ssh ${REMOTE_USER}@${REMOTE_HOST} "rm -rf ${REMOTE_DIR}/assets"
if [ $? -ne 0 ]; then
  echo -e "${RED}Failed to remove remote assets directory. Continuing anyway...${NC}"
fi

# Transfer files
echo "Uploading index.html to server..."
scp ${SOURCE_DIR}/index.html ${REMOTE_PATH}/

echo "Uploading assets directory to server..."
scp -r ${SOURCE_DIR}/assets ${REMOTE_PATH}/

# Check if the scp commands were successful
if [ $? -eq 0 ]; then
  echo -e "${GREEN}Deployment completed successfully!${NC}"
  echo -e "Your website should now be available at ${YELLOW}https://v5.monibuca.com${NC}"
else
  echo -e "${RED}Deployment failed. Please check your connection and permissions.${NC}"
  exit 1
fi

echo -e "${GREEN}All done!${NC}"