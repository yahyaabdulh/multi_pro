module.exports = {
    apps: [
        {
            name: "job_seeker",
            port: 5000,
            script : "./server.js",
            watch: true,
            args: "start",
            env: {
                "NODE_ENV": "production",
                "PORT": 5000
            }
        }
    ]
};