#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Monibuca Website Build and Deploy Script${NC}"
echo "----------------------------------------"

# Build the website
echo -e "${YELLOW}Building the website...${NC}"
pnpm run build

# Check if build was successful
if [ $? -eq 0 ]; then
  echo -e "${GREEN}Build completed successfully!${NC}"
else
  echo -e "${RED}Build failed. Please check for errors and try again.${NC}"
  exit 1
fi

# Run the deployment script
echo -e "${YELLOW}Starting deployment process...${NC}"
./deploy.sh

echo -e "${GREEN}Build and deploy process completed!${NC}" 