const express = require('express');
const { exec } = require('child_process');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');


const app = express();
app.use(express.json());

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'My API',
            version: '1.0.0',
            description: 'API Documentation',
        },
    },
    apis: ['./deploy.js'], // Укажите путь к вашим API
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
    const branch = req.body.ref.split('/').pop();
    console.log('webhook works');
    if (branch === 'prod_v1') {
        exec('git -C ./webhooktest clone https://github.com/kvotua/ConsumerCorner.git', (err, stdout, stderr) => {
            if (err) {
                console.error(`exec error: ${err}`);
                return res.status(500).send('Error updating repository');
            }
            console.log(stdout);
            res.status(200).send('Repository updated');
        });
    } else {
        res.status(200).send('Event ignored for branch: ' + branch);
    }
});


app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});

