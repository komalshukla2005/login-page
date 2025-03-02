# Vercel deploy steps
1. in main folder run below commands
```bash
    npm install -g vercel
    vercel login
```
## backend
1. create vercel.json file and paste below code in file.
```bash
    {
    "version": 2,
    "builds": [
        {
        "src": "server.js",
        "use": "@vercel/node"
        }
    ],
    "routes": [
        {
        "src": "/(.*)",
        "dest": "server.js"
        }
    ]
    }
```
