'use strict';
var ElectorFacade = require('../models/facades/ElectorFacade');
var VoteFacade = require('../models/facades/VoteFacade');

function Controller() {

    this.auth = function (req, res) {

        var elector = {
            electorId: req.params.electorId,
            password: req.params.password
        };

        console.log("Auth: ");
        console.log(elector);

        ElectorFacade.read(elector.electorId)
            .then(
                function (resolution) {

                    if (!resolution) {
                        return res.send(200, {code: 3, message: "Título de eleitor não cadastrado."});
                    }

                    if (elector.password != resolution.dataValues.password) {
                        return res.send(200, {code: 4, message: "Senha inválida."});
                    }

                    VoteFacade.read(elector.electorId)
                        .then(
                            function (vote) {

                                if (vote) {
                                    return res.send(200, {code: 2, message: "Acesso negado. Esse eleitor já votou."});
                                }

                                return res.send(200, {code: 0, message: "Acesso autorizado."});

                            }, function (err) {
                                console.log(err);
                                return res.send(200, {
                                    code: 1,
                                    message: "Não foi possível acessar o banco de dados.",
                                    error: err
                                });
                            });

                }, function (err) {
                    console.log(err);
                    return res.send(200, {code: 1, message: "Não foi possível acessar o banco de dados.", error: err});
                })


    };

    this.addVote = function (req, res) {

        var vote = req.body;
        vote.electorId = req.params.id;

        console.log("Vote: ");
        console.log(vote);

        ElectorFacade.read(vote.electorId)
            .then(
                function (resolution) {

                    if (!resolution) {
                        return res.send(200, {code: 3, message: "Título de eleitor não cadastrado."});
                    }

                    VoteFacade.read(vote.electorId).then(
                        function (result) {
                            if (result) {
                                return res.send(200, {code: 2, message: "Acesso negado. Esse eleitor já votou."});
                            }

                            VoteFacade.create(vote).then(
                                function () {
                                    return res.send(200, {code: 0, message: "Voto cadastrado com sucesso."});

                                }, function (err) {
                                    console.log(err);
                                    return res.send(200, {
                                        code: 1,
                                        message: "Não foi possível acessar o banco de dados."
                                    });
                                });

                        }, function (err) {
                            console.log(err);
                            return res.send(200, {
                                code: 1,
                                message: "Não foi possível acessar o banco de dados.",
                                error: err
                            });
                        });

                }, function (err) {
                    console.log(err);
                    return res.send(200, {code: 1, message: "Não foi possível acessar o banco de dados.", error: err});
                })


    };

    this.getMayors = function (req, res) {


        return res.send(200, {
            "prefeito": [
                {
                    "id": "1",
                    "nome": "Mauricio Perretto",
                    "partido": "Partido do Coração Partido",
                    "foto": "http://www.up.edu.br/blogs/engenharia-da-computacao/wp-content/uploads/sites/6/2016/06/MauricioPerretto.jpg"
                },
                {
                    "id": "2",
                    "nome": "Felipe Przysiada",
                    "partido": "Partido do Terror",
                    "foto": "http://www.up.edu.br/blogs/engenharia-da-computacao/wp-content/uploads/sites/6/2016/06/FelipePrzysiada.jpg"
                },
                {
                    "id": "3",
                    "nome": "José Carlos da Cunha",
                    "partido": "Partido do Professor",
                    "foto": "http://www.up.edu.br/blogs/engenharia-da-computacao/wp-content/uploads/sites/6/2016/06/JoseCunha.jpg"
                }
            ]
        });

    };

    this.getCouncilmen = function (req, res) {


        return res.send(200, {
            "vereador": [
                {
                    "id": "1",
                    "nome": "Justin Bieber",
                    "partido": "Partido dos Cantores",
                    "foto": "http://www.macacovelho.com.br/wp-content/uploads/2014/08/justin-bieber.jpg?c8891e"
                },
                {
                    "id": "2",
                    "nome": "Dilma Roussef",
                    "partido": "PT",
                    "foto": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQcLpqaTgMl-RIPgeH1I2hlDanoSJoaE-8EMDtAMe2mTBASnHVFpg"
                },
                {
                    "id": "3",
                    "nome": "Albert Einstein",
                    "partido": "Partido dos Gênios",
                    "foto": "http://img.ibxk.com.br/2014/06/27/27181731660781.jpg?w=1040"
                }
            ]
        });

    };

}

Controller.constructor = Controller;
module.exports = Controller;
