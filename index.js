const axios = require("axios");
// const faker = require("faker");
const faker = require('faker/locale/es');

// var Faker = require('./lib');
// var faker = new Faker({ locales: require('./lib/local') });


const IDEA_GENERATOR = 'https://appideagenerator.com/call.php';
const IDEA_API = 'http://localhost:5000';

const randomInt = () => Math.floor(Math.random() * 10);

const generateIdea = async () => {
    const { data } = await axios.get(IDEA_GENERATOR);
    // const { data } = await axios.get('http://localhost:5000/api/idea');
    // const { data } = await axios.get(`http://localhost:5000/api/idea`);


    // console.log('data');
    // console.log(data);
    // return data;

    const idea = data.replace(/\n/g, ''); 
    // console.log('idea');
    // console.log(idea);
    return idea;
}

const generateUser = async () => {
    const { data } = await axios.post(`${IDEA_API}/auth/register`, {
        username: faker.internet.userName().toLowerCase(),
        password: '123456'
    });

    return data.token;
}


const postNewIdea = async token => {
    const idea = await generateIdea();
    const { data } = await axios.post(`${IDEA_API}/api/idea`,
        {
            idea,
            description: faker.lorem.paragraph()
        },
        {
            headers: {
                authorization: `Bearer ${token}`
            }
        }
    );
    // console.log('idea');
    return idea;
}

(async () => {
    const randUserNum = randomInt();
    const randIdeaNum = randomInt();


    for (let i = 0; i < randUserNum; i++) {
        console.log(`nro: ${i}`);
        
        const token = await generateUser();
        for (let j = 0; j < randIdeaNum; j++) {
            const idea = await postNewIdea(token);
        }
    }
    
    // const token = await generateUser();
    // const idea = await postNewIdea(token);
})();
