const Telegraf = require('telegraf')
const {MenuTemplate, MenuMiddleware} = require('telegraf-inline-menu')
const axios = require('axios')

require('dotenv').config()
const bot = new Telegraf(process.env.BOT_TOKEN)
const gameShortName = process.env.GAME_SHORT_NAME
const appEntry = process.env.APP_ENTRY_POINT || 'http://127.0.0.1:5000'

const menuTemplate = new MenuTemplate(
    ctx => `Hello ${ctx.update.message.chat.title|| ctx.update.message.from.first_name}! Welcome to tplace!`)

// Configure menu template items
menuTemplate.interact('Start Drawing', 'draw', {
    do: (ctx) => {
        ctx.replyWithGame(gameShortName)
        return false
    }
})

menuTemplate.url('See Canvas', 'https://tww2020.site/tplace.html')

menuTemplate.url('Instructions', 'https://docs.google.com/presentation/d/1PvEgIjDTDicbbiSd4Mj8fXBc6uV1n9qT9pmAv2R-OfI/edit?usp=sharing')

menuTemplate.url('See the canvas made by the seniors!', 'https://tww2020.site/tplace.html')

menuTemplate.interact('Whitelist this Chat', 'whitelist', {
    do: ctx => {
        const chatId = ctx.update.callback_query.message.chat.id
        const url = `${appEntry}/whitelist`
        axios.post(url, {chatId: chatId})
            .then(res => {
                if (res.status === 200) {
                    ctx.reply('This chat group has been successfully whitelisted!')
                } else {
                    ctx.reply('Uh oh looks like the whitelist period is up. Contact @Khairoulll for more info')
                }
            })
            .catch(err => {
                console.log(err)
                ctx.reply(`Unicorns! Looks like an error has occured. Contact @Khairoulll for more info`)
            })
        return false
    }
})

menuTemplate.interact('F', 'respect', {
    do: ctx => {
        ctx.reply('Your respect has been forwarded to the creators')
        const message = `${ctx.update.callback_query.from.first_name} has paid us compliments`
        ctx.telegram.sendMessage(-484684580, message)
        return false
    }
})


const menuMiddleware = new MenuMiddleware('/', menuTemplate)
bot.command('start', ctx => menuMiddleware.replyToContext(ctx))
bot.use(menuMiddleware)

// configure commands
bot.help(ctx => ctx.reply('Use the /start command to start the game!'))

bot.command('tplace', (ctx) =>
    ctx.replyWithGame(gameShortName))

// bot.command('whitelist', (ctx) => {
//     const chatId = ctx.update.message.chat.id
//     const url = `${appEntry}/whitelist`
//     axios.post(url, {chatId: chatId})
//         .then(res => {
//             if (res.status === 200) {
//                 ctx.reply('This chat group has been successfully whitelisted!')
//             } else {
//                 ctx.reply('Uh oh looks like the whitelist period is up. Contact @Khairoulll for more info')
//             }
//         })
//         .catch(err => {
//             ctx.reply(`Unicorns! Looks like an error has occured. Contact @Khairoulll for more info`)
//         })
// })

// bot.command('f', (ctx) => {
//     ctx.reply('Your respect has been forwarded to the creators')
//     const message = `${ctx.update.message.from.first_name} has paid us compliments`
//     ctx.telegram.sendMessage(-484684580, message)
// })


bot.on('callback_query', ctx => {
    const query = ctx.callbackQuery;
    if(!query || query.game_short_name !== gameShortName) {
        ctx.answerCbQuery("Sorry, '" + query.game_short_name + "' is not available.");
    } else {
        const chatId = query.message.chat.id
        const userId = query.from.id
        let gameurl = `${appEntry}/${chatId}/${userId}`;
        ctx.answerGameQuery(gameurl);
    }
});

bot.on('inline_query', ctx => {
    ctx.answerInlineQuery([ { type: "canvas", id: "0", game_short_name: gameShortName } ]);
});

bot.launch().then(() => console.log('Bot running'))
