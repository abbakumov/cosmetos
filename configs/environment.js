
const requiredKeys = [
    'COSMETOS_SECRET', // for cookie sessions
    'PG_HOST',
    'PG_LOGIN',
    'PG_PASSWORD',
];

const envKeys = requiredKeys.reduce(
    (acc, key) => ({
        ...acc,
        [key]: process.env[key],
    }),
    {}
);

function checkRequiredKeys() {
    const notProvided = requiredKeys.filter(key => !process.env[key]);

    if (notProvided.length > 0) {
        const list = notProvided.join(', ');
        throw new Error(`${list} is not provided`);
    }

    console.log('All secret keys provided right!');
};

module.exports = {
    checkRequiredKeys,
    envKeys,
};
