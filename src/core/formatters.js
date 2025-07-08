const prettier = require('prettier');
const { spawn } = require('child_process');
const xmlFormatter = require('xml-formatter'); // You need to install this: npm install xml-formatter

/**
 * Formats code using the Prettier library.
 * @param {string} code The source code.
 * @param {string} parser The Prettier parser to use.
 * @returns {Promise<string>} The formatted code.
 */
async function formatPrettier(code, parser) {
    try {
        return await prettier.format(code, { parser, bracketSpacing: true, tabWidth: 4 });
    } catch (error) {
        // Prettier throws detailed parsing errors
        const newError = new Error('Syntax validation failed.');
        newError.statusCode = 400;
        newError.details = error.message;
        throw newError;
    }
}

/**
 * Formats code by spawning a command-line tool.
 * @param {string} command The command to execute (e.g., 'black').
 * @param {Array<string>} args The arguments for the command.
 * @param {string} code The source code to pipe into the command's stdin.
 * @returns {Promise<string>} The formatted code from the command's stdout.
 */
function formatCli(command, args, code) {
    return new Promise((resolve, reject) => {
        const formatterProcess = spawn(command, args, { shell: true });

        let formattedCode = '';
        let errorOutput = '';

        formatterProcess.stdout.on('data', (data) => {
            formattedCode += data.toString();
        });

        formatterProcess.stderr.on('data', (data) => {
            errorOutput += data.toString();
        });

        formatterProcess.on('close', (code) => {
            if (code === 0) {
                resolve(formattedCode);
            } else {
                const newError = new Error(`Formatter exited with error code ${code}.`);
                newError.statusCode = 400;
                // Provide detailed error output from the tool
                newError.details = errorOutput || 'No specific error message provided by the tool. This usually indicates a syntax error.';
                reject(newError);
            }
        });
        
        formatterProcess.on('error', (err) => {
            const newError = new Error(`Failed to start the formatter process for "${command}". Is it installed and in your PATH?`);
            newError.statusCode = 500;
            newError.details = err.message;
            reject(newError);
        });

        // Write the code to the process's stdin and then close it.
        formatterProcess.stdin.write(code);
        formatterProcess.stdin.end();
    });
}

/**
 * Formats XML code using a dedicated library.
 * @param {string} code The XML source code.
 * @returns {Promise<string>} The formatted XML.
 */
async function formatXml(code) {
    try {
        // xml-formatter is synchronous but we wrap it in a promise for consistency
        return xmlFormatter(code, {
            indentation: '    ',
            collapseContent: true,
            lineSeparator: '\n'
        });
    } catch (error) {
        const newError = new Error('Invalid XML syntax.');
        newError.statusCode = 400;
        newError.details = error.message;
        throw newError;
    }
}

module.exports = {
    formatPrettier,
    formatCli,
    formatXml
};