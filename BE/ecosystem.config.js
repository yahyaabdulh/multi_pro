module.exports = {
    apps: [
        {
            name: "accounting_v2",
            port: 3000,
            script : "./dist/main.js",
            watch: true,
            args: "start",
            env: {
                "NODE_ENV": "production",
                "PORT": 3000
            }
        }
    ]
};