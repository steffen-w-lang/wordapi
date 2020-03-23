const azure = require('azure-storage');
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const app = express();
const port = 80;

//#region Deprecated

app.get("/genbrug/get", (req, res, next) => {
    azure_get((error, result) => {
        res.send(result['_']); 
    });
});

app.get("/genbrug/set", (req, res, next) => {
    azure_set(req.query.indhold);
    res.sendStatus(200);
});

function azure_get(callBack) {
    var tableSvc = azure.createTableService('ufstdev', 'FuP67zJwBl4Ds+qvELkOKDBGgHRql4dwuy3f0sbzQi2qhjVm/3jS+JDDDTG5k6YFdq88k+0jzMEil/p9ADtsVg==');

    tableSvc.retrieveEntity('genbrugTable', 'p1', 'r1', function(error, result, response) {
        if (!error)
        {
            console.log("HTTP GET returned OK");
            callBack(error, result.description);
        }
        else
        {
            console.log("HTTP GET returned error: " + error);
        }
        
    });
}

function azure_set(indhold)
{
    var tableSvc = azure.createTableService('ufstdev', 'FuP67zJwBl4Ds+qvELkOKDBGgHRql4dwuy3f0sbzQi2qhjVm/3jS+JDDDTG5k6YFdq88k+0jzMEil/p9ADtsVg==');
    
    var entity = {
        PartitionKey: {'_':'p1'},
        RowKey: {'_':'r1'},
        description: {'_':indhold}
    };

    tableSvc.insertOrReplaceEntity('genbrugTable', entity, function (error, result, response) {
        if(!error){
        }
      });
}

//#endregion

app.use(cors());
app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(fileUpload({ createParentPath: true }));

var routes = require('./routes/wordApiRoutes')
routes(router);
app.use(router);

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
    console.log(`Server running on port ${port}...`);
});
