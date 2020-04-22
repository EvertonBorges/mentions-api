const mongoose = require('mongoose');
const Mentions = mongoose.model('Mentions');

exports.listMentions = async(req, res) => {
    try {
        const data = await Mentions.find({});
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({message: 'Falha ao carregar as menções.'});
    }
};

exports.createMention = async(req, res, next) => {
    try {
        const mention = new Mentions({
            friend: req.body.friend,
            mention: req.body.mention
        });

        console.log(mention);

        await mention.save();

        res.status(201).send({message: 'Menção cadastrada com sucesso!'});
    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(500).send({message: 'Falha ao cadastrar a menção.'});
    }
};