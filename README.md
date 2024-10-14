# Bun server/web repo test

To check where Bun is at in terms of drop-in node replacement/debuggability/speed

## Installation
Bun runtime:
```
curl -fsSL https://bun.sh/install | bash # for macOS, Linux, and WSL

powershell -c "irm bun.sh/install.ps1|iex" # for Windows
```

Deps:
```
bun setup
```
In the repo root

## Run
```
bun dev
```
In both `server/` & `web/`

Server is available in http://localhost:8000
Web on http://localhost:1234 (has `/api` proxying to :8000 setup)

## Debug
If you're running `bun dev` in `server/`, stop it first :)

Comes with `.vscode/launch.json` - just press `f5`; breakpoints should work directly
