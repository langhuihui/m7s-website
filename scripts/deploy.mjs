#!/usr/bin/env zx
import { $ } from 'zx'
import path from 'path'
const dist = path.resolve(__dirname, '../apps/m7s-website/.vitepress', 'dist')
await $`scp -r ${dist}/* monibuca.com:/usr/local/nginx/html/mb/docs/`