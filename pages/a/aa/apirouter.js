module.exports = function(app)
{
    app.get('api/$[folderName]/aa',(req,res) => {
        const isSuccess = true
        res.json({
            status:isSuccess ? "success" : "error",
            apiid:"$[folder]/aa",
            result: {

            }
        })
    })


}