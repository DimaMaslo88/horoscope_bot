const telegramApi = require('node-telegram-bot-api')


const token = '7118715362:AAFD29pZps2ve4rDlAaAomZGOmV_L4h6JCI'

const bot = new telegramApi(token,{polling:true})
const data ={}


const startBot =()=>{
    bot.setMyCommands([
        {command:'/start', description:'Стартовое приветствие'},
        {command:'/info',description:'Получение информации о пользователе'},
        {command:'/game',description:'Поиграть в игру'},
    ])
    bot.on('message',async msg=>{
        const text = msg.text
        const chatId = msg.chat.id

        if(text === '/start'){
            await bot.sendSticker(chatId,'https://cdn2.combot.org/dedmoroz/webp/4xf09f918b.webp')
           return  bot.sendMessage(chatId,'Привет дорогой друг!!!! Чем могу помочь?')
        }
        if(text === '/info'){
            return bot.sendMessage(chatId,`Тебя зовут ${msg.from.first_name}`)
        }
        if(text === '/game'){
            await bot.sendMessage(chatId,'Давай сыграем в игру! Я загадаю цифру от от 1 до 10. Угадай ее')
            const randomNumber = Math.floor(Math.random() * 10)
            data[chatId] = randomNumber
            return bot.sendMessage(chatId,'Отгадывай, я жду')
        }
        return bot.sendMessage(chatId,'Я не понимаю че ты хочешь))')

    })
}
startBot()
