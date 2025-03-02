# Vercel deploy steps
1. On terminal run below commands
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
2. change app.listen with below code:
```bash
    if(process.env.NODE_ENV !== "production"){
        app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
    }

    module.export = app;
```
3. On terminal run below commands:
```bash
    cd Backend/
    vercel
```
4. Change localhost url in backend with deployed frontend url
5. on terminal run below commands:
```bash
    cd Backend/
    vercel --prod
```
## frontend
1. run below command on terminal
```bash
    cd frontend/
    vercel
```
2. Change localhost url in frontend with deployed backend url
3. on terminal run below commands:
```bash
    cd frontend/
    vercel --prod
```



 