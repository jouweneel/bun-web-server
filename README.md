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

## Run [launch locally]
```
bun dev
```
In both `server/` & `web/`

Server is available in http://localhost:8000
Web on http://localhost:1234 (has `/api` proxying to :8000 setup)

## Run [inside docker]
```
docker compose up
```
In the project root

Note that the full `server` and `web` directories are mounted, so local dependency installation is needed regardless

## Debug
If you're running locally (`bun dev` in `server/`), stop it first :)

Comes with `.vscode/launch.json` - select the local or docker-attach profile depending on how you chose to Run the project & press `f5`; breakpoints should work directly
