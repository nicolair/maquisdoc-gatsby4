module.exports = {
  siteMetadata: {
    title: `maquisdoc-gatsby4`,
    siteUrl: `https://www.yourdomain.tld`
  },
  plugins: ["gatsby-plugin-emotion", "gatsby-plugin-mdx", {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "pages",
      "path": "./src/pages/"
    },
    __key: "pages"
  }]
};