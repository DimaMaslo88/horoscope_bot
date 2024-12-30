const telegramApi = require('node-telegram-bot-api')


const token = '7118715362:AAFD29pZps2ve4rDlAaAomZGOmV_L4h6JCI'

const bot = new telegramApi(token, {polling: true})
const data = {}
const gameOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [

            [{text: '1', callback_data: '1'}, {text: '2', callback_data: '2'}, {text: '3', callback_data: '3'}],
            [{text: '4', callback_data: '4'}, {text: '5', callback_data: '5'}, {text: '6', callback_data: '6'}],
            [{text: '7', callback_data: '7'}, {text: '8', callback_data: '8'}, {text: '9', callback_data: '9'}],
            [{text: '0', callback_data: '0'}],

        ]
    })
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
            await bot.sendMessage(chatId, 'Давай сыграем в игру! Я загадаю цифру от от 1 до 10. Угадай ее')
            const randomNumber = Math.floor(Math.random() * 10)
            data[chatId] = randomNumber
            return bot.sendMessage(chatId, 'Отгадывай, я жду', gameOptions)
        }
        return bot.sendMessage(chatId, 'Я не понимаю че ты хочешь))')

    })
    bot.on('callback_query', async msg => {
        const dataCallback = msg.data
        const id = msg.message.chat.id
        console.log(msg)
        // await bot.sendMessage(id, `Ты выбрал цифру ${data}`)
        if (dataCallback === data[id]) {
            return bot.sendMessage(id, `Все верно!!!!Загаданая цифра ${data[id]}`)
        }else {
            return bot.sendMessage(id,`Не угадал, попробуй еще раз.Загаданая цифра ${data[id]}`)
        }

    })
}
startBot()
