const azure = require('azure-storage');

exports.getGenbrug = function (req, res, next) {
    var tableSvc = azure.createTableService('ufstdev', 'FuP67zJwBl4Ds+qvELkOKDBGgHRql4dwuy3f0sbzQi2qhjVm/3jS+JDDDTG5k6YFdq88k+0jzMEil/p9ADtsVg==');

    tableSvc.retrieveEntity('genbrugTable', 'p1', 'r1', function(error, result, response) {
        if (!error)
        {
            console.log("HTTP GET returned OK");

            var response = {
                description: result.description["_"]
            };
            
            res.json(response); 
        }
        else
        {
            console.log("HTTP GET returned error: " + error);
        }
    });
}

exports.createOrReplaceGenbrug = function (req, res, next)
{
    var jsonData = req.body;
    var tableSvc = azure.createTableService('ufstdev', 'FuP67zJwBl4Ds+qvELkOKDBGgHRql4dwuy3f0sbzQi2qhjVm/3jS+JDDDTG5k6YFdq88k+0jzMEil/p9ADtsVg==');

    var entity = {
        PartitionKey: {'_':'p1'},
        RowKey: {'_':'r1'},
        description: {'_':jsonData.description}
    };

    tableSvc.insertOrReplaceEntity('genbrugTable', entity, function (error, result, response) {
        if(!error){
            res.sendStatus(200);
        } else {
            res.sendStatus(500);
        }
    });
}

