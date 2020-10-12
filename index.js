const Telegraf = require('telegraf');
const crypto = require('crypto');

const tlit = require('./trasliterate');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.on('inline_query', async ({ inlineQuery, answerInlineQuery }) => {
    if (!inlineQuery.query.length) return;
    let res = [{
            title: 'Rus -> Eng',
            func: tlit.rus2lat
        }, {
            title: 'Eng -> Rus',
            func: tlit.lat2rus
        }
    ];
    res = res.map(x => {
        let ntxt = x.func(inlineQuery.query);
        return {
            type: 'article',
            id: crypto.createHash('md5').update(x.title + inlineQuery.query).digest('hex'),
            title: x.title,
            description: ntxt,
            input_message_content: {
                message_text: ntxt
            }
        };
    });
    return answerInlineQuery(res);
});

bot.on('chosen_inline_result', ({ chosenInlineResult }) => {
    // console.log('chosen inline result', chosenInlineResult)
});

bot.launch();