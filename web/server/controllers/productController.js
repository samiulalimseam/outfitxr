import shopify from "../../shopify.js"
import { dbURI } from "../db/db.js"




export const getProducts =  async (req, res) => {
    
    try {
        
        const session = res.locals.shopify.session
        console.log('----------------api hit success--------------', JSON.stringify(session))

      const graphqlClient = new shopify.api.clients.Graphql({session: session})
      const { shop } = session ;
      const payload = req.body
      const productRes = await graphqlClient.query({
        data: `query MyQuery {
            products(first: 40) {
              nodes {
                id
                title
                featuredImage {
                  url
                }
                variants(first: 10) {
                  nodes {
                    title
                    inventoryPolicy
                    id
                    image {
                      url
                    }
                  }
                  pageInfo {
                    endCursor
                    hasNextPage
                    hasPreviousPage
                    startCursor
                  }
                }
              }
            }
          }`
      })
  
      res.json(productRes)
      
    } catch (error) {
      console.error('Error:', error)
      res.status(500).json({
        message: 'There was an error',
        error: error
      })
    } 
} 

  
  