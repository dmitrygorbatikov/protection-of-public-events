
class IotController{
    async getIotData(req,res){
        try{
            const sectors = [
                {name: 1, value: parseInt((Math.random() * 200).toString().split('.')[0])%2 === 0},
                {name: 2, value: parseInt((Math.random() * 200).toString().split('.')[0])%2 === 0},
                {name: 3, value: parseInt((Math.random() * 200).toString().split('.')[0])%2 === 0},
                {name: 4, value: parseInt((Math.random() * 200).toString().split('.')[0])%2 === 0},
                {name: 5, value: parseInt((Math.random() * 200).toString().split('.')[0])%2 === 0},
                {name: 6, value: parseInt((Math.random() * 200).toString().split('.')[0])%2 === 0},
                {name: 7, value: parseInt((Math.random() * 200).toString().split('.')[0])%2 === 0},
                {name: 8, value: parseInt((Math.random() * 200).toString().split('.')[0])%2 === 0},
            ]
            return res.status(200).json(sectors)
        }
        catch (e) {
            return res.status(400).json({message:'Что-то пошло не так, попробуйте снова'})
        }
    }
}

module.exports = new IotController()