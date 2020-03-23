exports.getDocument = function (req, res, next) {
    try {
        var filePath = "./public";
        var fileName = req.params.documentFileName;

        const file = `${filePath}/${fileName}`;
        res.download(file); 
    } catch (err) {
        res.status(500).send(err);
    }
}

exports.createOrReplaceDocument = function (req, res, next)
{
    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
            let documentFile = req.files.documentFile;
            
            //Use the mv() method to place the file in upload directory (i.e. "uploads")
            documentFile.mv('./public/' + documentFile.name);

            //send response
            res.send({
                status: true,
                message: 'File is uploaded',
                data: {
                    name: documentFile.name,
                    mimetype: documentFile.mimetype,
                    size: documentFile.size
                }
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }    
}

