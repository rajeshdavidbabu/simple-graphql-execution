const {
  parse,
  validate,
  execute,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID
} = require('graphql');

// Data bank 
function fetchPersonById(id) {
  return [{
    id: "123",
    name: "Raj",
    address: {
      street: "first street",
      city: "berlin"
    }
  }, {
    id: "456",
    name: "Adrian",
    address: {
      street: "second street",
      city: "spain"
    }
  }].find(item => item.id === id);
}


// GraphQLType representation
const AddressType = new GraphQLObjectType({
  name: 'Address',
  fields: {
    street: { 
      type: GraphQLString,
    },
    city: { 
      type: GraphQLString,
    }
  }
});

const PersonType = new GraphQLObjectType({
  name: 'Person',
  fields: {
    id: {
      type: GraphQLID,
    },
    name: { 
      type: GraphQLString,
    },
    address: { 
      type: AddressType,
    }
  }
});

// GraphQL Schema Representation
const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      person: {
        type: PersonType,
        args: {
          id: { type: GraphQLID }
        },
        resolve: (root, args, context, info) => {
          console.log(`Resolver called: user`)
          return fetchPersonById(args.id)
        }
      }
    }
  })
});

// Define the query
const queryString = `
{
  person(id: "123") {
    id
    name
    address {
      street
      city
    }
  }
}

`
const queryAST = parse(queryString);

// Validate the incoming queryAST against the GraphQLSchema Object
const errors = validate(schema, queryAST);
if (errors.length === 0) {
  console.log(`Validation successful query can be executed`);  
} else {
  console.log(`Error during validation: ${JSON.stringify(errors)}`);    
}

// Execute the query against the schema
execute(schema, queryAST).then(result => {
  console.log(`Execution result: \n${JSON.stringify(result)}`);
}).catch(e => console.log(JSON.stringify(e)))