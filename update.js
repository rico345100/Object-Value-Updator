const fs = require('fs');
const argv = require('minimist')(process.argv.slice(2));

function print() {
    console.log.apply(null, arguments);
}

(async function main() {
    print("Starting Updating...");

    const { s: sourceJsonDir } = argv;
    const { i: inputJsonDir } = argv;

    try {
        if (typeof argv.s === "undefined") {
            throw new Error("Source JSON is missing.");
        }
        if (typeof argv.i === "undefined") {
            throw new Error("Input JSON is missing.");
        }

        const sourceBuffer = await fs.promises.readFile(sourceJsonDir);
        const sourceText = sourceBuffer.toString();
        const sourceJSON = JSON.parse(sourceText);
        print("Source JSON Loaded.");

        const inputBuffer = await fs.promises.readFile(inputJsonDir);
        const inputText = inputBuffer.toString();
        const inputJSON = JSON.parse(inputText);
        print("Input JSON Loaded.");

        function parseAndUpdate(source, input) {
            const keys = Object.keys(input);

            for (let key of keys) {
                const sourceElement = source[key];
                const inputElement = input[key];

                if (typeof sourceElement === 'undefined') {
                    print("Warning: Key " + key + " only exists in input JSON");
                }
                else if (typeof sourceElement === 'object') {
                    parseAndUpdate(source[key], input[key]);
                }
                else {
                    source[key] = input[key];
                }
            }
        }

        parseAndUpdate(sourceJSON, inputJSON);

        await fs.promises.writeFile(sourceJsonDir, JSON.stringify(sourceJSON, null, 4));
        print("Update completed. Please check your source JSON file.");
        print("Written as: " + sourceJsonDir);
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
})();