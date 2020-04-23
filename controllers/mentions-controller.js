const { validationResult } = require('express-validator');
const repository = require('../src/repositories/mentions-repository');

exports.listMentions = async(req, res) => {
    try {
        const data = await repository.listMentions();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({message: 'Falha ao carregar as menções.'});
    }
};

exports.createMention = async(req, res, next) => {
    const { errors } = validationResult(req);
    
    if (errors.length > 0) {
        return res.status(400).send({ message: errors });
    }

    try {
        await repository.createMention({
            friend: req.body.friend,
            mention: req.body.mention
        });
        res.status(201).send({message: 'Menção cadastrada com sucesso!'});
    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(500).send({message: 'Falha ao cadastrar a menção.'});
    }
};