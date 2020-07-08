module.exports = {
    rootDir: '../src',
    transform: {
        '^.+\\.(ts|tsx)?$': 'ts-jest',
    },
    testRegex: '(/__test__/.*|(\\.|/)(test|spec))\\.(ts|tsx)?$',
    testPathIgnorePatterns: ['/lib/', '/node_modules/'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    globals: {
        'ts-jest': {
            tsConfig: 'config/tsconfig.dev.json',
        },
    },
    collectCoverage: true,
    coverageDirectory: '../coverage',
};
