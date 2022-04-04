const questionCase = document.querySelector('#question');
const buttonNext = document.querySelector('#next');

let questions = {
    hairLine: {
        id: 'hairLine',
        text: 'Наличие волосяного покрова?',
        result: false,
        required: true,
        next: 'hasMilk',
    },
    hasMilk: {
        id: 'hasMilk',
        text: 'Наличие молока?',
        result: false,
        required: true,
        next: 'hasFeathers',
    },
    hasFeathers: {
        id: 'hasFeathers',
        text: 'Наличие перьев?',
        result: false,
        required: true,
        next: 'canFly',
        changeRequiredQuestion: {
            key: 'hasSharpTeeth',
            onCondition: 'true',
            newStatus: false,
        }
    },
    canFly: {
        id: 'canFly',
        text: 'Умеет ли летать?',
        result: false,
        required: true,
        next: 'flyConditionGood',
        changeRequiredQuestion: {
            key: 'flyConditionGood',
            onCondition: 'false',
            newStatus: false,
        }
    },
    flyConditionGood: {
        id: 'flyConditionGood',
        text: 'Качество полёта хорошее?',
        result: false,
        required: true,
        next: 'canSwim',
    },
    canSwim: {
        id: 'canSwim',
        text: 'Умеет ли плавать?',
        result: false,
        required: true,
        next: 'canEgg',
    },
    canEgg: {
        id: 'canEgg',
        text: 'Умеет ли откладывать яйца?',
        result: false,
        required: true,
        next: 'hasSharpTeeth',
        changeRequiredQuestion: {
            key: 'hasHooves',
            onCondition: 'true',
            newStatus: false,
        },
    },
    hasSharpTeeth: {
        id: 'hasSharpTeeth',
        text: 'Наличие острых зубов?',
        result: false,
        required: true,
        next: 'hasClaws',
        changeRequiredQuestion: {
            key: 'chewingGum',
            onCondition: 'true',
            newStatus: false,
        },
    },
    hasClaws: {
        id: 'hasClaws',
        text: 'Наличие когтей?',
        result: false,
        required: true,
        next: 'eatMeat',
        changeRequiredQuestion: {
            key: 'hasHooves',
            onCondition: 'true',
            newStatus: false,
        },
    },
    eatMeat: {
        id: 'eatMeat',
        text: 'Ест мясо?',
        result: false,
        required: true,
        next: 'hasHooves',
        changeRequiredQuestion: {
            key: 'hasHooves',
            onCondition: 'true',
            newStatus: false,
        },
    },
    hasHooves: {
        id: 'hasHooves',
        text: 'Наличие копыт?',
        result: false,
        required: true,
        next: 'chewingGum',
    },
    chewingGum: {
        id: 'chewingGum',
        text: 'Привычка жевать жвачку?',
        result: false,
        required: true,
        next: 'colorYellowBrown',
    },
    colorYellowBrown: {
        id: 'colorYellowBrown',
        text: 'Желто-коричневый окрас?',
        result: false,
        required: true,
        next: 'colorBlackWhite',
        changeRequiredQuestion: {
            key: 'colorBlackWhite',
            onCondition: 'true',
            newStatus: false,
        },
    },
    colorBlackWhite: {
        id: 'colorBlackWhite',
        text: 'Окрас черно-белый?',
        result: false,
        required: true,
        next: 'pigmentDarkSpots',
    },
    pigmentDarkSpots: {
        id: 'pigmentDarkSpots',
        text: 'Пигмент - темные пятна?',
        result: false,
        required: true,
        next: 'pigmentDarkLines',
        changeRequiredQuestion: {
            key: 'pigmentDarkLines',
            onCondition: 'true',
            newStatus: false,
        },
    },
    pigmentDarkLines: {
        id: 'pigmentDarkLines',
        text: 'Пигмент - черные полосы?',
        result: false,
        required: true,
        next: 'longNeck',
    },
    longNeck: {
        id: 'longNeck',
        text: 'Длинная шея?',
        result: false,
        required: true,
        next: 'longFoot',
    },
    longFoot: {
        id: 'longFoot',
        text: 'Длинные ноги?',
        result: false,
        required: true,
        next: null,
    },
};

const animalClassification = {
    animalClass: {
        mammals: {
            name: 'Млекопитающие',
            current: false,
        },
        bird: {
            name: 'Птица',
            current: false,
        },
        set: false,
    },
    animalSquad: {
        predator: {
            name: 'Хищник',
            current: false,
        },
        artiodactyl: {
            name: 'Парнокопытное',
            current: false,
        },
        set: false,
    },
    animalKind: {
        gepard: {
            name: 'Гепард',
            current: false,
        },
        tiger: {
            name: 'Тигр',
            current: false,
        },
        giraffe: {
            name: 'Жираф',
            current: false,
        },
        zebra: {
            name: 'Зебра',
            current: false,
        },
        ostrich: {
            name: 'Страус',
            current: false,
        },
        penguin: {
            name: 'Пингвин',
            current: false,
        },
        albatross: {
            name: 'Альбатрос',
            current: false,
        },
        set: false,
    },
};

let startApp = () => {
    questionCase.innerText = questions.hairLine.text;
    questionCase.dataset.id = questions.hairLine.id;
    questionCase.dataset.next = questions.hairLine.next;
};
startApp();

buttonNext.addEventListener('click', e => {
    e.preventDefault();
    let result;
    let next;

    document.getElementsByName('class').forEach(e => {
        if(e.checked) {
            result = e.value;
        }
    });

    if (typeof questions[questionCase.dataset.id]) {
        if (result === 'true') {
            questions[questionCase.dataset.id].result = true;
        } else {
            questions[questionCase.dataset.id].result = false;
        }

        if (questions[questionCase.dataset.id].changeRequiredQuestion) {
            let objKey = questions[questionCase.dataset.id].changeRequiredQuestion.key;
            let newStatus = questions[questionCase.dataset.id].changeRequiredQuestion.newStatus;
            let conditions = questions[questionCase.dataset.id].changeRequiredQuestion.onCondition;

            if (result === conditions) {
                questions[objKey].required = newStatus;
            }
        }

        changeQuestion(questions[questionCase.dataset.id].next);

        document.getElementsByName('class').forEach(e => {
            if(e.checked) {
                e.checked = false;
            }
        });
    }
});

const changeQuestion = (next) => {
    if(next !== null) {
        if(questions[next].required === true) {
            questionCase.innerText = questions[next].text;
            questionCase.dataset.id = questions[next].id;
            questionCase.dataset.next = questions[next].next;
        } else {
            changeQuestion(questions[next].next);
        }
    } else {
        buttonNext.innerText = 'Подвести итоги';
        getResult();
    }
};

const getResult = () => {
    if (questions.hairLine.result === true) {
        animalClassification.animalClass.mammals.current = true;
    }

    if (questions.hasMilk.result === true) {
        animalClassification.animalClass.mammals.current = true;
    }

    if (questions.hasFeathers.result === true) {
        animalClassification.animalClass.bird.current = true;
        animalClassification.animalClass.mammals.current = false;
    }

    if (questions.canFly.result === true && questions.canEgg.result === true) {
        animalClassification.animalClass.bird.current = true;
    }

    if (animalClassification.animalClass.mammals.current === true && questions.eatMeat.result === true) {
        animalClassification.animalSquad.predator.current = true;
    }

    if (
        animalClassification.animalClass.mammals.current === true
        && questions.hasSharpTeeth.result === true
        && questions.hasClaws.result === true
        ) {
        animalClassification.animalSquad.predator.current = true;
    }

    if (
        animalClassification.animalClass.mammals.current === true
        && questions.hasHooves.result === true
    ) {
        animalClassification.animalSquad.artiodactyl.current = true;
    }

    if (
        animalClassification.animalClass.mammals.current === true
        && questions.chewingGum.result === true
    ) {
        animalClassification.animalSquad.artiodactyl.current = true;
    }

    if (
        animalClassification.animalSquad.predator.current === true
        && questions.colorYellowBrown.result === true
        && questions.pigmentDarkSpots.result === true
    ) {
        animalClassification.animalKind.gepard.current = true;
    }

    if (
        animalClassification.animalSquad.predator.current === true
        && questions.colorYellowBrown.result === true
        && questions.pigmentDarkLines.result === true
    ) {
        animalClassification.animalKind.tiger.current = true;
    }

    if (
        animalClassification.animalSquad.artiodactyl.current === true
        && questions.pigmentDarkLines.result === true
    ) {
        animalClassification.animalKind.zebra.current = true;
    }

    if (
        animalClassification.animalClass.bird.current === true
        && questions.canFly.result === false
        && questions.longFoot.result === true
        && questions.longNeck.result === true
        && questions.colorBlackWhite.result === true
    ) {
        animalClassification.animalKind.ostrich.current = true;
    }

    if (
        animalClassification.animalClass.bird.current === true
        && questions.canFly.result === false
        && questions.canSwim.result === true
        && questions.colorBlackWhite.result === true
    ) {
        animalClassification.animalKind.penguin.current = true;
    }

    if (
        animalClassification.animalClass.bird.current === true
        && questions.flyConditionGood.result === true
    ) {
        animalClassification.animalKind.albatross.current = true;
    }

    document.querySelector('.animal-form__body').style.display = 'block';
    document.querySelector('.animal-form__body').style.textAlign = 'center';
    document.querySelector('.animal-form__body').innerHTML = '';

    let innerHTML;

    if (animalClassification.animalClass.bird.current) {
        innerHTML = "<b>Класс: </b>" + animalClassification.animalClass.bird.name + "<br>"
        switch(true) {
            case animalClassification.animalKind.penguin.current:
                innerHTML += "<b>Вид: </b>" + animalClassification.animalKind.penguin.name + "<br>"
                break;
            case animalClassification.animalKind.albatross.current:
                innerHTML += "<b>Вид: </b>" + animalClassification.animalKind.albatross.name + "<br>"
                break;
            case animalClassification.animalKind.ostrich.current:
                innerHTML += "<b>Вид: </b>" + animalClassification.animalKind.ostrich.name + "<br>"
                break;
        }
        document.querySelector('.animal-form__body').innerHTML = innerHTML;
    } else {
        if (animalClassification.animalClass.mammals.current) {
            innerHTML = "<b>Класс: </b>" + animalClassification.animalClass.mammals.name + "<br>"

            switch(true) {
                case animalClassification.animalSquad.predator.current:
                    innerHTML += "<b>Отряд: </b>" + animalClassification.animalSquad.predator.name + "<br>"
                    break;
                case animalClassification.animalSquad.artiodactyl.current:
                    innerHTML += "<b>Отряд: </b>" + animalClassification.animalSquad.artiodactyl.name + "<br>"
                    break;
            }

            switch(true) {
                case animalClassification.animalKind.gepard.current:
                    innerHTML += "<b>Вид: </b>" + animalClassification.animalKind.gepard.name + "<br>"
                    break;
                case animalClassification.animalKind.giraffe.current:
                    innerHTML += "<b>Вид: </b>" + animalClassification.animalKind.giraffe.name + "<br>"
                    break;
                case animalClassification.animalKind.zebra.current:
                    innerHTML += "<b>Вид: </b>" + animalClassification.animalKind.zebra.name + "<br>"
                    break;
                case animalClassification.animalKind.tiger.current:
                    innerHTML += "<b>Вид: </b>" + animalClassification.animalKind.tiger.name + "<br>"
                    break;
            }
            document.querySelector('.animal-form__body').innerHTML = innerHTML;
        }
    }

    console.log(animalClassification);
    console.log(questions);
}




