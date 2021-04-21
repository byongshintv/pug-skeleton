module.exports = function(app)
{
    app.get('api/$[folderName]/$[pageName]',(req,res) => {
        const isSuccess = true
        res.json({
            status:isSuccess ? "success" : "error",
            apiid:"$[folder]/$[pageName]",
            result: {

            }
        })
    })


}