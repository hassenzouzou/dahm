# Makefile for Dahm Digital Marketing Website
# دهم - وكالة التسويق الرقمي

# Variables
NODE_VERSION := 18
NEXT_VERSION := 15.4.4
PROJECT_NAME := dahm-website

# Default target
.DEFAULT_GOAL := help

# Colors for terminal output
GREEN := \033[32m
YELLOW := \033[33m
RED := \033[31m
NC := \033[0m # No Color

## Development Commands

.PHONY: help
help: ## Show this help message
	@echo "$(GREEN)Dahm Website - Available Commands$(NC)"
	@echo "=================================="
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "$(YELLOW)%-20s$(NC) %s\n", $$1, $$2}'

.PHONY: install
install: ## Install project dependencies
	@echo "$(GREEN)Installing dependencies...$(NC)"
	npm install

.PHONY: dev
dev: ## Start development server
	@echo "$(GREEN)Starting development server...$(NC)"
	npm run dev

.PHONY: build
build: ## Build the project for production
	@echo "$(GREEN)Building project...$(NC)"
	npm run build

.PHONY: start
start: ## Start production server
	@echo "$(GREEN)Starting production server...$(NC)"
	npm run start

.PHONY: lint
lint: ## Run linting
	@echo "$(GREEN)Running linter...$(NC)"
	npm run lint

.PHONY: clean
clean: ## Clean build artifacts and node_modules
	@echo "$(YELLOW)Cleaning build artifacts...$(NC)"
	rm -rf .next
	rm -rf out
	rm -rf node_modules
	rm -rf .vercel

## SEO Commands

.PHONY: seo-check
seo-check: ## Check SEO files exist
	@echo "$(GREEN)Checking SEO files...$(NC)"
	@if [ -f "public/robots.txt" ]; then echo "✓ robots.txt exists"; else echo "$(RED)✗ robots.txt missing$(NC)"; fi
	@if [ -f "public/sitemap.xml" ]; then echo "✓ sitemap.xml exists"; else echo "$(RED)✗ sitemap.xml missing$(NC)"; fi

.PHONY: seo-validate
seo-validate: ## Validate robots.txt and sitemap.xml
	@echo "$(GREEN)Validating SEO files...$(NC)"
	@echo "Robots.txt content:"
	@cat public/robots.txt 2>/dev/null || echo "$(RED)robots.txt not found$(NC)"
	@echo "\nSitemap.xml validation:"
	@xmllint --noout public/sitemap.xml 2>/dev/null && echo "✓ sitemap.xml is valid XML" || echo "$(YELLOW)⚠ xmllint not available or sitemap invalid$(NC)"

## Quality Assurance

.PHONY: type-check
type-check: ## Run TypeScript type checking
	@echo "$(GREEN)Running TypeScript type check...$(NC)"
	npx tsc --noEmit

.PHONY: format
format: ## Format code (if prettier is configured)
	@echo "$(GREEN)Formatting code...$(NC)"
	@if [ -f ".prettierrc" ]; then npx prettier --write .; else echo "$(YELLOW)Prettier not configured$(NC)"; fi

## Deployment

.PHONY: deploy-vercel
deploy-vercel: ## Deploy to Vercel
	@echo "$(GREEN)Deploying to Vercel...$(NC)"
	npx vercel --prod

.PHONY: deploy-preview
deploy-preview: ## Deploy preview to Vercel
	@echo "$(GREEN)Deploying preview to Vercel...$(NC)"
	npx vercel

## Docker (if needed)

.PHONY: docker-build
docker-build: ## Build Docker image
	@echo "$(GREEN)Building Docker image...$(NC)"
	docker build -t $(PROJECT_NAME) .

.PHONY: docker-run
docker-run: ## Run Docker container
	@echo "$(GREEN)Running Docker container...$(NC)"
	docker run -p 3000:3000 $(PROJECT_NAME)

## Analytics and Performance

.PHONY: analyze
analyze: ## Analyze bundle size
	@echo "$(GREEN)Analyzing bundle...$(NC)"
	@if [ -d ".next" ]; then npx @next/bundle-analyzer; else echo "$(RED)Build the project first with 'make build'$(NC)"; fi

.PHONY: lighthouse
lighthouse: ## Run Lighthouse audit (requires lighthouse CLI)
	@echo "$(GREEN)Running Lighthouse audit...$(NC)"
	@if command -v lighthouse >/dev/null 2>&1; then \
		lighthouse http://localhost:3000 --output html --output-path ./lighthouse-report.html; \
	else \
		echo "$(YELLOW)Install Lighthouse CLI: npm install -g lighthouse$(NC)"; \
	fi

## Maintenance

.PHONY: update-deps
update-deps: ## Update dependencies
	@echo "$(GREEN)Updating dependencies...$(NC)"
	npm update

.PHONY: security-audit
security-audit: ## Run security audit
	@echo "$(GREEN)Running security audit...$(NC)"
	npm audit

.PHONY: fix-security
fix-security: ## Fix security issues
	@echo "$(GREEN)Fixing security issues...$(NC)"
	npm audit fix

## Git Hooks

.PHONY: setup-hooks
setup-hooks: ## Setup git hooks
	@echo "$(GREEN)Setting up git hooks...$(NC)"
	@if [ -d ".git" ]; then \
		echo "#!/bin/sh\nmake lint && make type-check" > .git/hooks/pre-commit; \
		chmod +x .git/hooks/pre-commit; \
		echo "✓ Pre-commit hook installed"; \
	else \
		echo "$(RED)Not a git repository$(NC)"; \
	fi

## Status

.PHONY: status
status: ## Show project status
	@echo "$(GREEN)Project Status$(NC)"
	@echo "=============="
	@echo "Node version: $(shell node --version 2>/dev/null || echo 'Not installed')"
	@echo "NPM version: $(shell npm --version 2>/dev/null || echo 'Not installed')"
	@echo "Next.js version: $(shell npm list next --depth=0 2>/dev/null | grep next || echo 'Not installed')"
	@echo "Project name: $(PROJECT_NAME)"
	@echo "Git branch: $(shell git branch --show-current 2>/dev/null || echo 'Not a git repo')"
	@echo "Last commit: $(shell git log -1 --format=%h 2>/dev/null || echo 'No commits')"
	@make seo-check
