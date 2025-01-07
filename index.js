

const telegramApi = require('node-telegram-bot-api')
const  {gameOptions,againOptions}  = require( './options')

const token = '7118715362:AAFD29pZps2ve4rDlAaAomZGOmV_L4h6JCI'

const bot = new telegramApi(token, {polling: true})
const data = {}

const startGame = async (chatId)=>{
    await bot.sendMessage(chatId, 'Давай сыграем в игру! Я загадаю цифру от от 1 до 10. Угадай ее')
    const randomNumber = Math.floor(Math.random() * 10)
    data[chatId] = randomNumber
   await bot.sendMessage(chatId, 'Отгадывай, я жду', gameOptions)
}
const startBot = () => {
    bot.setMyCommands([
        {command: '/start', description: 'Стартовое приветствие'},
        {command: '/info', description: 'Получение информации о пользователе'},
        {command: '/game', description: 'Поиграть в игру'},
    ])
    bot.on('message', async msg => {
        const text = msg.text
        const chatId = msg.chat.id

        if (text === '/start') {
            await bot.sendSticker(chatId, 'https://cdn2.combot.org/dedmoroz/webp/4xf09f918b.webp')
            return bot.sendMessage(chatId, 'Привет дорогой друг!!!! Чем могу помочь?')
        }
        if (text === '/info') {
            return bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name}`)
        }
        if (text === '/game') {
            return startGame(chatId)
        }
        return bot.sendMessage(chatId, 'Я не понимаю че ты хочешь))')

    })
    bot.on('callback_query', async msg => {
        const dataCallback = msg.data
        const id = msg.message.chat.id
        console.log(msg)
if(dataCallback === '/again'){
return startGame(id)
}
        // await bot.sendMessage(id, `Ты выбрал цифру ${data}`)
        if (dataCallback === data[id]) {
            return bot.sendMessage(id, `Все верно!!!!Загаданая цифра ${data[id]}`,againOptions)
        }else {
            return bot.sendMessage(id,`Не угадал, попробуй еще раз.Загаданая цифра ${data[id]}`,againOptions)
        }

    })
}
startBot()
