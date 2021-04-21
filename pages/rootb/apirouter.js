module.exports = function(app)
{
    app.get('api/$[folderName]/rootb',(req,res) => {
        const isSuccess = true
        res.json({
            status:isSuccess ? "success" : "error",
            apiid:"$[folder]/rootb",
            result: {

            }
        })
    })


}