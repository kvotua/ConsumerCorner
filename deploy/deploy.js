const express = require('express');
const { exec } = require('child_process');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const axios = require('axios');


const app = express();
app.use(express.json());


const BOT_TOKEN = '7817948111:AAEgf7losaVDpYGPVNfaF7YmRsgHGynjlqQ';
const CHAT_ID = '-4595073549';

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'My API',
            version: '1.0.0',
            description: 'API Documentation',
        },
    },
    apis: ['./deploy.js'],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
* @swagger
* /deploy:
*   post:
*     description: Welcome to the API
*     responses:
*       200:
*         description: Success
*/
app.post('/deploy', (req, res) => {
    var action = req.body.action;
    var is_pull_request = req.body.hasOwnProperty('pull_request') && req.body.pull_request !== null;
    if (action == 'closed') {
        if (is_pull_request) {
            var user = req.body.pull_request.user.login;
            var branch = req.body.pull_request.base.ref;
            if (user == 'kvotua') {
                if (branch == 'prod_v1') {
                    exec('git -C "../" pull origin prod_v1', (err, stdout, stderr) => {
                        if (err) {
                            console.error(`exec error: ${err}`);
                            return res.status(500).send('Error updating repository');
                        }
                        console.log(stdout);
                        res.status(200).send('Repository updated');
                    });
                } else {
                    res.status(422).send('Unsupported branch');
                }
            } else {
                res.status(403).send('You do not have permission to make this request')
            }
        } else {
            res.status(422).send('This hook not is Pull Request');
        }
    } else {
        res.status(422).send('Incorrect action')
    }
});

app.post('/telegram', (req, res) => {
    console.log('webhook /telegram');
    console.log(req.body);
    if (req.body && req.body.pull_request && req.body.sender) {
        const action = req.body.action;
        const pullRequest = req.body.pull_request;
        const user = req.body.sender.login;
        const sourceBranch = pullRequest.head.ref;
        const targetBranch = pullRequest.base.ref;
        const url = pullRequest.html_url;
        const title = pullRequest.title;

        const escapeMarkdown = (text) => {
            return text.replace(/([_*[\]()~`>#+\-=|{}.!\\])/g, '\\$1');
        };

        const escapedTitle = escapeMarkdown(title);
        const escapedSourceBranch = escapeMarkdown(sourceBranch);
        const escapedTargetBranch = escapeMarkdown(targetBranch);
        const escapedAction = escapeMarkdown(action);
        const escapedUser = escapeMarkdown(user);

        const message = `[${escapedTitle}](${url})\nPull request: ${escapedAction}\nWho: ${escapedUser}\n${escapedSourceBranch} -> ${escapedTargetBranch}\nUrl: ${url}`;

        axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            chat_id: CHAT_ID,
            text: message,
            parse_mode: 'MarkdownV2',
        })
        .then(response => {
            console.log('Message sent to Telegram');
        })
        .catch(error => {
            console.error('Error sending message to Telegram:', error);
        });

        res.status(200).send('Pull request data sended to Telegram');
    } else {
        res.status(422).send('This hook not is Pull Request');
    }
});

const PORT = 3333;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});