# Development Preparation

## Operating System

Not restricted.

## Installing Go Environment

- Go version 1.18 or later is required.
- Go can be downloaded from https://golang.google.cn/dl.
- In China, execute "go env -w GOPROXY=https://goproxy.cn" to download third-party libraries that are blocked.

## IDE

- VSCode is recommended.
- Goland is also supported, although its support for generics is not perfect.

## One-Click Setup of Development Project Directory

To facilitate rapid secondary development, we currently provide a project with Git submodules that can be used to pull all official plugins and engines in one go to facilitate rapid development.
`git clone --recurse-submodules git@github.com:Monibuca/workspace`

Note: To download the project smoothly from Github, SSH key configuration is required on your Github account.

Once downloaded, you can enter the monibuca directory and run "go run main.go" to start the project.