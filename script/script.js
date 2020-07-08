const { execSync } = require("child_process");
const path = require("path");

// https://kemptechnologies.com/load-balancer/load-balancing-algorithms-techniques/
const config = require("./config.json");

class Startup {
    constructor(args, dir) {
        if (!this.parser(args)) {
            process.exit();
        }
        this.amount = args[0];
        this.strategy = args[1];
        this.serverDir = dir + "/server";
        this.balancerDir = dir + "/balancer";
    }

    parser(args) {
        if (args.length != 2) {
            console.error("Error: Invalid parameters");
            return false;
        } else if (isNaN(args[0])) {
            console.error("Error: Illegal number of server instances");
            return false;
        } else if (!config.strategies.includes(args[1])) {
            console.log(config.strategies);
            console.error("Error: Illegal strategies of balancing");
            return false;
        }

        return true;
    }

    installDependencies() {
        const cmd = "npm install";
        const result = execSync(cmd, {
            cwd: this.serverDir,
        });
        console.log(result.toString());
        result = execSync(cmd, {
            cwd: this.balancerDir,
        });
        console.log(result.toString());
    }

    startServer() {}

    startLoadBalancer() {}
}

const demo = new Startup(process.argv.slice(2), process.env.INIT_CWD);
demo.installDependencies();
demo.startServer();
demo.startLoadBalancer();
