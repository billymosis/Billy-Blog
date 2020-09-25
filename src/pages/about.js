/** @jsx jsx */
import { graphql } from "gatsby"

import Sidebar from "../components/sidebar"
import Layout from "../components/layout"
import SEO from "../components/seo"

import { jsx } from "theme-ui"

const About = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="About" />
      <Sidebar />
    </Layout>
  )
}

export default About

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
