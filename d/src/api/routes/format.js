const express = require('express');
const router = express.Router();
const formatters = require('../../core/formatters');

router.post('/', async (req, res, next) => {
    try {
        const { code, language } = req.body;

        if (!code || !language) {
            const error = new Error('Missing required fields: "code" and "language" are required.');
            error.statusCode = 400;
            throw error;
        }

        let formattedCode;
        const lang = language.toLowerCase();

        switch (lang) {
            case 'javascript':
            case 'js':
            case 'jsx':
            case 'typescript':
            case 'ts':
            case 'tsx':
                formattedCode = await formatters.formatPrettier(code, 'babel-ts');
                break;
            case 'json':
                formattedCode = await formatters.formatPrettier(code, 'json');
                break;
            case 'html':
                formattedCode = await formatters.formatPrettier(code, 'html');
                break;
            case 'css':
            case 'scss':
            case 'less':
                formattedCode = await formatters.formatPrettier(code, 'css');
                break;
            case 'python':
            case 'py':
                formattedCode = await formatters.formatCli('black', ['-'], code);
                break;
            case 'java':
                formattedCode = await formatters.formatCli('google-java-format', ['-'], code);
                break;
            case 'c++':
            case 'cpp':
            case 'c':
                // ClangFormat uses a different style of arguments
                formattedCode = await formatters.formatCli('clang-format', [], code);
                break;
            case 'xml':
                // This uses a JS-based XML formatter
                formattedCode = await formatters.formatXml(code);
                break;
            default:
                const error = new Error(`Unsupported language: "${language}". Supported languages are: javascript, python, java, c++, html, css, json, xml.`);
                error.statusCode = 400;
                throw error;
        }

        res.status(200).json({
            formattedCode,
            language: lang,
            inputChars: code.length,
            outputChars: formattedCode.length
        });

    } catch (error) {
        // Forward caught errors to the central error handler
        next(error);
    }
});

module.exports = router;