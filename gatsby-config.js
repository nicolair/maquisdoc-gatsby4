graphql_server_url = process.env.MQD_GRAPHQL_SERVER_URL

module.exports = {
  siteMetadata: {
    title: "maquisdoc",
    math_exos: {'url_diff': "https://maquisdoc-math.fra1.digitaloceanspaces.com/math-exos/"},
    servers:{ 'latexgithub':{'url':process.env.FLASK_URL}}
  },
  plugins: [
    "gatsby-plugin-emotion",
    //"gatsby-plugin-mdx", 
    "gatsby-theme-material-ui",
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "pages",
        "path": "./src/pages/"
        },
      __key: "pages"
    },
    "gatsby-transformer-remark",
    `gatsby-transformer-csv`,
    {
      resolve: "gatsby-source-graphql",
      options: {
        typeName: "MAQUIS",
        fieldName: "maquis",
        //url : "http://0.0.0.0:3003"
        //url : "http://188.226.151.10:3003"
        url : graphql_server_url
        }
    },
    {
      resolve: `gatsby-plugin-apollo`,
      options: {
        uri: graphql_server_url
      }
    },
  ]
};
