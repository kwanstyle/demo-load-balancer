const { execSync, spawn } = require("child_process");
const path = require("path");

const config = require("../balancer/src/manifest.json");

class Startup {
    constructor(args, dir) {
        if (!this.parser(args)) {
            process.exit();
        }
        this.strategy = args[0];
        this.serverDir = dir + "/server";
        this.balancerDir = dir + "/balancer";
        this.servers = config.servers;
    }

    parser(args) {
        if (args.length != 1) {
            console.error("Error: Invalid parameters");
            return false;
        } else if (!config.strategies.includes(args[0])) {
            console.log(config.strategies);
            console.error("Error: Invalid strategies of balancing");
            return false;
        }

        return true;
    }

    installDependencies() {
        const cmd = "npm install";
        let result = execSync(cmd, {
            cwd: this.serverDir,
        });
        console.log(result.toString());
        result = execSync(cmd, {
            cwd: this.balancerDir,
        });
        console.log(result.toString());
    }

    startServer() {
        this.servers.forEach((server) => {
            const process = spawn(
                "npm",
                ["start", "--", server.id, server.port],
                {
                    cwd: this.serverDir,
                }
            );

            process.stdout.on("data", (data) => {
                console.log(`${server.id}: ${data}`);
            });

            process.stderr.on("data", (data) => {
                console.log(`${server.id} - Error: ${data}`);
            });

            process.on("close", (code) => {
                console.log(`${server.id}: Shutting down`);
            });
        });
    }

    startLoadBalancer() {
        const process = spawn("npm", ["start", "--", this.strategy], {
            cwd: this.balancerDir,
        });

        process.stdout.on("data", (data) => {
            console.log(`Balancer: ${data}`);
        });

        process.stderr.on("data", (data) => {
            console.log(`Balancer - Error: ${data}`);
        });

        process.on("close", (code) => {
            console.log(`Balancer: Shutting down`);
        });
    }
}

const demo = new Startup(process.argv.slice(2), process.env.INIT_CWD);
demo.installDependencies();
demo.startServer();
demo.startLoadBalancer();
