const {ApolloServer, gql} = require('apollo-server');

const courses = [
    {
        id:1,
        title: 'The Modern GraphQL Bootcamp',
        name: 'Andrew Mead',
        description: 'Graphql app',
        instructorId:1
    },
    {
        id:2,
        title: 'The Red Dawn',
        name: 'Phill Dagg',
        description: 'War Games',
        instructorId:2

    },
    {
        id:3,
        title: 'The Iron Boys',
        name: 'Jerry Lewis',
        description: 'Football',
        instructorId:3

    },
    {
        id:4,
        title: 'Cold Fridgerator',
        name: 'Snapple Drink',
        description: 'Beverage',       
         instructorId:3

    }
];

const instructors = [
    {
        id:1,
        name: 'Andrew Mead',
    },
    {
        id:2,
        name: 'James Mead',
    },
    {
        id:3,
        name: 'Terry Mead',
    },
    {
        id:4,
        name: 'Frank Mead',
    }
];

const typeDefs = gql`

    type Course {
        id:Int,
        title: String,
        name: String,
        description: String,
        instructor: Instructor
    }

    type Instructor{
        name:String,
        courses: [Course]
    },

    type Query{
        courses: [Course]
        course(id:Int!):Course
        instructors: [Instructor]
        instructor(id:Int!):Instructor
    }
`;

const resolvers = {
    Query:{
        courses: () => courses,
        course: (root,args,ctx,info) => {
            return courses.find(course => course.id === args.id);
        },
        instructors:() => instructors,
        instructor:(root,args,ctx,info) => {
            return instructors.find(instructor => instructor.id === args.id);
        }
    },
    Course:{
        instructor:(root,args,ctx,info) => {
            return instructors.find(instructor => instructor.id === root.instructorId);
        }
    },
    Instructor:{
        courses:(root,args,ctx,info) => {
            return courses.filter(course => course.instructorId === root.id);
        }
    }   
};


const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.listen().then(({ url }) => {
    console.log(`Server is running on ${url}`);
});