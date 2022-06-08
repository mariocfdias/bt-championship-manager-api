const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['src/routes.ts']

const doc = {
    info: {
        version: "1.0.0",
        title: "Beach Tennis API",
        description: "Documentação do projeto de gerenciamento de campeonatos de Beach Tennis."
    },
    host: "localhost:3000",
    basePath: "/",
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
            "name": "User",
            "description": "Rotas para o gerenciamento de usuários."
        },
        {
            "name": "Locations",
            "description": "Rotas para o gerenciamento de localizações."
        },
        {
            "name": "Championships",
            "description": "Rotas para o gerenciamento de campeonatos."
        },
        {
            "name": "Auth",
            "description": "Rotas para o gerenciamento de autenticação."
        },
    ],
    securityDefinitions: {
        api_key: {
            type: "apiKey",
            name: "api_key",
            in: "header"
        },
        petstore_auth: {
            type: "oauth2",
            authorizationUrl: "https://petstore.swagger.io/oauth/authorize",
            flow: "implicit",
            scopes: {
                read_pets: "read your pets",
                write_pets: "modify pets in your account"
            }
        }
    },
    definitions: {
        CreateUserResponse: {
            name: "Jefferson",
            gender: "Male",
            email: "jefferson@email.com",
            type: "admin",
            id: 1
        },
        CreateUserRequest: {
            $name: "Jefferson",
            $gender: "Male",
            $email: "jefferson@email.com",
            $type: "admin",
            $password: "password",
            $passwordConfirmation: "password"
        },
        EditUserRequest: {
            name: "Jefferson",
            gender: "Male",
            type: "admin"
        },
        GetUsersResponse: [
            {
                name: "Jefferson",
                gender: "Male",
                email: "jefferson@email.com",
                type: "admin",
                id: 1
            }
        ],
        CreateLocationRequest: {
            $name: "Arena",
            $numberOfCourts: 10
        },
        CreateLocationResponse: {
            name: "Arena",
            numberOfCourts: 10,
            id: 1
        },
        GetLocationsResponse: [
            {
            $name: "Arena",
            $numberOfCourts: 10,
            id: 1
            }
        ],
        EditLocationRequest: {
            name: "Arena",
            numberOfCourts: 10
        },
        CreateChampionshipResponse: {
            name: "Campeonato de Beach Tennis",
            category: "male",
            numberOfParticipants: 8,
            description: "Um Campeonato de Beach Tennis",
            enrollStartDate: "2020-01-01",
            enrollEndDate: "2020-01-01",
            startDate: "2020-01-01",
            endDate: "2020-12-31",
            locationId: 1,
            id: 1,
            matches: [
                {
                    points: [6, 4]
                }
            ],
            participants: [
                {
                    name: "Jefferson",
                    gender: "Male",
                    email: "jefferson@email.com"
                }
            ]
        },
        CreateChampionshipRequest: {
            $name: "Campeonato de Beach Tennis",
            $category: "male",
            $numberOfParticipants: 8,
            $description: "Um Campeonato de Beach Tennis",
            $enrollStartDate: "2020-01-01",
            $enrollEndDate: "2020-01-01",
            $startDate: "2020-01-01",
            $endDate: "2020-12-31",
            $locationId: 1
        },
        EditChampionshipRequest: {
            name: "Campeonato de Beach Tennis",
            category: "male",
            numberOfParticipants: 8,
            description: "Um Campeonato de Beach Tennis",
            enrollStartDate: "2020-01-01",
            enrollEndDate: "2020-01-01",
            startDate: "2020-01-01",
            endDate: "2020-12-31",
            locationId: 1
        },
        GetChampionshipsResponse: [
            {
                name: "Campeonato de Beach Tennis",
                category: "male",
                numberOfParticipants: 8,
                description: "Um Campeonato de Beach Tennis",
                enrollStartDate: "2020-01-01",
                enrollEndDate: "2020-01-01",
                startDate: "2020-01-01",
                endDate: "2020-12-31",
                locationId: 1,
                id: 1,
                matches: [
                    {
                        points: [6, 4]
                    }
                ],
                participants: [
                    {
                        name: "Jefferson",
                        gender: "Male",
                        email: "jefferson@email.com"
                    }
                ]
            }
        ],
        PostEnrollChampionshipRequest: {
            userId: 1,
            pairId: 2,
            championshipId: 1
        },
        PostLoginRequest: {
            $email: "email@email.com",
            $password: "password"
        },
        PostLoginResponse: {
            email: "email@email.com",
            password: "password",
            token: "token",
            id: 1
        },
        PostRegisterRequest: {
            $name: "Jefferson",
            $gender: "Male",
            $email: "jefferson@email.com",
            $type: "Admin",
            password: "password",
            passwordConfirmation: "password"
        },
        PostRegisterResponse: {
            name: "Jefferson",
            gender: "Male",
            email: "jefferson@email.com",
            type: "Admin",
            id: 1
        },
        UpdateMatchRequest: {
            points: [6, 4]
        }
    }
}


swaggerAutogen(outputFile, endpointsFiles, doc)
